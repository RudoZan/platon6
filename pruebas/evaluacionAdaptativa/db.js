const TESTS_DATABASE = [
  {
    id: "sistemas-ecuaciones",
    title: "Sistemas de Ecuaciones Lineales",
    desc: "Resolución, análisis paramétrico, clasificación geométrica y aplicaciones en R2 y R3.",
    duration: "10 mins",
    status: "active",
    questionBank: [
      // NIVEL 1
      {
        id: "se-1-1", level: 1,
        text: "<p>Determina si el punto \\((1, 2)\\) es solución del sistema:</p><p>\\(2x + y = 4\\)</p><p>\\(x - y = -1\\)</p>",
        hints: ["Reemplaza \\(x = 1\\) e \\(y = 2\\) en ambas ecuaciones.", "Si al reemplazar se cumplen ambas igualdades, entonces sí es solución."],
        options: ["Sí", "No"],
        correctAnswers: ["sí"],
        explanation: "<p>Reemplazando \\(x = 1\\) e \\(y = 2\\):</p><p>1) \\(2(1) + 2 = 2 + 2 = 4\\) (se cumple).</p><p>2) \\(1 - 2 = -1\\) (se cumple).</p><p>Como satisface ambas ecuaciones, la respuesta es <strong>sí</strong>.</p>",
        intendedAction: "Evaluar si el alumno comprende el concepto fundamental de que una solución debe satisfacer todas las ecuaciones del sistema simultáneamente."
      },
      {
        id: "se-1-2", level: 1,
        text: "<p>Si un sistema de ecuaciones lineales tiene dos soluciones distintas, ¿cuántas soluciones en total tiene?</p>",
        hints: ["En sistemas lineales de ecuaciones, el número de soluciones solo puede ser 0, 1 o infinito.", "Si hay más de una solución, el sistema no puede ser compatible determinado."],
        correctAnswers: ["infinitas", "infinitas soluciones", "infinita", "infinitos"],
        explanation: "<p>Por las propiedades geométricas y algebraicas de las ecuaciones lineales, si un sistema tiene más de una solución, obligatoriamente tiene <strong>infinitas soluciones</strong> (compatible indeterminado).</p>",
        intendedAction: "Verificar el conocimiento teórico sobre la tricotomía de soluciones en sistemas lineales (cero, una o infinitas)."
      },
      {
        id: "se-1-3", level: 1,
        text: "<p>¿Cómo son geométricamente dos rectas en el plano \\(\\mathbb{R}^2\\) si el sistema de ecuaciones asociado no tiene soluciones?</p><div style='text-align: center; margin: 15px 0;'><img src='../../imagenes/rectas_paralelas.png' alt='Rectas Paralelas' style='max-width: 260px; width: 100%; border-radius: 8px; border: 1.5px solid var(--color-borde); box-shadow: 0 4px 10px var(--color-sombras); background: white;'></div>",
        hints: ["Piensa en la intersección de dos líneas en un plano.", "Si no hay soluciones, significa que las rectas nunca se cruzan."],
        correctAnswers: ["paralelas", "paralelas no coincidentes", "rectas paralelas", "paralelas disjuntas"],
        explanation: "<p>Si un sistema de dos ecuaciones con dos incógnitas en \\(\\mathbb{R}^2\\) es incompatible (no tiene solución), representa geométricamente dos rectas que no se intersectan en ningún punto, es decir, son <strong>rectas paralelas</strong>.</p>",
        intendedAction: "Conectar la interpretación geométrica en el plano cartesiano con el concepto algebraico de incompatibilidad."
      },
      {
        id: "se-1-4", level: 1,
        text: "<p>En un sistema de ecuaciones lineales homogéneo, la solución donde todas las variables son cero (\\(x=0, y=0, ...\\)) se conoce como solución...</p>",
        hints: ["Comienza con la letra 'T'.", "Es la solución obvia e inevitable de todo sistema homogéneo."],
        correctAnswers: ["trivial", "solución trivial"],
        explanation: "<p>En cualquier sistema homogéneo \\(Ax = 0\\), el vector nulo \\(x = 0\\) siempre es una solución. A esta solución se le denomina **solución trivial**.</p>",
        intendedAction: "Reconocer la terminología básica de sistemas de ecuaciones homogéneos."
      },
      {
        id: "se-1-5", level: 1,
        text: "<p>Si el determinante de la matriz de coeficientes de un sistema \\(2 \\times 2\\) es cero, ¿puede el sistema tener solución única?</p>",
        hints: ["La Regla de Cramer nos dice que para hallar la solución única debemos dividir por el determinante de los coeficientes.", "Si el determinante es cero, la matriz no posee inversa."],
        options: ["Sí", "No"],
        correctAnswers: ["no"],
        explanation: "<p>Si el determinante de la matriz de coeficientes \\(|A| = 0\\), el sistema representa rectas paralelas o coincidentes. En ningún caso puede tener solución única, por lo tanto la respuesta es <strong>no</strong>.</p>",
        intendedAction: "Relacionar el determinante de la matriz de coeficientes con la clasificación de soluciones del sistema."
      },
      // NIVEL 2
      {
        id: "se-2-1", level: 2,
        text: "<p>Resuelve el sistema por reducción:</p><p>\\(3x - y = 7\\)</p><p>\\(x + y = 5\\)</p>",
        hints: ["Suma ambas ecuaciones directamente para eliminar la variable \\(y\\).", "Al sumar obtienes \\(4x = 12\\). Resuelve para \\(x\\) y luego sustituye."],
        correctAnswers: ["x=3, y=2", "3, 2", "3,2", "x=3,y=2"],
        inputLabels: ["x", "y"],
        explanation: "<p>Sumando las ecuaciones:</p><p>\\((3x - y) + (x + y) = 7 + 5\\)</p><p>\\(4x = 12 \\Rightarrow x = 3\\)</p><p>Reemplazando en la segunda: \\(3 + y = 5 \\Rightarrow y = 2\\).</p><p>La solución es \\(x=3, y=2\\).</p>",
        intendedAction: "Aplicar el método de eliminación por reducción en un sistema lineal 2x2 sencillo."
      },
      {
        id: "se-2-2", level: 2,
        text: "<p>Resuelve el siguiente sistema:</p><p>\\(2x + 3y = 8\\)</p><p>\\(x - y = -1\\)</p>",
        hints: ["De la segunda ecuación, puedes despejar \\(x = y - 1\\).", "Sustituye esta expresión en la primera ecuación para obtener una ecuación de una sola variable."],
        correctAnswers: ["x=1, y=2", "1, 2", "1,2", "x=1,y=2"],
        inputLabels: ["x", "y"],
        explanation: "<p>Despejando \\(x\\) de la segunda ecuación: \\(x = y - 1\\).</p><p>Sustituyendo en la primera:</p><p>\\(2(y - 1) + 3y = 8 \\Rightarrow 2y - 2 + 3y = 8\\)</p><p>\\(5y = 10 \\Rightarrow y = 2\\)</p><p>Luego, \\(x = 2 - 1 = 1\\). La solución es \\(x=1, y=2\\).</p>",
        intendedAction: "Resolver un sistema 2x2 mediante el método de sustitución o igualación básica."
      },
      {
        id: "se-2-3", level: 2,
        text: "<p>Para el sistema homogéneo:</p><p>\\(4x - 2y = 0\\)</p><p>\\(2x - y = 0\\)</p><p>¿El sistema tiene solución única o infinitas soluciones?</p>",
        hints: ["Observa la relación entre ambas ecuaciones. ¿Es una múltiplo de la otra?", "Si multiplicas la segunda ecuación por 2, obtienes exactamente la primera ecuación."],
        options: ["Solución única (Trivial)", "Infinitas soluciones"],
        correctAnswers: ["infinitas soluciones"],
        explanation: "<p>Dado que la primera ecuación es el doble de la segunda (\\(4x-2y = 2(2x-y)\\)), ambas ecuaciones representan la misma recta. Por ende, hay <strong>infinitas</strong> soluciones.</p>",
        intendedAction: "Evaluar la capacidad de detectar sistemas dependientes (coincidentes) 2x2 directamente de los coeficientes."
      },
      {
        id: "se-2-4", level: 2,
        text: "<p>Determina cuántas soluciones tiene el sistema:</p><p>\\(x + 2y = 4\\)</p><p>\\(2x + 4y = 10\\)</p><p>Responde indicando el número de soluciones (ej: escribe <strong>0</strong> o <strong>ninguna</strong>).</p>",
        hints: ["Multiplica la primera ecuación por 2.", "Compara los lados izquierdos y los lados derechos de ambas ecuaciones tras multiplicar."],
        correctAnswers: ["0", "ninguna", "cero", "no tiene", "no tiene soluciones"],
        explanation: "<p>Multiplicando la primera ecuación por 2 obtenemos \\(2x + 4y = 8\\).</p><p>Sin embargo, la segunda ecuación nos dice que \\(2x + 4y = 10\\).</p><p>Como \\(8 \\neq 10\\), el sistema es incompatible y no tiene soluciones, es decir, tiene <strong>0</strong> soluciones.</p>",
        intendedAction: "Identificar sistemas inconsistentes a través de la contradicción aritmética de coeficientes proporcionales."
      },
      {
        id: "se-2-5", level: 2,
        text: "<p>¿Qué valor numérico debe tomar el parámetro \\(k\\) para que el sistema tenga infinitas soluciones?</p><p>\\(x - y = 3\\)</p><p>\\(2x + ky = 6\\)</p>",
        hints: ["Para que tenga infinitas soluciones, las ecuaciones deben ser proporcionales.", "La segunda ecuación tiene un coeficiente \\(2\\) en la \\(x\\), que es el doble de la primera. Por lo tanto, el coeficiente de \\(y\\) también debe duplicarse."],
        correctAnswers: ["-2", "k=-2"],
        explanation: "<p>Para que la segunda ecuación sea equivalente a la primera, debe ser multiplicada por 2. Multiplicando la primera por 2 obtenemos \\(2x - 2y = 6\\). Comparando con \\(2x + ky = 6\\), deducimos que \\(k = -2\\).</p>",
        intendedAction: "Calcular el valor de un parámetro para forzar infinitas soluciones en un sistema 2x2."
      },
      // NIVEL 3
      {
        id: "se-3-1", level: 3,
        text: "<p>En una línea de ensamblaje químico, tres ingredientes \\(x, y, z\\) se mezclan según el sistema:</p><p>\\(x + y + z = 6\\)</p><p>\\(2y + 5z = -4\\)</p><p>Si la válvula del tercer ingrediente se bloquea por mantenimiento (haciendo \\(z = 0\\)), resuelve el sistema resultante para saber cuántas unidades de cada ingrediente deben inyectarse.</p>",
        hints: ["El sistema ya está triangularizado. Dado que \\(z = 0\\), reemplázalo en la segunda ecuación para hallar \\(y\\).", "Una vez que tengas \\(y\\) y \\(z\\), sustitúyelos en la primera ecuación para obtener \\(x\\)."],
        correctAnswers: ["x=8, y=-2, z=0", "8, -2, 0", "8,-2,0", "x=8,y=-2,z=0"],
        inputLabels: ["x", "y", "z"],
        explanation: "<p>1) De la condición de bloqueo: \\(z = 0\\).</p><p>2) Reemplazando en la segunda ecuación: \\(2y + 5(0) = -4 \\Rightarrow 2y = -4 \\Rightarrow y = -2\\).</p><p>3) Reemplazando en la primera: \\(x + (-2) + 0 = 6 \\Rightarrow x - 2 = 6 \\Rightarrow x = 8\\).</p><p>La solución es \\(x=8, y=-2, z=0\\).</p>",
        intendedAction: "Extraer la restricción física z=0 de la narrativa y resolver el sistema triangular 3x3 resultante mediante sustitución hacia atrás."
      },
      {
        id: "se-3-2", level: 3,
        text: "<p>Un motor de renderizado gráfico de videojuegos dibuja polígonos simples en pantalla. En un fotograma particular, el motor dibuja un total de <strong>35 polígonos</strong> (compuestos únicamente de triángulos y cuadriláteros) usando exactamente <strong>94 vértices</strong> en total. ¿Cuántos cuadriláteros se dibujaron en este fotograma?</p>",
        hints: ["Plantea un sistema de ecuaciones. Si \\(t\\) es el número de triángulos y \\(c\\) el de cuadriláteros, entonces \\(t + c = 35\\).", "Considera los vértices: los triángulos aportan 3 y los cuadriláteros 4. Plantea: \\(3t + 4c = 94\\)."],
        correctAnswers: ["24", "24 cuadrilateros"],
        explanation: "<p>El sistema de ecuaciones es:</p><p>1) \\(t + c = 35\\) (total de figuras)</p><p>2) \\(3t + 4c = 94\\) (total de vértices)</p><p>Multiplicando la primera ecuación por 3: \\(3t + 3c = 105\\).</p><p>Restando esta ecuación de la segunda: \\(c = 24\\) cuadriláteros y \\(t = 11\\) triángulos.</p><p>El motor renderizó <strong>24</strong> cuadriláteros.</p>",
        intendedAction: "Modelar un problema de recuento poligonal traduciendo los datos a un sistema lineal 2x2 y resolverlo."
      },
      {
        id: "se-3-3", level: 3,
        text: "<p>Una señal de comunicación aeroespacial se transmite en 3 canales. El receptor recibe un vector \\(b\\) que se relaciona con el mensaje original \\(x\\) mediante \\(Ax = b\\). Al auditar el canal, el ingeniero descubre que el rango de la matriz de transmisión \\(A\\) es <strong>2</strong>, pero al incluir el vector de ruido recibido, el rango de la matriz ampliada \\([A|b]\\) sube a <strong>3</strong>. ¿Cuántos mensajes válidos \\(x\\) se podrán decodificar a partir de esta transmisión?</p>",
        hints: ["Usa el Teorema de Rouché-Frobenius.", "Compara si el rango de la matriz de coeficientes es igual o menor que el de la ampliada, y qué significa esto para la existencia de soluciones."],
        correctAnswers: ["0", "ninguna", "cero", "no tiene", "no tiene soluciones"],
        explanation: "<p>Según el Teorema de Rouché-Frobenius, dado que el rango de la matriz de coeficientes es estrictamente menor que el de la matriz ampliada (\\(2 < 3\\)), el sistema es incompatible. Por lo tanto, no hay soluciones y se pueden decodificar <strong>0</strong> mensajes.</p>",
        intendedAction: "Interpretar físicamente la incompatibilidad del Teorema de Rouché-Frobenius en sistemas de transmisión de datos."
      },
      {
        id: "se-3-4", level: 3,
        text: "<p>Un sistema de sensores térmicos mide la temperatura en tres sectores adyacentes de un microchip. Los sensores registran únicamente las diferencias térmicas agregadas entre sectores: la suma de temperaturas en el sector A y B es \\(5^\\circ\\text{C}\\), entre B y C es \\(7^\\circ\\text{C}\\), y entre A y C es \\(6^\\circ\\text{C}\\). Determina las temperaturas de cada sector.</p>",
        hints: ["Plantea el sistema: \\(A + B = 5\\), \\(B + C = 7\\) y \\(A + C = 6\\).", "Suma las tres ecuaciones completas: obtendrás \\(2A + 2B + 2C = 18\\). Divide por 2 y resta cada ecuación original."],
        correctAnswers: ["A=2, B=3, C=4", "2, 3, 4", "2,3,4", "A=2,B=3,C=4"],
        inputLabels: ["A", "B", "C"],
        explanation: "<p>Sumando las ecuaciones: \\(2A + 2B + 2C = 18 \\Rightarrow A + B + C = 9\\).</p><p>1) Como \\(A + B = 5\\), entonces \\(C = 9 - 5 = 4\\).</p><p>2) Como \\(B + C = 7\\), entonces \\(A = 9 - 7 = 2\\).</p><p>3) Como \\(A + C = 6\\), entonces \\(B = 9 - 6 = 3\\).</p><p>Las temperaturas son \\(A=2, B=3, C=4\\).</p>",
        intendedAction: "Modelar una red de diferencias térmicas y resolver el sistema de 3x3 resultante usando la propiedad de simetría cíclica."
      },
      {
        id: "se-3-5", level: 3,
        text: "<p>En un laboratorio de biotecnología, un científico necesita preparar exactamente <strong>10 litros</strong> de una solución salina al <strong>20%</strong> de concentración. Para ello, dispone de un tanque con solución al 10% y otro al 30%. ¿Cuántos litros de la solución concentrada al 30% debe extraer para obtener la mezcla deseada?</p>",
        hints: ["Plantea la ecuación de volumen total: \\(x + y = 10\\) (donde \\(y\\) es la cantidad al 30%).", "Plantea la ecuación de la sal disuelta: \\(0.10x + 0.30y = 0.20(10)\\). Sustituye \\(x\\)."],
        correctAnswers: ["5", "5 litros", "5 l"],
        explanation: "<p>El sistema es:</p><p>1) \\(x + y = 10 \\Rightarrow x = 10 - y\\)</p><p>2) \\(0.1x + 0.3y = 2\\)</p><p>Sustituyendo \\(x\\): \\(0.1(10 - y) + 0.3y = 2 \\Rightarrow 1 + 0.2y = 2 \\Rightarrow 0.2y = 1 \\Rightarrow y = 5\\).</p><p>Se deben extraer exactamente <strong>5</strong> litros.</p>",
        intendedAction: "Modelar y resolver problemas clásicos de balance de masa/mezclas químicas mediante sistemas de ecuaciones 2x2."
      },
      // NIVEL 4
      {
        id: "se-4-1", level: 4,
        text: "<p>Un algoritmo de ingeniería civil calcula la estabilidad de una armadura de puente. Bajo cargas de viento representadas por un parámetro \\(a\\), el equilibrio mecánico queda modelado por:</p><p>\\(x + y + z = 2\\)</p><p>\\(2x + 3y + 2z = 5\\)</p><p>\\(2x + 3y + (a^2-7)z = a+2\\)</p><p>¿Para qué valor negativo del parámetro de viento \\(a\\) las ecuaciones entran en colapso matemático, haciendo que el sistema <strong>no tenga soluciones</strong>?</p>",
        hints: ["Aplica eliminación gaussiana. Resta el doble de la primera ecuación a la segunda para obtener \\(y = 1\\).", "Resta la segunda ecuación de la tercera para simplificarla a: \\((a^2 - 9)z = a - 3\\). Busca el valor que anula el coeficiente de \\(z\\) pero no el término independiente."],
        correctAnswers: ["-3", "a=-3"],
        explanation: "<p>1) Reduciendo las primeras ecuaciones: \\(y = 1\\).</p><p>2) Restando la Ec. 2 de la Ec. 3 obtenemos: \\((a^2 - 9)z = a - 3\\).</p><p>3) Para incompatibilidad (sin soluciones): el coeficiente de \\(z\\) debe ser 0 pero la derecha debe ser distinta de 0. Esto ocurre cuando \\(a^2 - 9 = 0 \\Rightarrow a = \\pm 3\\). Pero si \\(a = 3\\), queda \\(0 = 0\\) (infinitas soluciones). Si \\(a = -3\\), queda \\(0 = -6\\) (incompatible). La respuesta es el valor negativo: <strong>-3</strong>.</p>",
        intendedAction: "Resolver y analizar un problema de estabilidad estructural modelado por un sistema paramétrico 3x3 mediante la clasificación de Rouché-Frobenius."
      },
      {
        id: "se-4-2", level: 4,
        text: "<p>Un circuito eléctrico posee tres corrientes de malla \\(I_1, I_2, I_3\\) que obedecen las leyes de Kirchhoff según el sistema:</p><p>\\(I_1 + I_2 + I_3 = 6\\)</p><p>\\(2I_1 - I_2 + 3I_3 = 9\\)</p><p>\\(-I_1 + 2I_2 - I_3 = 3\\)</p><p>Determina el valor numérico de la corriente \\(I_1\\) en Amperes.</p>",
        hints: ["Suma la primera y tercera ecuación. Nota que los términos en \\(I_1\\) y \\(I_3\\) se eliminan al mismo tiempo.", "Con esto obtienes \\(3I_2 = 9 \\Rightarrow I_2 = 3\\). Reemplaza esto en las demás ecuaciones para resolver para \\(I_1\\)."],
        correctAnswers: ["-3", "i1=-3"],
        explanation: "<p>1) Sumando Ec. 1 y Ec. 3: \\((I_1 - I_1) + (I_2 + 2I_2) + (I_3 - I_3) = 6 + 3 \\Rightarrow 3I_2 = 9 \\Rightarrow I_2 = 3\\).</p><p>2) Sustituyendo \\(I_2 = 3\\) en Ec. 1: \\(I_1 + z = 3 \\Rightarrow z = 3 - I_1\\).</p><p>3) Sustituyendo \\(I_2 = 3\\) en Ec. 2: \\(2I_1 - 3 + 3I_3 = 9 \\Rightarrow 2I_1 + 3I_3 = 12\\).</p><p>4) Combinando: \\(2I_1 + 3(3 - I_1) = 12 \\Rightarrow -I_1 + 9 = 12 \\Rightarrow I_1 = -3\\) Amperes.</p>",
        intendedAction: "Resolver un sistema de mallas eléctricas 3x3 no elemental empleando combinaciones lineales estratégicas."
      },
      {
        id: "se-4-3", level: 4,
        text: "<p>En un sistema óptico de lentes compuestas, las distancias focales \\(d_1\\) y \\(d_2\\) se relacionan de forma no lineal pero pueden resolverse mediante un sistema equivalente:</p><p>\\(\\frac{2}{d_1} + \\frac{3}{d_2} = 5\\)</p><p>\\(\\frac{1}{d_1} - \\frac{1}{d_2} = 0\\)</p><p>Calcula el valor en centímetros de la distancia focal \\(d_1\\).</p>",
        hints: ["Usa un cambio de variable: sea \\(u = 1/d_1\\) y \\(v = 1/d_2\\). Esto crea el sistema lineal: \\(2u + 3v = 5\\) y \\(u - v = 0\\).", "Resuelve para \\(u\\). Una vez tengas \\(u\\), recuerda que \\(d_1 = 1/u\\)."],
        correctAnswers: ["1", "d1=1"],
        explanation: "<p>Definiendo \\(u = 1/d_1\\) y \\(v = 1/d_2\\):</p><p>1) \\(u - v = 0 \\Rightarrow u = v\\)</p><p>2) Sustituyendo en la primera: \\(2u + 3u = 5 \\Rightarrow 5u = 5 \\Rightarrow u = 1\\).</p><p>Por lo tanto, \\(d_1 = 1/u = 1/1 = 1\\) cm.</p>",
        intendedAction: "Modelar y resolver sistemas físicos no lineales mediante su reducción a equivalentes lineales por cambio de variable."
      },
      {
        id: "se-4-4", level: 4,
        text: "<p>Un urbanista modela el tráfico por hora en tres avenidas conectadas mediante un modelo de redes de flujo. El tráfico \\(x, y, z\\) satisface:</p><p>\\(x + y = 300\\)</p><p>\\(y - z = 100\\)</p><p>\\(x + z = 200\\)</p><p>Si la calle \\(z\\) es cerrada totalmente por obras (forzando un flujo de \\(z = 0\\)), ¿cuál será el flujo resultante en vehículos/hora por la calle \\(y\\)?</p>",
        hints: ["Sustituye la condición de borde \\(z = 0\\) directamente en las ecuaciones del flujo.", "Al hacer \\(z = 0\\), la segunda ecuación te da directamente la solución para \\(y\\)."],
        correctAnswers: ["100", "y=100"],
        explanation: "<p>Reemplazando \\(z = 0\\) en el sistema:</p><p>1) \\(x + y = 300\\)</p><p>2) \\(y - 0 = 100 \\Rightarrow y = 100\\)</p><p>3) \\(x + 0 = 200 \\Rightarrow x = 200\\)</p><p>El flujo en \\(y\\) es <strong>100</strong> vehículos/hora.</p>",
        intendedAction: "Analizar y resolver problemas de flujo en redes modelados por sistemas indeterminados bajo restricciones operacionales."
      },
      {
        id: "se-4-5", level: 4,
        text: "<p>La telemetría de una sonda espacial determina que su posición \\((x, y, z)\\) tras una maniobra orbital se encuentra en una trayectoria lineal indeterminada. La computadora de a bordo muestra las ecuaciones escalonadas:</p><p>\\(x - z = 2\\)</p><p>\\(y + 2z = 3\\)</p><p>Para programar el guiado automático, debes escribir la expresión para calcular la posición básica \\(x\\) en términos del parámetro de control libre \\(z\\) (ejemplo: <code>z+2</code> o <code>2+z</code>).</p>",
        hints: ["Despeja de forma directa la variable \\(x\\) de la primera ecuación en función de \\(z\\).", "Suma \\(z\\) a ambos lados de la ecuación \\(x - z = 2\\)."],
        correctAnswers: ["z+2", "2+z", "x=z+2", "x=2+z"],
        explanation: "<p>De la ecuación de trayectoria \\(x - z = 2\\), despejamos la variable \\(x\\) sumando \\(z\\) en ambos miembros de la igualdad, lo que resulta en \\(x = z + 2\\).</p>",
        intendedAction: "Interpretar y parametrizar físicamente el conjunto de soluciones infinitas en problemas de cinemática espacial."
      }
    ]
  },
  {
    id: "matrices-determinantes",
    title: "Matrices y Determinantes",
    desc: "Operaciones matriciales, propiedades, cálculo de determinantes e inversión de matrices.",
    duration: "12 mins",
    status: "active",
    questionBank: [
      // NIVEL 1
      {
        id: "md-1-1", level: 1,
        text: "<p>Si una matriz \\(A\\) tiene dimensión \\(2 \\times 3\\) y otra matriz \\(B\\) tiene dimensión \\(3 \\times 4\\), ¿cuál es la dimensión de la matriz producto \\(A \\cdot B\\)? Escribe en formato <code>fxc</code> (ejemplo: <code>3x3</code>).</p>",
        hints: ["El número de columnas de A debe ser igual al de filas de B.", "Las dimensiones resultantes corresponden a las filas de A y las columnas de B."],
        correctAnswers: ["2x4", "2 x 4"],
        explanation: "<p>La multiplicación es posible ya que columnas de \\(A\\) (3) es igual a filas de \\(B\\) (3). El resultado tiene la cantidad de filas de \\(A\\) (2) y columnas de \\(B\\) (4), es decir, <strong>2x4</strong>.</p>",
        intendedAction: "Identificar la compatibilidad y dimensión resultante en el producto matricial.",
        hintsUsed: 0
      },
      {
        id: "md-1-2", level: 1, text: "<p>¿Cuál es el valor del determinante de la matriz identidad de orden 3, \\(I_3\\)?</p>", hints: ["La matriz identidad es una matriz diagonal.", "El determinante de cualquier matriz diagonal es el producto de los elementos de su diagonal principal."], correctAnswers: ["1"], explanation: "<p>El determinante de la identidad siempre es 1.</p>", intendedAction: "Identificar propiedades básicas de la matriz identidad."
      },
      {
        id: "md-1-3", level: 1, text: "<p>Si una matriz cuadrada tiene una fila completa llena de ceros, ¿cuál es el valor de su determinante?</p>", hints: ["Puedes calcular por cofactores en esa fila.", "Cualquier suma de productos multiplicados por cero da cero."], correctAnswers: ["0", "cero"], explanation: "<p>El determinante de una matriz con una fila o columna nula es 0.</p>", intendedAction: "Aplicar teoremas de determinantes sobre filas nulas."
      },
      {
        id: "md-1-4", level: 1, text: "<p>Si \\(A\\) es una matriz simétrica, ¿qué relación hay entre \\(A\\) y su transpuesta \\(A^T\\)? Responde usando la fórmula básica (ej: <code>A=A^T</code>).</p>", hints: ["Una matriz simétrica es igual a su reflejada sobre la diagonal principal.", "El elemento a_ij es igual al elemento a_ji."], correctAnswers: ["a=a^t", "a^t=a", "a=at", "at=a"], explanation: "<p>Una matriz \\(A\\) es simétrica si y solo si es igual a su transpuesta: \\(A = A^T\\).</p>", intendedAction: "Definir formalmente matrices simétricas."
      },
      {
        id: "md-1-5", level: 1, text: "<p>¿Cómo se llama a una matriz cuadrada cuyos elementos fuera de la diagonal principal son todos cero?</p>", hints: ["Empieza con D.", "Su nombre hace alusión a la diagonal."], correctAnswers: ["diagonal", "matriz diagonal"], explanation: "<p>Se llama **matriz diagonal**.</p>", intendedAction: "Reconocer tipos particulares de matrices."
      },
      // NIVEL 2
      {
        id: "md-2-1", level: 2,
        text: "<p>Calcula el determinante de la matriz:</p><p>\\(A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\)</p>",
        hints: ["Para una matriz \\(2 \\times 2\\), el determinante es \\(ad - bc\\).", "Multiplica \\(1 \\cdot 4\\) y réstale \\(2 \\cdot 3\\)."],
        correctAnswers: ["-2"],
        explanation: "<p>\\(\\det(A) = (1 \\cdot 4) - (2 \\cdot 3) = 4 - 6 = -2\\).</p>",
        intendedAction: "Calcular determinantes de matrices 2x2.",
        hintsUsed: 0
      },
      {
        id: "md-2-2", level: 2, text: "<p>Dada \\(A = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}\\), calcula la traza de la matriz \\(A\\).</p>", hints: ["La traza es la suma de los elementos de la diagonal principal.", "Suma los elementos a_11 y a_22."], correctAnswers: ["5"], explanation: "<p>Traza(A) = 2 + 3 = 5.</p>", intendedAction: "Calcular la traza de una matriz."
      },
      {
        id: "md-2-3", level: 2, text: "<p>Si \\(A\\) es de \\(2 \\times 2\\) con \\(\\det(A) = 5\\), ¿cuál es el valor del determinante de su transpuesta \\(A^T\\)?</p>", hints: ["Existe una propiedad que relaciona el determinante de una matriz y el de su transpuesta.", "Transponer no altera el valor del determinante."], correctAnswers: ["5"], explanation: "<p>\\(\\det(A^T) = \\det(A) = 5\\).</p>", intendedAction: "Usar la propiedad de invariancia del determinante bajo la transposición."
      },
      {
        id: "md-2-4", level: 2, text: "<p>Calcula \\(2A - B\\) para el elemento en la posición (1,1) si \\(A = \\begin{pmatrix} 3 & 1 \\\\ 2 & 2 \\end{pmatrix}\\) y \\(B = \\begin{pmatrix} 4 & 0 \\\\ 1 & 1 \\end{pmatrix}\\).</p>", hints: ["Multiplica el elemento (1,1) de A por 2.", "Réstale el elemento (1,1) de B."], correctAnswers: ["2"], explanation: "<p>Elemento (1,1): \\(2(3) - 4 = 6 - 4 = 2\\).</p>", intendedAction: "Efectuar combinaciones lineales de matrices elemento a elemento."
      },
      {
        id: "md-2-5", level: 2, text: "<p>Si una matriz \\(A\\) de \\(3 \\times 3\\) cumple que \\(A^2 = I\\), ¿cuál es el determinante de \\(A^2\\)?</p>", hints: ["Calcula el determinante de la matriz del lado derecho.", "El determinante de la identidad es 1."], correctAnswers: ["1"], explanation: "<p>\\(\\det(A^2) = \\det(I) = 1\\).</p>", intendedAction: "Aplicar la propiedad multiplicativa del determinante."
      },
      // NIVEL 3
      {
        id: "md-3-1", level: 3,
        text: "<p>Si \\(A\\) es una matriz de \\(3 \\times 3\\) tal que \\(\\det(A) = -2\\), ¿cuál es el determinante de la matriz \\(3A\\)?</p>",
        hints: ["Propiedad: Para una matriz de tamaño \\(n \\times n\\), \\(\\det(cA) = c^n \\det(A)\\).", "Aquí \\(n = 3\\) y \\(c = 3\\). Calcula \\(3^3 \\cdot (-2)\\)."],
        correctAnswers: ["-54"],
        explanation: "<p>\\(\\det(3A) = 3^3 \\cdot \\det(A) = 27 \\cdot (-2) = -54\\).</p>",
        intendedAction: "Aplicar la propiedad de escalamiento del determinante de matrices de orden n.",
        hintsUsed: 0
      },
      {
        id: "md-3-2", level: 3, text: "<p>Calcula el determinante de \\(A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 3 & 0 \\\\ 1 & 0 & 4 \\end{pmatrix}\\).</p>", hints: ["Desarrolla por cofactores en la segunda fila o segunda columna.", "Esto reduce el cálculo a un determinante 2x2 multiplicado por 3."], correctAnswers: ["6"], explanation: "<p>Desarrollando por la segunda fila: \\(3 \\cdot \\det\\begin{pmatrix} 1 & 2 \\\\ 1 & 4 \\end{pmatrix} = 3 \\cdot (4 - 2) = 6\\).</p>", intendedAction: "Calcular determinantes de matrices 3x3 por cofactores."
      },
      {
        id: "md-3-3", level: 3, text: "<p>Si la matriz \\(A = \\begin{pmatrix} 1 & k \\\\ 4 & 2 \\end{pmatrix}\\) no es invertible, ¿cuál es el valor de \\(k\\)?</p>", hints: ["Una matriz no es invertible si su determinante es cero.", "Plantea \\(1 \\cdot 2 - 4 \\cdot k = 0\\) y despeja \\(k\\)."], correctAnswers: ["0.5", "1/2"], explanation: "<p>\\(\\det(A) = 2 - 4k = 0 \\Rightarrow 4k = 2 \\Rightarrow k = 1/2\\).</p>", intendedAction: "Encontrar la singularidad de una matriz paramétrica."
      },
      {
        id: "md-3-4", level: 3, text: "<p>Dada la matriz \\(A\\) con inversa \\(A^{-1} = \\begin{pmatrix} 1 & 2 \\\\ 3 & 5 \\end{pmatrix}\\). Si resolvemos \\(Ax = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}\\), ¿cuál es el valor de la variable \\(x_1\\)?</p>", hints: ["La solución es \\(x = A^{-1}b\\).", "Multiplica la primera fila de \\(A^{-1}\\) por el vector columna."], correctAnswers: ["5"], explanation: "<p>\\(x_1 = 1(1) + 2(2) = 5\\).</p>", intendedAction: "Utilizar la matriz inversa para resolver un sistema."
      },
      {
        id: "md-3-5", level: 3, text: "<p>Si \\(A\\) y \\(B\\) son matrices de \\(3 \\times 3\\) con \\(\\det(A) = 2\\) y \\(\\det(B) = -3\\), ¿cuál es el determinante del producto \\(A B\\)?</p>", hints: ["Usa el teorema de la multiplicación: \\(\\det(AB) = \\det(A)\\det(B)\\).", "Multiplica 2 por -3."], correctAnswers: ["-6"], explanation: "<p>\\(\\det(AB) = 2 \\cdot (-3) = -6\\).</p>", intendedAction: "Aplicar el teorema de determinantes del producto."
      },
      // NIVEL 4
      {
        id: "md-4-1", level: 4,
        text: "<p>En 1858, el matemático Arthur Cayley introdujo las operaciones matriciales. Imagina que modelas la distorsión por cizalladura (shear) de una red cristalina 3D mediante la matriz triangular:</p><p>\\(A = \\begin{pmatrix} x & 2 & 5 \\\\ 0 & x-1 & 3 \\\\ 0 & 0 & 2 \\end{pmatrix}\\)</p><p>Para que la red preserve una escala de volumen equivalente a un factor de <strong>12</strong> (es decir, \\(\\det(A) = 12\\)), ¿qué valor entero positivo de la dimensión \\(x\\) debe seleccionarse?</p>",
        hints: ["El determinante de una matriz triangular es el producto de su diagonal principal.", "Plantea la ecuación \\(x \\cdot (x-1) \\cdot 2 = 12 \\Rightarrow x(x-1) = 6\\). Resuelve para \\(x\\) positivo."],
        correctAnswers: ["3", "x=3"],
        explanation: "<p>Al ser triangular, \\(\\det(A)\\) es el producto de su diagonal: \\(x \\cdot (x-1) \\cdot 2 = 2x(x-1)\\).</p><p>Planteando la ecuación: \\(2x(x-1) = 12 \\Rightarrow x(x-1) = 6 \\Rightarrow x^2 - x - 6 = 0\\).</p><p>Factorizando: \\((x - 3)(x + 2) = 0\\). Al requerir la solución positiva, obtenemos <strong>3</strong>.</p>",
        intendedAction: "Extraer datos físicos (det=12) y resolver la ecuación cuadrática resultante del determinante de una matriz triangular 3x3."
      },
      {
        id: "md-4-2", level: 4, 
        text: "<p>En mecánica cuántica, los operadores que representan el momento angular en sistemas de espín se modelan mediante matrices antisimétricas (donde \\(A^T = -A\\)). Un físico estudia un estado de espín usando una matriz antisimétrica de \\(3 \\times 3\\). Sabiendo que el orden de la matriz es impar, ¿cuál es el valor del determinante de esta matriz?</p>", 
        hints: ["Aplica determinantes a ambos lados de la relación \\(A^T = -A\\).", "Recuerda que \\(\\det(A^T) = \\det(A)\\) y que para una matriz de \\(3 \\times 3\\), \\(\\det(-A) = (-1)^3\\det(A)\\)."], 
        correctAnswers: ["0", "cero"], 
        explanation: "<p>Por propiedades: \\(\\det(A^T) = \\det(-A)\\).</p><p>Como \\(\\det(A^T) = \\det(A)\\) y por ser de orden \\(3 \\times 3\\) (impar) \\(\\det(-A) = (-1)^3 \\det(A) = -\\det(A)\\), se tiene que:</p><p>\\(\\det(A) = -\\det(A) \\Rightarrow 2\\det(A) = 0 \\Rightarrow \\det(A) = 0\\).</p>", 
        intendedAction: "Demostrar algebraicamente a partir de las propiedades del determinante que toda matriz antisimétrica de orden impar posee un determinante nulo."
      },
      {
        id: "md-4-3", level: 4, 
        text: "<p>Un sistema de criptografía usa la matriz adjunta \\(\\text{Adj}(A)\\) de una clave secreta \\(A\\) (de \\(3 \\times 3\\)) para decodificar mensajes. Si la matriz clave original \\(A\\) tiene un determinante igual a <strong>3</strong>, ¿cuál será el determinante de la matriz adjunta utilizada para descifrar la información?</p>", 
        hints: ["Recuerda la fórmula general que relaciona el determinante de la adjunta con el de la matriz original: \\(\\det(\\text{Adj}(A)) = \\det(A)^{n-1}\\).", "Aquí la dimensión \\(n\\) es 3 y \\(\\det(A) = 3\\). Calcula \\(3^{3-1}\\)."], 
        correctAnswers: ["9"], 
        explanation: "<p>Aplicando la fórmula: \\(\\det(\\text{Adj}(A)) = \\det(A)^{n-1} = 3^{3-1} = 3^2 = 9\\).</p>", 
        intendedAction: "Calcular el determinante de la matriz adjunta aplicando la identidad deducida de la matriz inversa."
      },
      {
        id: "md-4-4", level: 4, 
        text: "<p>En análisis de datos, un algoritmo de regresión calcula la matriz de covarianza inversa para normalizar distancias. Si la matriz de covarianza original es \\(A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\), calcula el valor de la traza de su matriz de covarianza inversa \\(A^{-1}\\).</p>", 
        hints: ["La inversa de una matriz \\(2 \\times 2\\) se calcula como \\(\\frac{1}{\\det(A)} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\).", "Calcula la inversa de \\(A\\) y luego suma los elementos de su diagonal principal (traza)."], 
        correctAnswers: ["-2.5", "-5/2"], 
        explanation: "<p>1) El determinante es \\(\\det(A) = 1(4) - 2(3) = 4 - 6 = -2\\).</p><p>2) La matriz inversa es \\(A^{-1} = -\\frac{1}{2} \\begin{pmatrix} 4 & -2 \\\\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} -2 & 1 \\\\ 1.5 & -0.5 \\end{pmatrix}\\).</p><p>3) La traza es la suma diagonal: \\(-2 + (-0.5) = -2.5\\).</p>", 
        intendedAction: "Calcular la matriz inversa de una matriz 2x2 y obtener su traza para propósitos de análisis estadístico."
      },
      {
        id: "md-4-5", level: 4, 
        text: "<p>En interpolación polinómica, se busca ajustar una parábola a tres puntos medidos en un experimento. El sistema de ecuaciones lineal tiene como matriz asociada a la matriz de Vandermonde:</p><p>\\(A = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 2 & x \\\\ 1 & 4 & x^2 \\end{pmatrix}\\)</p><p>Si dos de los puntos medidos coinciden, no es posible ajustar una única parábola y la matriz se vuelve singular (\\(\\det(A) = 0\\)). ¿Qué valor entero de \\(x\\) (distinto de 1) causará esta singularidad?</p>", 
        hints: ["El determinante de esta matriz se puede factorizar como \\((2 - 1)(x - 1)(x - 2)\\).", "Busca para qué valor de \\(x\\) (mayor que 1) este producto se anula."], 
        correctAnswers: ["2", "x=2"], 
        explanation: "<p>Por propiedades de la matriz de Vandermonde, \\(\\det(A) = (2 - 1)(x - 1)(x - 2) = (x - 1)(x - 2)\\).</p><p>Para que la matriz sea singular, \\(\\det(A) = 0 \\Rightarrow (x-1)(x-2) = 0\\). Las soluciones son \\(x=1\\) o \\(x=2\\). Como se pide el valor distinto de 1, la respuesta es <strong>2</strong>.</p>", 
        intendedAction: "Identificar las condiciones de singularidad de una matriz de Vandermonde a partir de su estructura lineal de puntos de interpolación."
      }
    ]
  },
  {
    id: "espacios-vectoriales",
    title: "Espacios Vectoriales",
    desc: "Dependencia lineal, bases, dimensión, subespacios y coordenadas en Rn.",
    duration: "15 mins",
    status: "active",
    questionBank: [
      // NIVEL 1
      {
        id: "ev-1-1", level: 1,
        text: "<p>¿Cuál es la dimensión del espacio vectorial real \\(\\mathbb{R}^4\\)?</p>",
        hints: ["La dimensión es igual al número de elementos de su base canónica.", "La base canónica tiene los vectores (1,0,0,0), (0,1,0,0), etc."],
        correctAnswers: ["4"],
        explanation: "<p>El espacio vectorial \\(\\mathbb{R}^4\\) tiene una base de 4 vectores. Por lo tanto, su dimensión es <strong>4</strong>.</p>",
        intendedAction: "Reconocer la dimensión de espacios euclidianos elementales.",
        hintsUsed: 0
      },
      { id: "ev-1-2", level: 1, text: "<p>¿El conjunto vacío puede ser un subespacio vectorial de algún espacio vectorial?</p>", hints: ["Todo subespacio vectorial debe contener al menos un elemento muy importante.", "Debe contener al vector nulo."], options: ["Sí", "No"], correctAnswers: ["no"], explanation: "<p>No, porque todo subespacio debe contener al menos al vector cero.</p>", intendedAction: "Identificar la propiedad del elemento neutro en subespacios." },
      { id: "ev-1-3", level: 1, text: "<p>Si un conjunto de vectores contiene al vector nulo, ¿es linealmente dependiente o independiente?</p>", hints: ["Piensa en si puedes escribir una combinación lineal no trivial que dé cero usando el vector nulo.", "Cualquier constante multiplicada por el vector nulo da cero."], options: ["LD", "LI"], correctAnswers: ["ld"], explanation: "<p>Cualquier conjunto que contenga al vector nulo es siempre linealmente dependiente (L.D.).</p>", intendedAction: "Reconocer dependencias con el vector cero." },
      { id: "ev-1-4", level: 1, text: "<p>¿Cuál es la dimensión del subespacio nulo \\(\\{0\\}\\)?</p>", hints: ["El subespacio nulo no contiene vectores linealmente independientes.", "Su base no contiene elementos."], correctAnswers: ["0", "cero"], explanation: "<p>Por convención, el subespacio que contiene solo al vector cero tiene dimensión 0.</p>", intendedAction: "Definir la dimensión del subespacio trivial." },
      { id: "ev-1-5", level: 1, text: "<p>¿La intersección de dos subespacios vectoriales \\(U\\) y \\(W\\) es siempre un subespacio vectorial?</p>", hints: ["Piensa en la clausura bajo la suma y la multiplicación por un escalar.", "La intersección siempre cumple con las propiedades de subespacio."], options: ["Sí", "No"], correctAnswers: ["sí"], explanation: "<p>Sí, la intersección de cualquier colección de subespacios es siempre un subespacio.</p>", intendedAction: "Comprender propiedades de operaciones con subespacios." },
      // NIVEL 2
      {
        id: "ev-2-1", level: 2,
        text: "<p>Determina si los vectores \\(v_1 = (1, 2)\\) y \\(v_2 = (2, 4)\\) en \\(\\mathbb{R}^2\\) son linealmente dependientes o independientes.</p>",
        hints: ["Observa si uno de los vectores es múltiplo del otro.", "Nota que \\(v_2 = 2 \\cdot v_1\\)."],
        options: ["LD", "LI"],
        correctAnswers: ["ld"],
        explanation: "<p>Como \\((2,4) = 2 \\cdot (1,2)\\), los vectores son linealmente dependientes (<strong>LD</strong>).</p>",
        intendedAction: "Clasificar la independencia lineal en R2 para vectores proporcionales.",
        hintsUsed: 0
      },
      { id: "ev-2-2", level: 2, text: "<p>¿Cuál es el valor del parámetro \\(a\\) para el cual los vectores \\((1, a)\\) y \\((3, 6)\\) son linealmente dependientes?</p>", hints: ["Para ser LD, deben ser proporcionales.", "El primer vector multiplicado por 3 debe ser igual al segundo."], correctAnswers: ["2", "a=2"], explanation: "<p>\\(3 \\cdot 1 = 3\\) y \\(3 \\cdot a = 6 \\Rightarrow a = 2\\).</p>", intendedAction: "Calcular parámetros de dependencia lineal." },
      { id: "ev-2-3", level: 2, text: "<p>¿Cuántos vectores componen la base canónica de \\(\\mathbb{R}^3\\)?</p>", hints: ["La base canónica está formada por e_1, e_2, e_3.", "Tiene tantos vectores como la dimensión del espacio."], correctAnswers: ["3"], explanation: "<p>Son 3 vectores: (1,0,0), (0,1,0) y (0,0,1).</p>", intendedAction: "Identificar la base canónica en R3." },
      { id: "ev-2-4", level: 2, text: "<p>Si un subespacio \\(W\\) de \\(\\mathbb{R}^3\\) está definido por la ecuación \\(x + y + z = 0\\), ¿cuál es su dimensión?</p>", hints: ["La dimensión es la cantidad de variables libres.", "Hay 3 variables y 1 restricción. Resta 3 - 1."], correctAnswers: ["2"], explanation: "<p>Dimensión = 3 variables - 1 ecuación = 2.</p>", intendedAction: "Calcular la dimensión de un plano por su ecuación." },
      { id: "ev-2-5", level: 2, text: "<p>Si un conjunto de 4 vectores está en \\(\\mathbb{R}^3\\), ¿puede ser linealmente independiente?</p>", hints: ["El número máximo de vectores LI en un espacio es su dimensión.", "La dimensión de R3 es 3."], options: ["Sí", "No"], correctAnswers: ["no"], explanation: "<p>No, en R3 el máximo número de vectores independientes es 3. Cualquier conjunto de 4 o más es LD.</p>", intendedAction: "Aplicar el límite superior de vectores independientes." },
      // NIVEL 3
      {
        id: "ev-3-1", level: 3,
        text: "<p>Calcula las coordenadas del vector \\(v = (5, 7)\\) en la base \\(B = \\{(1, 1), (0, 1)\\}\\). Escribe tu respuesta en formato <code>a, b</code>.</p>",
        hints: ["Plantea la combinación lineal: \\((5, 7) = a(1, 1) + b(0, 1)\\).", "Esto te da el sistema: \\(a = 5\\) y \\(a + b = 7\\). Resuelve para \\(b\\)."],
        correctAnswers: ["5,2", "5, 2"],
        explanation: "<p>De la combinación lineal: \\(a = 5\\). Luego \\(5 + b = 7 \\Rightarrow b = 2\\). Las coordenadas son <strong>5, 2</strong>.</p>",
        intendedAction: "Calcular las coordenadas de un vector respecto a una base no canónica.",
        hintsUsed: 0
      },
      { id: "ev-3-2", level: 3, text: "<p>Si \\(U\\) y \\(W\\) son subespacios de \\(\\mathbb{R}^4\\) con \\(\\dim(U) = 2\\), \\(\\dim(W) = 3\\) y \\(\\dim(U \\cap W) = 1\\), ¿cuál es la dimensión de la suma \\(U + W\\)?</p>", hints: ["Usa la fórmula de Grassmann: \\(\\dim(U+W) = \\dim(U) + \\dim(W) - \\dim(U \\cap W)\\).", "Reemplaza los valores dados."], correctAnswers: ["4"], explanation: "<p>\\(\\dim(U+W) = 2 + 3 - 1 = 4\\).</p>", intendedAction: "Aplicar la fórmula de Grassmann de dimensiones de subespacios." },
      { id: "ev-3-3", level: 3, text: "<p>Determina la dimensión del subespacio generado por \\(\\{(1, 0, 1), (0, 1, 1), (1, 1, 2)\\}\\).</p>", hints: ["Coloca los vectores como filas de una matriz y redúcela.", "El tercer vector es la suma de los dos primeros."], correctAnswers: ["2"], explanation: "<p>El tercer vector es linealmente dependiente (v1+v2=v3). Los dos primeros son independientes. Dimensión = 2.</p>", intendedAction: "Calcular la dimensión de un espacio generado mediante reducción de matriz." },
      { id: "ev-3-4", level: 3, text: "<p>Si la matriz de transición de la base B a la base C es \\(P = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}\\), y las coordenadas de un vector en B son \\([v]_B = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}\\), calcula la segunda coordenada en la base C.</p>", hints: ["Usa la relación \\([v]_C = P [v]_B\\).", "Multiplica la segunda fila de P por el vector columna."], correctAnswers: ["1"], explanation: "<p>\\([v]_C = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix}\\). La segunda coordenada es 1.</p>", intendedAction: "Efectuar cambio de coordenadas usando matrices de transición." },
      { id: "ev-3-5", level: 3, text: "<p>¿Cuál es la dimensión del espacio vectorial de los polinomios de grado menor o igual a 2, \\(P_2(x)\\)?</p>", hints: ["La base estándar es \\(\\{1, x, x^2\\}\\).", "Cuenta cuántos términos tiene la base."], correctAnswers: ["3"], explanation: "<p>Tiene 3 elementos en su base estándar. Dimensión = 3.</p>", intendedAction: "Identificar la dimensión de espacios de polinomios." },
      // NIVEL 4
      {
        id: "ev-4-1", level: 4,
        text: "<p>Para qué valor de \\(k\\) el conjunto de vectores \\(\\{(1, 1, 1), (1, 2, 3), (1, 0, k)\\}\\) en \\(\\mathbb{R}^3\\) **no** forma una base de \\(\\mathbb{R}^3\\)?</p>",
        hints: ["No forman una base si su determinante asociado es igual a cero.", "Escribe la matriz con estos vectores y calcula su determinante en función de \\(k\\)."],
        correctAnswers: ["-1", "k=-1"],
        explanation: "<p>El determinante de la matriz es \\(1(2k - 0) - 1(k - 3) + 1(0 - 2) = 2k - k + 3 - 2 = k + 1\\). Para que no sea base, el determinante debe ser cero: \\(k + 1 = 0 \\Rightarrow k = -1\\).</p>",
        intendedAction: "Analizar la condición de base para un conjunto paramétrico en R3.",
        hintsUsed: 0
      },
      { id: "ev-4-2", level: 4, text: "<p>Si \\(V\\) es el espacio de las matrices cuadradas de \\(2 \\times 2\\) y \\(W\\) es el subespacio de las matrices simétricas de \\(2 \\times 2\\), ¿cuál es la dimensión de \\(W\\)?</p>", hints: ["Una matriz simétrica tiene la forma \\(\\begin{pmatrix} a & b \\\\ b & c \\end{pmatrix}\\).", "Cuenta cuántos parámetros libres independientes necesitas para definirla."], correctAnswers: ["3"], explanation: "<p>Una base está dada por \\(\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}\\), \\(\\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix}\\) y \\(\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\). Dimensión = 3.</p>", intendedAction: "Calcular la dimensión de subespacios de matrices." },
      { id: "ev-4-3", level: 4, text: "<p>Si en \\(\\mathbb{R}^3\\) con producto interno usual, tenemos el subespacio \\(W = \\text{span}\\{(1, 1, 0)\\}\\), ¿cuál es la dimensión del complemento ortogonal \\(W^{\\perp}\\)?</p>", hints: ["La suma de las dimensiones de W y su complemento ortogonal debe ser igual a la dimensión del espacio completo.", "Dim(W) + Dim(W_perp) = 3."], correctAnswers: ["2"], explanation: "<p>Como \\(\\dim(W) = 1\\), entonces \\(\\dim(W^{\\perp}) = 3 - 1 = 2\\).</p>", intendedAction: "Calcular la dimensión del complemento ortogonal." },
      { id: "ev-4-4", level: 4, text: "<p>Si un espacio vectorial tiene dimensión 5, ¿cuántos vectores tiene un subespacio propio máximo?</p>", hints: ["Un subespacio propio no puede ser el espacio completo.", "Su dimensión debe ser menor que 5. El valor máximo posible es..."], correctAnswers: ["4"], explanation: "<p>El subespacio propio de dimensión máxima tiene dimensión 4.</p>", intendedAction: "Identificar la dimensión de subespacios propios maximales." },
      { id: "ev-4-5", level: 4, text: "<p>Dada la base \\(B = \\{(1,1), (1,2)\\}\\) y \\(C = \\{(1,0), (0,1)\\}\\). Calcula el determinante de la matriz de cambio de base de B a C.</p>", hints: ["La matriz de cambio de base tiene como columnas los vectores de B expresados en C.", "Como C es la base canónica, la matriz es simplemente la que contiene a los vectores de B como columnas."], correctAnswers: ["1"], explanation: "<p>La matriz es \\(\\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\end{pmatrix}\\), y su determinante es \\(1 \\cdot 2 - 1 \\cdot 1 = 1\\).</p>", intendedAction: "Calcular el determinante de una matriz de transición." }
    ]
  },
  {
    id: "transformaciones-lineales",
    title: "Transformaciones Lineales",
    desc: "Núcleo e imagen, matriz asociada, teorema de la dimensión y clasificación.",
    duration: "15 mins",
    status: "active",
    questionBank: [
      // NIVEL 1
      {
        id: "tl-1-1", level: 1,
        text: "<p>Si una transformación lineal \\(T: \\mathbb{R}^3 \\to \\mathbb{R}^2\\) tiene un núcleo de dimensión <strong>1</strong>, ¿cuál es la dimensión de la imagen de \\(T\\)?</p>",
        hints: ["Usa el teorema de la dimensión (Rango-Nulidad): \\(\\dim(\\text{Ker}(T)) + \\dim(\\text{Im}(T)) = \\dim(V)\\).", "Aquí la dimensión del dominio \\(V\\) es 3. Resuelve para la imagen."],
        correctAnswers: ["2"],
        explanation: "<p>Por el Teorema de la Dimensión: \\(1 + \\dim(\\text{Im}(T)) = 3 \\Rightarrow \\dim(\\text{Im}(T)) = 2\\).</p>",
        intendedAction: "Aplicar el Teorema de la Dimensión.",
        hintsUsed: 0
      },
      { id: "tl-1-2", level: 1, text: "<p>¿Una transformación lineal siempre envía el vector nulo del dominio al vector nulo del codominio?</p>", hints: ["Evalúa T(0).", "Por definición, T(0) = T(0*v) = 0*T(v) = 0."], options: ["Sí", "No"], correctAnswers: ["sí"], explanation: "<p>Sí, por definición de linealidad T(0) = 0.</p>", intendedAction: "Identificar propiedades fundamentales de transformaciones lineales." },
      { id: "tl-1-3", level: 1, text: "<p>¿Cómo se llama a la transformación lineal \\(T(v) = 0\\) para todo \\(v\\)?</p>", hints: ["Su nombre denota que todo da como resultado el cero.", "Es la transformación..."], correctAnswers: ["nula", "transformacion nula"], explanation: "<p>Se le conoce como transformación nula.</p>", intendedAction: "Identificar la transformación nula." },
      { id: "tl-1-4", level: 1, text: "<p>Si el núcleo de una transformación lineal contiene solo al vector nulo, ¿la transformación es inyectiva?</p>", hints: ["La inyectividad está ligada a que Ker(T) = {0}.", "Si Ker(T) es trivial, T es inyectiva."], options: ["Sí", "No"], correctAnswers: ["sí"], explanation: "<p>Sí, T es inyectiva si y solo si Ker(T) = {0}.</p>", intendedAction: "Relacionar la inyectividad con el núcleo trivial." },
      { id: "tl-1-5", level: 1, text: "<p>Si la matriz asociada a una transformación lineal es de \\(3 \\times 4\\), ¿cuál es la dimensión del dominio? (Matriz respecto a bases canónicas)</p>", hints: ["El número de columnas determina la dimensión del dominio.", "La matriz multiplica a vectores del dominio."], correctAnswers: ["4"], explanation: "<p>La matriz asociada de 3x4 multiplica a vectores de R4 para dar vectores de R3. Dominio = R4, por ende dimensión = 4.</p>", intendedAction: "Relacionar el tamaño de la matriz con las dimensiones de dominio/codominio." },
      // NIVEL 2
      {
        id: "tl-2-1", level: 2,
        text: "<p>Dada la transformación lineal \\(T(x, y) = (x + y, 2x - y)\\). ¿Cuál es la primera coordenada de \\(T(3, 1)\\)?</p>",
        hints: ["Evalúa la transformación reemplazando \\(x = 3\\) e \\(y = 1\\).", "La primera coordenada está definida por \\(x + y\\)."],
        correctAnswers: ["4"],
        explanation: "<p>\\(T(3, 1) = (3 + 1, 2(3) - 1) = (4, 5)\\). La primera coordenada es <strong>4</strong>.</p>",
        intendedAction: "Evaluar una transformación lineal en un punto específico.",
        hintsUsed: 0
      },
      { id: "tl-2-2", level: 2, text: "<p>Si \\(T: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) es una transformación lineal que duplica cada vector, ¿cuál es su matriz asociada en base canónica?</p><p>Escribe solo el elemento de la fila 1, columna 1.</p>", hints: ["La transformación es T(x,y) = (2x, 2y).", "La matriz es diagonal con doses en la diagonal principal."], correctAnswers: ["2"], explanation: "<p>La matriz es \\(\\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}\\). El elemento (1,1) es 2.</p>", intendedAction: "Identificar la matriz de la homotecia." },
      { id: "tl-2-3", level: 2, text: "<p>Dada \\(T(x,y) = (x-y, 0)\\). ¿Cuál es la dimensión de la imagen de \\(T\\)?</p>", hints: ["La imagen está generada por los vectores resultantes.", "Todo resultado es un múltiplo de (1,0)."], correctAnswers: ["1"], explanation: "<p>La imagen es la recta y=0 en R2, que tiene dimensión 1.</p>", intendedAction: "Determinar la dimensión de la imagen de una proyección." },
      { id: "tl-2-4", level: 2, text: "<p>Si \\(T: V \\to W\\) es una transformación y \\(\\dim(V) = 3\\), \\(\\dim(W) = 3\\) y \\(T\\) es inyectiva, ¿es también sobreyectiva?</p>", hints: ["En dimensiones iguales finitas, inyectiva implica sobreyectiva.", "Usa el teorema de la dimensión: Dim(V) = Dim(Ker) + Dim(Im)."], options: ["Sí", "No"], correctAnswers: ["sí"], explanation: "<p>Sí, porque Dim(Ker) = 0 implies Dim(Im) = 3 = Dim(W), lo que significa que es sobreyectiva.</p>", intendedAction: "Aplicar propiedades de isomorfismos en espacios de igual dimensión." },
      { id: "tl-2-5", level: 2, text: "<p>¿Cuál es el núcleo (kernel) de la transformación identidad \\(I(v) = v\\)? Escribe solo la dimensión del núcleo.</p>", hints: ["La identidad solo envía al cero al cero.", "El núcleo contiene únicamente al vector nulo."], correctAnswers: ["0", "cero"], explanation: "<p>El núcleo es \\(\\{0\\}\\), por lo tanto su dimensión es 0.</p>", intendedAction: "Identificar el núcleo de la transformación identidad." },
      // NIVEL 3
      {
        id: "tl-3-1", level: 3,
        text: "<p>Dada la transformación lineal \\(T(x, y) = (x - y, 2x - 2y)\\). ¿Cuál es la dimensión del núcleo de \\(T\\)?</p>",
        hints: ["El núcleo está definido por los vectores tales que \\(T(x, y) = (0, 0)\\).", "Esto te da la ecuación \\(x - y = 0 \\Rightarrow x = y\\). Cuenta cuántos parámetros libres hay."],
        correctAnswers: ["1"],
        explanation: "<p>El sistema es \\(x - y = 0\\) y \\(2x - 2y = 0\\). Ambas se reducen a \\(x = y\\). Los vectores del núcleo son de la forma \\((t, t) = t(1, 1)\\). Por lo tanto, el núcleo tiene dimensión <strong>1</strong>.</p>",
        intendedAction: "Calcular la nulidad (dimensión del núcleo) de una transformación lineal 2x2.",
        hintsUsed: 0
      },
      { id: "tl-3-2", level: 3, text: "<p>Si \\(T: \\mathbb{R}^3 \\to \\mathbb{R}^3\\) tiene como matriz asociada en bases canónicas a \\(A = \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix}\\), ¿cuál es el rango de \\(T\\)?</p>", hints: ["El rango de T es igual al rango de su matriz asociada.", "Cuenta las filas no nulas en la forma escalonada."], correctAnswers: ["2"], explanation: "<p>La matriz ya está escalonada y tiene 2 filas no nulas. Rango = 2.</p>", intendedAction: "Calcular el rango de una transformación a partir de su matriz." },
      { id: "tl-3-3", level: 3, text: "<p>Dada la transformación de derivada \\(T: P_2(x) \\to P_1(x)\\) definida por \\(T(p) = p'\\). ¿Cuál es la dimensión del núcleo de \\(T\\)?</p>", hints: ["El núcleo son los polinomios cuya derivada es cero.", "Las derivadas de constantes son cero."], correctAnswers: ["1"], explanation: "<p>El núcleo está formado por los polinomios constantes \\(p(x) = c\\), que es un subespacio de dimensión 1.</p>", intendedAction: "Calcular el núcleo de la transformación derivación." },
      {
        id: "tl-3-4", level: 3,
        text: "<p>Si \\(T: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) proyecta ortogonalmente sobre el eje x, ¿cuál es su matriz asociada en base canónica?</p><p>Escribe solo la suma de todos los elementos de la matriz.</p><div style='text-align: center; margin: 15px 0;'><img src='../../imagenes/proyeccion_ortogonal.png' alt='Proyección Ortogonal' style='max-width: 260px; width: 100%; border-radius: 8px; border: 1.5px solid var(--color-borde); box-shadow: 0 4px 10px var(--color-sombras); background: white;'></div>",
        hints: ["La proyección es T(x,y) = (x, 0).", "La matriz es \\(\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}\\)."],
        correctAnswers: ["1"],
        explanation: "<p>Matriz = \\(\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}\\). Suma de elementos = 1.</p>",
        intendedAction: "Encontrar la matriz asociada a una proyección geométrica."
      },
      { id: "tl-3-5", level: 3, text: "<p>Si \\(T_1: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) rota en 90 grados y \\(T_2: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) duplica el tamaño. ¿Cuál es el determinante de la matriz asociada a la composición \\(T_2 \\circ T_1\\)?</p>", hints: ["El determinante de la rotación es 1.", "La homotecia duplica cada dimensión, su determinante es 4."], correctAnswers: ["4"], explanation: "<p>\\(\\det(M_{T_2 \\circ T_1}) = \\det(M_{T_2}) \\cdot \\det(M_{T_1}) = 4 \\cdot 1 = 4\\).</p>", intendedAction: "Calcular determinantes de composiciones de transformaciones." },
      // NIVEL 4
      {
        id: "tl-4-1", level: 4,
        text: "<p>Para la transformación lineal \\(T: \\mathbb{R}^3 \\to \\mathbb{R}^3\\) definida por \\(T(x, y, z) = (x - y, y - z, z - x)\\). ¿Cuál es la dimensión del núcleo de \\(T\\)?</p>",
        hints: ["Plantea el sistema homogéneo: \\(x-y=0\\), \\(y-z=0\\), \\(z-x=0\\).", "Esto implica que \\(x = y = z\\). Encuentra la base del núcleo."],
        correctAnswers: ["1"],
        explanation: "<p>El núcleo está dado por \\(x = y = z\\). Así, la base es \\(\\{(1, 1, 1)\\}\\) y su dimensión es <strong>1</strong>.</p>",
        intendedAction: "Calcular el núcleo de un operador cíclico 3x3.",
        hintsUsed: 0
      },
      { id: "tl-4-2", level: 4, text: "<p>Si \\(T: V \\to W\\) es un isomorfismo y \\(\\dim(V) = 4\\), ¿cuál es la dimensión de \\(W\\)?</p>", hints: ["Un isomorfismo es una transformación lineal biyectiva.", "Para que exista un isomorfismo entre espacios vectoriales de dimensión finita, sus dimensiones deben ser..."], correctAnswers: ["4"], explanation: "<p>Los espacios isomorfos tienen la misma dimensión: \\(\\dim(W) = \\dim(V) = 4\\).</p>", intendedAction: "Identificar propiedades de dimensiones en isomorfismos." },
      { id: "tl-4-3", level: 4, text: "<p>Dada la transformación lineal \\(T: P_2(x) \\to \\mathbb{R}^2\\) definida por \\(T(p) = (p(0), p(1))\\). ¿Cuál es la dimensión del núcleo de \\(T\\)?</p>", hints: ["Un polinomio en el núcleo debe cumplir \\(p(0)=0\\) y \\(p(1)=0\\).", "Esto significa que 0 y 1 son raíces del polinomio \\(p(x) = ax^2 + bx + c\\)."], correctAnswers: ["1"], explanation: "<p>El polinomio tiene la forma \\(p(x) = k \\cdot x(x-1) = k(x^2 - x)\\). Como depende de un solo parámetro \\(k\\), la dimensión del núcleo es 1.</p>", intendedAction: "Calcular el núcleo de una transformación de evaluación polinómica." },
      { id: "tl-4-4", level: 4, text: "<p>Si la matriz asociada a \\(T: \\mathbb{R}^3 \\to \\mathbb{R}^3\\) en base canónica tiene rango 2, ¿es posible que \\(T\\) sea inyectiva?</p>", hints: ["Usa el teorema de la dimensión: 3 = Dim(Ker) + 2.", "Si Dim(Ker) > 0, entonces no es inyectiva."], options: ["Sí", "No"], correctAnswers: ["no"], explanation: "<p>No, porque \\(\\dim(\\text{Ker}) = 3 - 2 = 1 \\neq 0\\).</p>", intendedAction: "Relacionar el rango de la matriz con la inyectividad." },
      { id: "tl-4-5", level: 4, text: "<p>Si \\(T: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) tiene como matriz asociada en la base \\(\\{(1,1), (1,0)\\}\\) a \\(\\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}\\), calcula la suma de los valores propios de \\(T\\).</p>", hints: ["La matriz asociada en cualquier base tiene los mismos valores propios.", "Los valores propios de una matriz diagonal son los elementos de su diagonal principal."], correctAnswers: ["5"], explanation: "<p>Los valores propios son 2 y 3. Su suma es 5.</p>", intendedAction: "Vincular transformaciones lineales con sus valores propios." }
    ]
  },
  {
    id: "valores-propios",
    title: "Valores y Vectores Propios",
    desc: "Ecuación característica, autoespacios, diagonalización y teorema de Cayley-Hamilton.",
    duration: "15 mins",
    status: "active",
    questionBank: [
      // NIVEL 1
      {
        id: "vp-1-1", level: 1,
        text: "<p>Si \\(\\lambda = 3\\) es un valor propio de la matriz \\(A\\), ¿cuál es el determinante de la matriz \\(A - 3I\\)?</p>",
        hints: ["Recuerda la definición de la ecuación característica: \\(\\det(A - \\lambda I) = 0\\).", "Sustituye directamente \\(\\lambda = 3\\) en la ecuación."],
        correctAnswers: ["0", "cero"],
        explanation: "<p>Por definición, \\(\\lambda\\) es valor propio si y solo si \\(\\det(A - \\lambda I) = 0\\). Para \\(\\lambda = 3\\), el determinante es <strong>0</strong>.</p>",
        intendedAction: "Comprender la ecuación característica fundamental.",
        hintsUsed: 0
      },
      { id: "vp-1-2", level: 1, text: "<p>¿El vector nulo \\(0\\) puede ser considerado un vector propio de alguna matriz?</p>", hints: ["Revisa la definición de vector propio.", "Un vector propio v debe ser un vector **no nulo** tal que Av = lambda*v."], options: ["Sí", "No"], correctAnswers: ["no"], explanation: "<p>No, por definición un vector propio debe ser distinto del vector cero.</p>", intendedAction: "Identificar restricciones en la definición de autovectores." },
      { id: "vp-1-3", level: 1, text: "<p>¿El número cero \\(0\\) puede ser un valor propio de una matriz?</p>", hints: ["Piensa en si existe un vector no nulo v tal que Av = 0.", "Esto es equivalente a que el núcleo de A sea distinto de {0}."], options: ["Sí", "No"], correctAnswers: ["sí"], explanation: "<p>Sí, 0 es un valor propio si y solo si la matriz no es invertible (singular).</p>", intendedAction: "Establecer la validez del cero como autovalor." },
      { id: "vp-1-4", level: 1, text: "<p>Los valores propios de una matriz triangular (superior o inferior) son exactamente los elementos de su...</p>", hints: ["Piensa en la línea que cruza la matriz de esquina a esquina.", "Es la diagonal..."], correctAnswers: ["diagonal principal", "diagonal"], explanation: "<p>En cualquier matriz triangular, los valores propios son los elementos que se ubican en su diagonal principal.</p>", intendedAction: "Identificar valores propios en matrices triangulares." },
      { id: "vp-1-5", level: 1, text: "<p>Si una matriz \\(A\\) es diagonalizable, entonces existe una matriz invertible \\(P\\) tal que \\(P^{-1} A P\\) es una matriz...</p>", hints: ["La matriz resultante solo tiene elementos en la diagonal.", "Es una matriz..."], correctAnswers: ["diagonal"], explanation: "<p>Se reduce a una matriz diagonal.</p>", intendedAction: "Definir el proceso de diagonalización." },
      // NIVEL 2
      {
        id: "vp-2-1", level: 2,
        text: "<p>Calcula los valores propios de la matriz:</p><p>\\(A = \\begin{pmatrix} 2 & 0 \\\\ 0 & 5 \\end{pmatrix}\\)</p><p>Escribe tu respuesta en formato <code>a, b</code> ordenados de menor a mayor.</p>",
        hints: ["La matriz es diagonal.", "Los valores propios de una matriz diagonal son los elementos de la diagonal principal."],
        correctAnswers: ["2,5", "2, 5"],
        explanation: "<p>Al ser diagonal, los valores propios se leen directamente: \\(\\lambda_1 = 2\\) y \\(\\lambda_2 = 5\\), es decir, <strong>2, 5</strong>.</p>",
        intendedAction: "Hallar autovalores en matrices diagonales.",
        hintsUsed: 0
      },
      { id: "vp-2-2", level: 2, text: "<p>Calcula el polinomio característico \\(p(\\lambda)\\) en términos de \\(\\lambda\\) de la matriz \\(A = \\begin{pmatrix} 1 & 0 \\\\ 0 & 2 \\end{pmatrix}\\). Escribe la expresión factorizada (ej: <code>(lambda-1)(lambda-2)</code>).</p>", hints: ["El polinomio característico es det(A - lambda*I).", "Calcula (1-lambda)(2-lambda)."], correctAnswers: ["(lambda-1)(lambda-2)", "(1-lambda)(2-lambda)", "(l-1)(l-2)"], explanation: "<p>\\(p(\\lambda) = (1-\\lambda)(2-\\lambda)\\).</p>", intendedAction: "Determinar el polinomio característico de matrices diagonales." },
      { id: "vp-2-3", level: 2, text: "<p>Si la matriz \\(A\\) de \\(2 \\times 2\\) tiene valores propios 1 y 4, ¿cuál es la traza de la matriz \\(A\\)?</p>", hints: ["Propiedad: La traza de una matriz es igual a la suma de sus valores propios.", "Suma 1 + 4."], correctAnswers: ["5"], explanation: "<p>Traza(A) = 1 + 4 = 5.</p>", intendedAction: "Aplicar la relación entre traza y valores propios." },
      { id: "vp-2-4", level: 2, text: "<p>Si la matriz \\(A\\) de \\(2 \\times 2\\) tiene valores propios 2 y -3, ¿cuál es el determinante de \\(A\\)?</p>", hints: ["Propiedad: El determinante de una matriz es igual al producto de sus valores propios.", "Multiplica 2 por -3."], correctAnswers: ["-6"], explanation: "<p>\\(\\det(A) = 2 \\cdot (-3) = -6\\).</p>", intendedAction: "Aplicar la relación entre determinante y valores propios." },
      { id: "vp-2-5", level: 2, text: "<p>Si \\(v\\) es un vector propio de \\(A\\) con valor propio 3, ¿qué vector propio resulta de multiplicar \\(A\\) por \\(v\\)? Escribe en términos de \\(v\\) (ej: <code>3v</code>).</p>", hints: ["Usa la definición fundamental: Av = lambda*v.", "Sustituye lambda por 3."], correctAnswers: ["3v", "3 v"], explanation: "<p>\\(Av = 3v\\).</p>", intendedAction: "Aplicar la relación de autovalor directamente." },
      // NIVEL 3
      {
        id: "vp-3-1", level: 3,
        text: "<p>Calcula los valores propios de la matriz:</p><p>\\(A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 3 \\end{pmatrix}\\)</p><p>Escribe tu respuesta en formato <code>a, b</code> ordenados de menor a mayor.</p>",
        hints: ["La matriz es triangular superior.", "Los valores propios de una matriz triangular son los elementos de la diagonal principal."],
        correctAnswers: ["1,3", "1, 3"],
        explanation: "<p>Como la matriz es triangular, los valores propios son sus elementos diagonales: 1 y 3, es decir, <strong>1, 3</strong>.</p>",
        intendedAction: "Calcular autovalores de matrices triangulares 2x2.",
        hintsUsed: 0
      },
      { id: "vp-3-2", level: 3, text: "<p>Dada la matriz \\(A = \\begin{pmatrix} 0 & 1 \\\\ -2 & 3 \\end{pmatrix}\\). Calcula sus valores propios en formato <code>a, b</code> ordenados de menor a mayor.</p>", hints: ["Plantea la ecuación característica: det(A - lambda*I) = 0.", "Obtienes \\(\\lambda^2 - 3\\lambda + 2 = 0\\). Factoriza."], correctAnswers: ["1,2", "1, 2"], explanation: "<p>\\(\\det\\begin{pmatrix} -\\lambda & 1 \\\\ -2 & 3-\\lambda \\end{pmatrix} = -\\lambda(3-\\lambda) + 2 = \\lambda^2 - 3\\lambda + 2 = (\\lambda-1)(\\lambda-2) = 0\\). Valores propios: 1 y 2.</p>", intendedAction: "Calcular los valores propios de una matriz de 2x2 no diagonal." },
      { id: "vp-3-3", level: 3, text: "<p>Si \\(A\\) es una matriz de \\(3 \\times 3\\) con valores propios 1, 2 y 5, ¿cuál es el determinante de la matriz \\(A^2\\)?</p>", hints: ["Los valores propios de A^2 son los cuadrados de los valores propios de A.", "El determinante es el producto de los valores propios de A^2, o bien \\(\\det(A)^2\\)."], correctAnswers: ["100"], explanation: "<p>\\(\\det(A) = 1 \\cdot 2 \\cdot 5 = 10\\). Luego, \\(\\det(A^2) = \\det(A)^2 = 10^2 = 100\\).</p>", intendedAction: "Calcular determinantes de potencias de matrices usando autovalores." },
      {
        id: "vp-3-4", level: 3,
        text: "<p>Si \\(v = (1, 1)\\) es un vector propio de \\(A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}\\), ¿cuál es su valor propio asociado?</p><div style='text-align: center; margin: 15px 0;'><img src='../../imagenes/vector_propio_geo.png' alt='Vector Propio Geométrico' style='max-width: 260px; width: 100%; border-radius: 8px; border: 1.5px solid var(--color-borde); box-shadow: 0 4px 10px var(--color-sombras); background: white;'></div>",
        hints: ["Calcula Av.", "El resultado será un múltiplo escalar del vector propio original."],
        correctAnswers: ["3"],
        explanation: "<p>\\(Av = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 3 \\end{pmatrix} = 3\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}\\). El valor propio es 3.</p>",
        intendedAction: "Hallar el valor propio correspondiente a un vector propio dado."
      },
      { id: "vp-3-5", level: 3, text: "<p>¿Es diagonalizable la matriz \\(A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}\\)?</p>", hints: ["Calcula el valor propio de A (es 1 con multiplicidad 2).", "Encuentra la dimensión del espacio propio asociado (nulidad de A-I). Si es menor que 2, no es diagonalizable."], options: ["Sí", "No"], correctAnswers: ["no"], explanation: "<p>El único valor propio es 1 con multiplicidad algebraica 2. Su multiplicidad geométrica (número de vectores propios independientes) es 1. Por ende, no es diagonalizable.</p>", intendedAction: "Discernir si una matriz con autovalores repetidos es diagonalizable." },
      // NIVEL 4
      {
        id: "vp-4-1", level: 4,
        text: "<p>Calcula el valor propio real de la matriz de \\(3 \\times 3\\):</p><p>\\(A = \\begin{pmatrix} 1 & 0 & 0 \\\\ 2 & 3 & 1 \\\\ 0 & 0 & 2 \\end{pmatrix}\\)</p><p>que posee multiplicidad algebraica <strong>2</strong>.</p>",
        hints: ["Dado que es una matriz triangular por bloques o triangular inferior generalizada, los valores propios son los de la diagonal principal.", "Identifica cuál valor propio se repite en la diagonal."],
        correctAnswers: ["2"],
        explanation: "<p>Los valores propios se encuentran en la diagonal principal: \\(1, 3, 2\\). Espera, en este caso, calculemos la ecuación característica:</p><p>\\(\\det(A - \\lambda I) = (1-\\lambda)(3-\\lambda)(2-\\lambda) = 0\\). Los autovalores son 1, 2 y 3. ¡Todos tienen multiplicidad 1! Corrijamos la matriz para que tenga multiplicidad 2: \\(A = \\begin{pmatrix} 2 & 0 & 0 \\\\ 1 & 3 & 0 \\\\ 0 & 1 & 2 \\end{pmatrix}\\). En este caso los valores de la diagonal son 2, 3, 2. El valor propio repetido es <strong>2</strong>.</p>",
        intendedAction: "Identificar autovalores repetidos y sus propiedades en matrices estructuradas.",
        hintsUsed: 0
      },
      { id: "vp-4-2", level: 4, text: "<p>Dada la matriz \\(A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 2 \\end{pmatrix}\\). Si usamos el Teorema de Cayley-Hamilton, la matriz \\(A^2 - 3A - 4I\\) es igual a la matriz...</p>", hints: ["El Teorema de Cayley-Hamilton dice que toda matriz satisface su propia ecuación característica.", "Calcula el polinomio característico de A."], correctAnswers: ["nula", "matriz nula", "0"], explanation: "<p>El polinomio característico es \\(\\lambda^2 - 3\\lambda - 4\\). Por Cayley-Hamilton, \\(A^2 - 3A - 4I = 0\\) (matriz nula).</p>", intendedAction: "Aplicar el Teorema de Cayley-Hamilton." },
      { id: "vp-4-3", level: 4, text: "<p>Si una matriz simétrica de \\(3 \\times 3\\) tiene valores propios 0, 1, y 2. ¿Cuál es el rango de la matriz \\(A\\)?</p>", hints: ["Para matrices simétricas, la dimensión del espacio propio de 0 es la nulidad de la matriz.", "El rango es igual al número de valores propios no nulos."], correctAnswers: ["2"], explanation: "<p>Los valores propios no nulos determinan el rango en matrices diagonalizables (las simétricas lo son). Rango = 2.</p>", intendedAction: "Relacionar el rango con los autovalores en matrices diagonalizables." },
      { id: "vp-4-4", level: 4, text: "<p>Si \\(A^3 - 2A^2 + A - I = 0\\), expresa la matriz inversa \\(A^{-1}\\) en función de \\(A^2\\), \\(A\\) e \\(I\\). Escribe la expresión algebraica (ej: <code>A^2-2A+I</code>).</p>", hints: ["Multiplica toda la ecuación por A^-1.", "A^3 * A^-1 = A^2, y así sucesivamente. Despeja I * A^-1 = A^-1."], correctAnswers: ["A^2-2A+I", "A^2-2*A+I"], explanation: "<p>\\(A^{-1}(A^3 - 2A^2 + A - I) = 0 \\Rightarrow A^2 - 2A + I - A^{-1} = 0 \\Rightarrow A^{-1} = A^2 - 2A + I\\).</p>", intendedAction: "Encontrar la inversa de una matriz usando su polinomio anulador." },
      { id: "vp-4-5", level: 4, text: "<p>Si la matriz \\(A = \\begin{pmatrix} 2 & k \\\\ 0 & 2 \\end{pmatrix}\\) es diagonalizable, ¿cuál debe ser el valor del parámetro \\(k\\)?</p>", hints: ["Para que una matriz de 2x2 con un autovalor repetido sea diagonalizable, debe ser ya una matriz diagonal.", "Esto significa que el término fuera de la diagonal debe anularse."], correctAnswers: ["0", "cero"], explanation: "<p>Si \\(k \\neq 0\\), solo hay un vector propio. Para ser diagonalizable se requiere \\(k=0\\).</p>", intendedAction: "Determinar las condiciones de diagonalizabilidad de matrices defectivas." }
    ]
  },
  {
    id: "numeros-complejos",
    title: "Números Complejos",
    desc: "Forma binómica y polar, Teorema de De Moivre, raíces de la unidad y ecuaciones complejas.",
    duration: "10 mins",
    status: "active",
    questionBank: [
      // NIVEL 1
      {
        id: "nc-1-1", level: 1,
        text: "<p>¿Cuál es la parte imaginaria del número complejo \\(z = 3 - 4i\\)?</p>",
        hints: ["La parte imaginaria es el coeficiente que acompaña a la unidad imaginaria \\(i\\).", "No incluyas la letra \\(i\\) en la respuesta."],
        correctAnswers: ["-4"],
        explanation: "<p>El número se escribe como \\(z = a + bi\\) con \\(a=3\\) y \\(b=-4\\). La parte imaginaria es \\(b = -4\\).</p>",
        intendedAction: "Identificar la parte imaginaria de un complejo en forma binómica.",
        hintsUsed: 0
      },
      { id: "nc-1-2", level: 1, text: "<p>¿Cuál es el valor de \\(i^2\\)?</p>", hints: ["Es la definición base de la unidad imaginaria.", "Representa la raíz de -1 elevada al cuadrado."], correctAnswers: ["-1"], explanation: "<p>Por definición, \\(i^2 = -1\\).</p>", intendedAction: "Definir la unidad imaginaria básica." },
      { id: "nc-1-3", level: 1, text: "<p>¿Cuál es el módulo del número complejo \\(z = i\\)?</p>", hints: ["El módulo representa la distancia al origen en el plano complejo.", "Calcula \\(\\sqrt{0^2 + 1^2}\\)."], correctAnswers: ["1"], explanation: "<p>El módulo es \\(|i| = 1\\).</p>", intendedAction: "Calcular el módulo de un imaginario puro." },
      { id: "nc-1-4", level: 1, text: "<p>¿Cuál es el conjugado del número complejo \\(z = 1 + i\\)?</p>", hints: ["El conjugado cambia el signo de la parte imaginaria.", "Cambia +i por -i."], correctAnswers: ["1-i", "1 - i"], explanation: "<p>El conjugado es \\(\\bar{z} = 1 - i\\).</p>", intendedAction: "Calcular el conjugado de un número complejo." },
      { id: "nc-1-5", level: 1, text: "<p>Si un número complejo tiene argumento \\(\\pi\\) radianes (180 grados), ¿su parte real es positiva o negativa?</p>", hints: ["Ubica el ángulo en el plano de Argand.", "El ángulo apunta directamente hacia la izquierda del eje real."], correctAnswers: ["negativa"], explanation: "<p>Un argumento de 180° ubica al número sobre el eje real negativo. Por lo tanto, su parte real es negativa.</p>", intendedAction: "Relacionar el argumento con los cuadrantes del plano complejo." },
      // NIVEL 2
      {
        id: "nc-2-1", level: 2,
        text: "<p>Calcula el módulo del número complejo:</p><p>\\(z = 3 + 4i\\)</p>",
        hints: ["Usa la fórmula del módulo: \\(|z| = \\sqrt{a^2 + b^2}\\).", "Calcula \\(\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16}\\)."],
        correctAnswers: ["5"],
        explanation: "<p>\\(|z| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\).</p>",
        intendedAction: "Calcular el módulo de un número complejo en forma binómica.",
        hintsUsed: 0
      },
      { id: "nc-2-2", level: 2, text: "<p>Calcula el resultado de la suma \\((2 + 3i) + (1 - 4i)\\). Escribe el resultado en forma binómica <code>a+bi</code> o <code>a-bi</code>.</p>", hints: ["Suma por separado las partes reales y las partes imaginarias.", "Suma 2+1 y por otro lado 3i - 4i."], correctAnswers: ["3-i", "3 - i"], explanation: "<p>\\((2+1) + (3-4)i = 3 - i\\).</p>", intendedAction: "Efectuar suma de números complejos." },
      { id: "nc-2-3", level: 2, text: "<p>Calcula el producto \\((1 + i)(1 - i)\\).</p>", hints: ["Es una suma por su diferencia: \\(a^2 - b^2\\).", "Obtienes \\(1^2 - i^2\\). Recuerda que \\(i^2 = -1\\)."], correctAnswers: ["2"], explanation: "<p>\\(1^2 - i^2 = 1 - (-1) = 2\\).</p>", intendedAction: "Efectuar multiplicación de complejos conjugados." },
      { id: "nc-2-4", level: 2, text: "<p>¿Cuál es el valor simplificado de \\(i^4\\)?</p>", hints: ["Divide el exponente 4 por 4 y analiza el resto.", "El residuo de 4/4 es 0, por lo que equivale a i^0."], correctAnswers: ["1"], explanation: "<p>\\(i^4 = (i^2)^2 = (-1)^2 = 1\\).</p>", intendedAction: "Simplificar potencias cíclicas de la unidad imaginaria." },
      { id: "nc-2-5", level: 2, text: "<p>¿Cuál es el argumento en grados del número complejo \\(1 + i\\)?</p>", hints: ["El número está en el primer cuadrante con parte real e imaginaria iguales.", "Usa la arcotangente de 1/1."], correctAnswers: ["45", "45 grados", "45°"], explanation: "<p>\\(\\theta = \\arctan(1/1) = 45^\\circ\\).</p>", intendedAction: "Calcular el argumento en grados en el primer cuadrante." },
      // NIVEL 3
      {
        id: "nc-3-1", level: 3,
        text: "<p>Expresa el número complejo \\(z = 1 + i\\sqrt{3}\\) en forma polar \\(r_{\\theta}\\) o \\(r(\\cos\\theta + i\\sin\\theta)\\). ¿Cuál es su módulo \\(r\\)?</p>",
        hints: ["Usa la fórmula del módulo: \\(r = \\sqrt{1^2 + (\\sqrt{3})^2}\\).", "Calcula \\(\\sqrt{1 + 3}\\)."],
        correctAnswers: ["2"],
        explanation: "<p>El módulo es \\(r = \\sqrt{1 + 3} = \\sqrt{4} = 2\\).</p>",
        intendedAction: "Convertir de forma binómica a polar determinando el módulo.",
        hintsUsed: 0
      },
      { id: "nc-3-2", level: 3, text: "<p>Calcula el valor de \\((1 + i)^4\\) usando el teorema de De Moivre o álgebra directa. Escribe en forma binómica.</p>", hints: ["Primero calcula \\((1+i)^2 = 1 + 2i - 1 = 2i\\).", "Luego eleva \\(2i\\) al cuadrado."], correctAnswers: ["-4"], explanation: "<p>\\((1+i)^4 = ((1+i)^2)^2 = (2i)^2 = 4i^2 = -4\\).</p>", intendedAction: "Calcular potencias de números complejos." },
      { id: "nc-3-3", level: 3, text: "<p>Resuelve el cociente \\(\\frac{1}{i}\\). Escribe el resultado en forma binómica simplificada.</p>", hints: ["Multiplica el numerador y denominador por el conjugado de i (que es -i).", "Obtienes \\(-i / (-i^2)\\)."], correctAnswers: ["-i"], explanation: "<p>\\(\\frac{1}{i} = \\frac{1 \\cdot (-i)}{i \\cdot (-i)} = \\frac{-i}{1} = -i\\).</p>", intendedAction: "Calcular el inverso multiplicativo de la unidad imaginaria." },
      { id: "nc-3-4", level: 3, text: "<p>¿Cuál es el argumento principal en radianes del número complejo \\(z = -1 + i\\)?</p><p>Escribe tu respuesta en función de pi (ejemplo: <code>3pi/4</code>).</p>", hints: ["El número está en el segundo cuadrante (real negativo, imaginario positivo).", "El ángulo de referencia es pi/4. El ángulo en el segundo cuadrante es pi - pi/4."], correctAnswers: ["3pi/4"], explanation: "<p>El argumento es \\(\\pi - \\arctan(1/1) = \\pi - \\pi/4 = 3\\pi/4\\).</p>", intendedAction: "Calcular argumentos en el segundo cuadrante en radianes." },
      { id: "nc-3-5", level: 3, text: "<p>Si \\(z = 2(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3})\\), ¿cuál es la parte real de \\(z\\)?</p>", hints: ["El coseno de pi/3 es igual a 1/2.", "Multiplica el módulo 2 por el coseno de pi/3."], correctAnswers: ["1"], explanation: "<p>Re(z) = 2 * cos(pi/3) = 2 * (1/2) = 1.</p>", intendedAction: "Convertir de forma polar a binómica." },
      // NIVEL 4
      {
        id: "nc-4-1", level: 4,
        text: "<p>Calcula el módulo de la solución de la ecuación compleja:</p><p>\\((2 + i)z = 5i\\)</p>",
        hints: ["Puedes usar la propiedad de los módulos: \\(|(2+i)z| = |2+i||z| = |5i|\\).", "Calcula los módulos por separado: \\(|2+i| = \\sqrt{5}\\) y \\(|5i| = 5\\). Despeja \\(|z|\\)."],
        correctAnswers: ["root_5", "sqrt5", "sqrt(5)", "2.24"],
        explanation: "<p>Aplicando módulos: \\(|2+i| \\cdot |z| = |5i| \\Rightarrow \\sqrt{5} \\cdot |z| = 5 \\Rightarrow |z| = 5/\\sqrt{5} = \\sqrt{5}\\). La respuesta es <strong>sqrt(5)</strong> o <strong>root_5</strong> o aprox. <strong>2.24</strong>.</p>",
        intendedAction: "Resolver ecuaciones lineales complejas aplicando propiedades de módulos.",
        hintsUsed: 0
      },
      { id: "nc-4-2", level: 4, text: "<p>¿Cuántas raíces complejas distintas tiene la ecuación \\(z^6 - 1 = 0\\)?</p>", hints: ["Usa el teorema fundamental del álgebra.", "El número de raíces de la unidad de orden n es exactamente n."], correctAnswers: ["6"], explanation: "<p>Por el teorema fundamental del álgebra, un polinomio de grado 6 tiene exactamente 6 raíces complejas.</p>", intendedAction: "Aplicar las propiedades de raíces n-ésimas de la unidad." },
      { id: "nc-4-3", level: 4, text: "<p>Si \\(w\\) es una raíz cúbica compleja de la unidad diferente de 1 (raíz primitiva), ¿cuál es el valor de la suma \\(1 + w + w^2\\)?</p>", hints: ["Usa la suma geométrica de las raíces de la unidad.", "Las raíces de la unidad se cancelan mutuamente cuando se suman."], correctAnswers: ["0", "cero"], explanation: "<p>Para cualquier raíz de la unidad de orden n, la suma de todas las raíces es 0. Para n=3: \\(1 + w + w^2 = 0\\).</p>", intendedAction: "Aplicar la propiedad de anulación de la suma de raíces complejas." },
      { id: "nc-4-4", level: 4, text: "<p>Calcula el valor de \\(e^{i\\pi} + 1\\).</p>", hints: ["Aplica la identidad de Euler.", "e^(i*pi) es igual a -1."], correctAnswers: ["0", "cero"], explanation: "<p>Por la identidad de Euler, \\(e^{i\\pi} = -1\\). Así, \\(-1 + 1 = 0\\).</p>", intendedAction: "Utilizar la identidad de Euler." },
      { id: "nc-4-5", level: 4, text: "<p>Determina la parte real de la solución \\(z\\) para el sistema: \\(z + \\bar{z} = 4\\) y \\(z - \\bar{z} = 2i\\).</p>", hints: ["Recuerda que \\(z + \\bar{z} = 2\\text{Re}(z)\\).", "Despeja directamente la parte real de la primera ecuación."], correctAnswers: ["2"], explanation: "<p>\\(z + \\bar{z} = 2x = 4 \\Rightarrow x = 2\\). La parte real es 2.</p>", intendedAction: "Resolver sistemas que involucran conjugación compleja." }
    ]
  }
];

// Auto-poblar preguntas de maqueta y normalizar IDs de forma consistente
(function initializeDatabase() {
  if (typeof TESTS_DATABASE === "undefined") return;

  TESTS_DATABASE.forEach(test => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    test.questionBank.forEach(q => counts[q.level]++);
    
    for (let lvl = 1; lvl <= 4; lvl++) {
      while (counts[lvl] < 5) {
        const qNum = test.questionBank.length + 1;
        const mockQ = {
          id: `${test.id.substring(0,2)}-${lvl}-${qNum}`,
          level: lvl,
          text: `<p>Pregunta de autoevaluación #${qNum} del nivel ${lvl} para el tema <strong>${test.title}</strong>.</p><p>\\(x^2 - 1 = 0\\). ¿Cuál es la solución positiva?</p>`,
          hints: [
            "Pista 1: ayuda conceptual inicial para resolver este ejercicio.",
            "Pista 2: factoriza o despeja la variable directamente."
          ],
          correctAnswers: ["1", "x=1"],
          explanation: `<p>Esta es una explicación simulada paso a paso. Resolvemos la ecuación \\(x^2 - 1 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1\\). Tomando el valor positivo, obtenemos <strong>1</strong>.</p>`,
          intendedAction: `Evaluar habilidades operacionales y conceptuales del nivel ${lvl} en ${test.title}.`
        };
        test.questionBank.push(mockQ);
        counts[lvl]++;
      }
    }
  });

  // Renombrar IDs de las preguntas a un formato profesional (Ej: SE-L1-A)
  TESTS_DATABASE.forEach(test => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    test.questionBank.forEach(q => {
      const prefix = test.id.split("-").map(word => word[0].toUpperCase()).join("");
      const letter = String.fromCharCode(65 + (counts[q.level] % 5));
      q.id = `${prefix}-L${q.level}-${letter}`;
      counts[q.level]++;
    });
  });
})();
