/* utils.js - Funciones de utilidad matemática y evaluación heurística compartidas */

// Normalización robusta de respuestas
function normalizeAnswer(str) {
  if (!str) return "";
  return str.trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[()]/g, "") // quitar paréntesis
    .replace(/\s*,\s*/g, ",") // quitar espacios alrededor de comas
    .replace(/\s*=\s*/g, "=") // quitar espacios alrededor de signos de igualdad
    .replace(/\s+/g, " "); // colapsar múltiples espacios a uno solo
}

// Función auxiliar para extraer números con decimales y signos negativos
function extractNumbers(str) {
  if (!str) return [];
  // Encuentra números con posibles signos y decimales
  const matches = str.match(/-?\d+(\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

class Complex {
  constructor(re, im = 0) {
    this.re = re;
    this.im = im;
  }
  add(other) { return new Complex(this.re + other.re, this.im + other.im); }
  sub(other) { return new Complex(this.re - other.re, this.im - other.im); }
  mul(other) { return new Complex(this.re * other.re - this.im * other.im, this.re * other.im + this.im * other.re); }
  div(other) {
    const denom = other.re * other.re + other.im * other.im;
    if (denom === 0) throw new Error("Division by zero");
    return new Complex(
      (this.re * other.re + this.im * other.im) / denom,
      (this.im * other.re - this.re * other.im) / denom
    );
  }
  neg() { return new Complex(-this.re, -this.im); }
}

const ComplexI = new Complex(0, 1);

function parseComplexExpression(str) {
  if (!str) return null;
  str = str.toLowerCase().replace(/\s+/g, '');
  str = str.replace(/(\d+)(pi|i|[a-z(])/g, '$1*$2');
  str = str.replace(/pi/g, Math.PI.toString());
  str = str.replace(/(i)(\d+)/g, '$1*$2');
  
  let pos = 0;
  function peek() { return str[pos] || ''; }
  function consume() { return str[pos++] || ''; }
  
  function parsePrimary() {
    let char = peek();
    if (char === '(') {
      consume();
      const val = parseExpr();
      if (peek() === ')') consume();
      return val;
    }
    if (char === '-') {
      consume();
      const val = parsePrimary();
      return val ? val.neg() : null;
    }
    if (char === '+') {
      consume();
      return parsePrimary();
    }
    if (char === 'i') {
      consume();
      return ComplexI;
    }
    
    let numStr = '';
    while (/[0-9.]/.test(peek())) {
      numStr += consume();
    }
    if (numStr === '') {
      return null;
    }
    let val = new Complex(parseFloat(numStr), 0);
    if (peek() === 'i') {
      consume();
      val = val.mul(ComplexI);
    }
    return val;
  }
  
  function parseMulDiv() {
    let val = parsePrimary();
    if (val === null) return null;
    while (peek() === '*' || peek() === '/') {
      let op = consume();
      let right = parsePrimary();
      if (right === null) return null;
      if (op === '*') {
        val = val.mul(right);
      } else {
        val = val.div(right);
      }
    }
    return val;
  }
  
  function parseExpr() {
    let val = parseMulDiv();
    if (val === null) return null;
    while (peek() === '+' || peek() === '-') {
      let op = consume();
      let right = parseMulDiv();
      if (right === null) return null;
      if (op === '+') {
        val = val.add(right);
      } else {
        val = val.sub(right);
      }
    }
    return val;
  }
  
  try {
    return parseExpr();
  } catch (e) {
    return null;
  }
}

// Evaluador heurístico local para respuestas en lenguaje natural (sin LLM externo)
function evaluateAnswerLocally(studentInput, correctAnswers) {
  const normalizedStudent = normalizeAnswer(studentInput);
  
  // 1. Coincidencia exacta normalizada
  for (let correct of correctAnswers) {
    if (normalizeAnswer(correct) === normalizedStudent) {
      return true;
    }
  }

  // 1.5 Coincidencia algebraica compleja
  for (let correct of correctAnswers) {
    const sVal = parseComplexExpression(studentInput);
    const cVal = parseComplexExpression(correct);
    if (sVal !== null && cVal !== null) {
      const reDiff = Math.abs(sVal.re - cVal.re);
      const imDiff = Math.abs(sVal.im - cVal.im);
      if (reDiff < 1e-9 && imDiff < 1e-9) {
        return true;
      }
    }
  }

  // 2. Coincidencia numérica (para coordenadas, tuplas o números individuales)
  const canonicalCorrect = correctAnswers[0];
  const correctNumbers = extractNumbers(canonicalCorrect);
  const studentNumbers = extractNumbers(studentInput);

  if (correctNumbers.length > 0) {
    if (correctNumbers.length === studentNumbers.length) {
      let numbersMatch = true;
      for (let i = 0; i < correctNumbers.length; i++) {
        if (correctNumbers[i] !== studentNumbers[i]) {
          numbersMatch = false;
          break;
        }
      }
      if (numbersMatch) return true;
    }
  }

  // 3. Coincidencia de palabra clave (para respuestas puramente textuales como "paralelas", "trivial")
  for (let correct of correctAnswers) {
    const normalizedCorrect = normalizeAnswer(correct);
    // Si la respuesta correcta es una palabra sola relativamente larga y no contiene dígitos
    if (normalizedCorrect.length > 3 && !/\d/.test(normalizedCorrect)) {
      if (normalizedStudent.includes(normalizedCorrect)) {
        return true;
      }
    }
  }

  return false;
}
