// Variables globales
let draggedElement = null;
let initialColumn = null;
let numColumns = 7;
let numSquares = 7;
let centerColumn = 4;
let valueRange = 6; // Rango de valores por defecto

// Colores para los cuadrados - Paleta de grises azulados
const squareColors = [
    '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1',
    '#e2e8f0', '#f1f5f9', '#f8fafc', '#ffffff'
];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar con valores por defecto: rango 6, centro 4, cantidad de datos 7 (genera columnas 1-7)
    valueRange = 6;
    centerColumn = 4;
    numSquares = 7;
    
    // Establecer los valores por defecto en los selects
    const rangeInput = document.getElementById('value-range');
    const centerSelect = document.getElementById('center-column');
    const numSquaresInput = document.getElementById('num-squares');
    
    if (rangeInput) {
        rangeInput.value = valueRange;
    }
    if (numSquaresInput) {
        numSquaresInput.value = numSquares;
    }
    
    initializeForm(); // Esto actualizará las opciones del centro y establecerá el valor
    if (centerSelect) {
        centerSelect.value = centerColumn;
    }
    
    applyChanges(); // Esto generará las columnas correctamente
    initializeDragAndDrop();
    initializeResetButton();
    initializeComparisonPanel();
    initializeInfoModals(); // Inicializar los modales de información
    // Actualizar el indicador de equilibrio inicial
    updateEquilibriumIndicator();
});

// Inicializar modales de información
function initializeInfoModals() {
    const modal = document.getElementById('info-modal');
    const closeBtn = document.querySelector('.modal-close');
    const infoGeneral = document.getElementById('info-general');
    const infoDistances = document.getElementById('info-distances');
    const infoSquared = document.getElementById('info-squared');
    const infoControls = document.getElementById('info-controls');
    
    // Cerrar modal al hacer clic en la X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Modal de información general
    if (infoGeneral) {
        infoGeneral.addEventListener('click', function() {
            showModal(
                'Explorando la Dispersión de Datos',
                `
                <p>Esta herramienta interactiva te permite explorar cómo se distribuyen y dispersan los datos alrededor de un valor central.</p>
                <p><strong>Elementos principales:</strong></p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="vertical-align: top;">
                        <td style="width: 65%; padding: 15px 20px 15px 0;">
                            <strong>Cuadros movibles:</strong> Cada cuadro representa un dato. Puedes arrastrarlo y soltarlo en cualquier columna para cambiar su valor.
                        </td>
                        <td style="width: 35%; padding: 15px 0; text-align: center;">
                            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); border-radius: 6px; border: 1px solid rgba(44, 62, 80, 0.4); box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2); margin: 0 auto;"></div>
                        </td>
                    </tr>
                    <tr style="vertical-align: top;">
                        <td style="width: 65%; padding: 15px 20px 15px 0;">
                            <strong>Número en cuadro movil:</strong> Indica la desviación (distancia) entre el valor central seleccionado y el valor que representa cada cuadro. Este número muestra qué tan lejos está cada dato del valor de referencia central.
                        </td>
                        <td style="width: 35%; padding: 15px 0; text-align: center;">
                            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); border-radius: 6px; border: 1px solid rgba(44, 62, 80, 0.4); box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2); margin: 0 auto; position: relative;">
                                <div style="position: absolute; top: -12px; right: -12px; width: 26px; height: 26px; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 13px;">3</div>
                            </div>
                        </td>
                    </tr>
                    <tr style="vertical-align: top;">
                        <td style="width: 65%; padding: 15px 20px 15px 0;">
                            <strong>Indicador de equilibrio:</strong> La barra horizontal con el círculo marcador muestra si el centro de los datos coincide con el centro seleccionado. Para que las medidas de dispersión sean matemáticamente válidas, el círculo marcador debe estar centrado y de color verde, ya que mientras cambias los bloques de columnas cambiando los valores de los datos estos centros pueden desfazarse. Si el círculo está rojo o desplazado, significa que el centro seleccionado no coincide con el centro real de los datos, y en consecuencia, las sumas y promedios calculados para las medidas de dispersión no serán matemáticamente válidos.
                        </td>
                        <td style="width: 35%; padding: 15px 0; text-align: center;">
                            <div style="width: 200px; height: 40px; margin: 0 auto; position: relative;">
                                <div style="position: absolute; top: 15px; left: 0; width: 200px; height: 10px; background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 20%, #cbd5e1 40%, #64748b 50%, #cbd5e1 60%, #e2e8f0 80%, #f1f5f9 100%); border-radius: 6px; border: 1px solid rgba(148, 163, 184, 0.4);"></div>
                                <div style="position: absolute; left: 50%; top: 15px; width: 2px; height: 10px; background: #1a1a2e; transform: translateX(-50%);"></div>
                                <div style="position: absolute; left: 50%; top: 5px; width: 30px; height: 30px; background: linear-gradient(135deg, #15803d 0%, #166534 100%); border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(21, 128, 61, 0.4); transform: translateX(-50%);"></div>
                            </div>
                        </td>
                    </tr>
                </table>
                
                <p style="margin-top: 15px;"><strong>Medidas de dispersión:</strong> Los dos cuadros en la parte inferior muestran dos formas diferentes de medir la dispersión de los datos. Experimenta moviendo los cuadros y observa cómo cambian estos valores.</p>
                `
            );
        });
    }
    
    // Modal de distancias del centro
    if (infoDistances) {
        infoDistances.addEventListener('click', function() {
            showModal(
                'Distancias Absolutas del Centro',
                `
                <p>Esta medida calcula qué tan dispersos están los datos considerando la distancia (también llamada desviación) de cada dato respecto al valor central seleccionado.</p>
                <p><strong>¿Qué representa?</strong></p>
                <ul style="margin-bottom: 10px;">
                    <li style="margin-bottom: 3px;"><strong>Suma:</strong> Suma todas las distancias medidas en valor absoluto, es decir, sin importar el signo todas se consideran positivas. Muestra el total de "alejamiento" de todos los datos respecto al valor central.</li>
                    <li style="margin-bottom: 3px;"><strong>Promedio:</strong> Divide la suma total entre la cantidad de datos. Representa la distancia promedio que tiene cada dato respecto al centro.</li>
                </ul>
                <p><strong>Interpretación:</strong> Cuando este valor es pequeño, significa que los datos están concentrados cerca del valor central. Cuando es grande, indica que los datos están más dispersos y alejados del centro.</p>
                <p><strong>Características:</strong></p>
                <ul style="margin-bottom: 10px;">
                    <li style="margin-bottom: 3px;">Esta medida trata todas las distancias (o desviaciones) de manera igual, sin importar si un dato está muy lejos o muy cerca del centro.</li>
                    <li style="margin-bottom: 3px;">Es útil para entender la variabilidad general de los datos.</li>
                    <li style="margin-bottom: 3px;">Experimenta moviendo los cuadros y observa cómo cambia este valor.</li>
                </ul>
                <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 0.9em; font-style: italic;">
                    <strong>Nota:</strong> El promedio final de esta medida se conoce como Desviación Media Absoluta (DMA).<br>
                    <strong>Fórmula:</strong> DMA = (1/n) × Σ|xᵢ - x̄| donde n es la cantidad de datos, xᵢ es cada dato y x̄ es la media aritmética.
                </p>
                `
            );
        });
    }
    
    // Modal de distancias al cuadrado
    if (infoSquared) {
        infoSquared.addEventListener('click', function() {
            showModal(
                'Distancias del Centro al Cuadrado',
                `
                <p>Esta medida calcula la dispersión elevando cada distancia (también llamada desviación) respecto al centro al cuadrado antes de sumarlas.</p>
                <p><strong>¿Qué representa?</strong></p>
                <ul style="margin-bottom: 10px;">
                    <li style="margin-bottom: 3px;"><strong>Suma:</strong> Suma todas las distancias elevadas al cuadrado. Al elevar al cuadrado, las distancias grandes tienen un peso mucho mayor que las pequeñas, y el resultado siempre es positivo o cero.</li>
                    <li style="margin-bottom: 3px;"><strong>Promedio:</strong> Divide la suma total entre la cantidad de datos. Representa el promedio de las distancias al cuadrado respecto al centro.</li>
                </ul>
                <p><strong>Interpretación:</strong> Esta medida es más sensible a los datos que están muy alejados del centro. Si tienes algunos datos muy lejos del centro, esta medida aumentará significativamente, incluso si la mayoría de los datos están cerca. El resultado siempre será mayor o igual a cero.</p>
                <p><strong>Características:</strong></p>
                <ul style="margin-bottom: 10px;">
                    <li style="margin-bottom: 3px;">Al elevar al cuadrado, las distancias (o desviaciones) grandes se amplifican mucho más que las pequeñas.</li>
                    <li style="margin-bottom: 3px;">Es especialmente útil para detectar cuando hay datos que se alejan mucho del centro.</li>
                    <li style="margin-bottom: 3px;">Compara esta medida con las Distancias Absolutas y observa cómo se comportan de manera diferente cuando mueves los cuadros.</li>
                </ul>
                <p><strong>Diferencia clave:</strong> Mientras que la primera medida trata todas las distancias de manera igual, esta medida da mayor peso a los datos que están muy alejados del centro, dándoles más importancia en el cálculo final.</p>
                <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 0.9em; font-style: italic;">
                    <strong>Nota:</strong> El promedio final de esta medida se conoce como Varianza.<br>
                    <strong>Fórmula:</strong> Varianza = (1/n) × Σ(xᵢ - x̄)² donde n es la cantidad de datos, xᵢ es cada dato y x̄ es la media aritmética.
                </p>
                `
            );
        });
    }
    
           // Modal de controles disponibles
           if (infoControls) {
               infoControls.addEventListener('click', function(e) {
                   e.preventDefault();
                   e.stopPropagation();
                   showModal(
                       'Información de Parámetros',
                       `
                       <p>Esta sección te permite configurar diferentes parámetros de la actividad para explorar la dispersión de datos.</p>
                       <p><strong>Parámetros disponibles:</strong></p>
                <ul>
                    <li><strong>Cantidad de datos:</strong> Modifica cuántos cuadros (datos) quieres que se muestren.</li>
                    <li><strong>Centro:</strong> Representa el valor de referencia alrededor del cual se mide la variabilidad y dispersión de los datos. Es el punto central respecto al cual se calculan las desviaciones. Puedes seleccionar cualquier valor entre 0 y 10.</li>
                    <li><strong>Rango de valores:</strong> Define el rango entre el valor mínimo y máximo que se muestra en pantalla. Controla qué valores pueden tomar los datos. Los valores disponibles son: 2, 4, 6, 8, 10 y 12.</li>
                    <li><strong>Botón Reiniciar:</strong> Reubica todos los cuadros de vuelta a la columna del centro, permitiéndote comenzar una nueva exploración desde el estado inicial.</li>
                </ul>
                <p><strong>Consejo:</strong> Experimenta cambiando estos valores y observa cómo afectan la distribución de los datos y las medidas de dispersión. Prueba diferentes combinaciones para entender mejor cómo funciona la variabilidad.</p>
                `
            );
        });
    }
}

// Función para mostrar el modal
function showModal(title, content) {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';
    }
}

// Calcular el número de columnas basándose en el centro y el rango (como una recta numérica)
function calculateColumnsFromRange(center, range) {
    const halfRange = range / 2;
    // Permitir valores negativos (como una recta numérica)
    const minColumn = Math.ceil(center - halfRange);
    const maxColumn = Math.floor(center + halfRange);
    return {
        min: minColumn,
        max: maxColumn,
        count: maxColumn - minColumn + 1
    };
}

// Actualizar opciones del select de Centro
function updateCenterOptions() {
    const centerSelect = document.getElementById('center-column');
    const rangeInput = document.getElementById('value-range');
    
    if (!centerSelect || !rangeInput) return;
    
    const currentRange = parseInt(rangeInput.value);
    valueRange = currentRange;
    
    // El centro puede ser desde 0 hasta 10 (como una recta numérica)
    const minCenter = 0;
    const maxCenter = 10;
    
    // Guardar el valor actual antes de limpiar
    const currentValue = centerSelect.value || centerColumn;
    
    // Limpiar opciones existentes
    centerSelect.innerHTML = '';
    
    // Crear opciones del 0 al 10
    for (let i = minCenter; i <= maxCenter; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === parseInt(currentValue) || (i === centerColumn && !currentValue)) {
            option.selected = true;
            centerColumn = i;
        }
        centerSelect.appendChild(option);
    }
}

// Función para mover cuadros al centro (sin animación)
function resetSquaresToCenter() {
    // Obtener todos los cuadrados de todas las columnas
    const allSquares = document.querySelectorAll('.square');
    
    // Remover todos los cuadrados
    allSquares.forEach(square => {
        square.remove();
    });
    
    // Usar la columna central seleccionada
    const centerColumnElement = document.querySelector(`.column[data-column="${centerColumn}"] .drop-zone`);
    
    if (centerColumnElement) {
        // Recrear los cuadrados en la columna inicial
        // Orden inverso: del más grande al más pequeño para que el más grande quede abajo
        for (let size = numSquares; size >= 1; size--) {
            const square = createSquare(size);
            centerColumnElement.appendChild(square);
            updateDisplacement(square);
        }
        
        // Reinicializar drag and drop
        initializeDragAndDrop();
        
        // Actualizar displays
        updateSumDisplay();
        updateSquaredSumDisplay();
        updateEquilibriumIndicator();
        updateCenterColumnColor();
    }
}

// Función para aplicar cambios
function applyChanges() {
    const rangeInput = document.getElementById('value-range');
    const numSquaresInput = document.getElementById('num-squares');
    const centerSelect = document.getElementById('center-column');
    
    const oldCenterColumn = centerColumn;
    const oldNumSquares = numSquares;
    const oldValueRange = valueRange;
    
    // Capturar cuadros existentes antes de cambiar valores
    const existingSquares = document.querySelectorAll('.square');
    const shouldAnimate = existingSquares.length > 0;
    
    valueRange = parseInt(rangeInput.value);
    numSquares = parseInt(numSquaresInput.value);
    centerColumn = parseInt(centerSelect.value);
    
    // Calcular el número de columnas basándose en el centro y el rango
    const columnInfo = calculateColumnsFromRange(centerColumn, valueRange);
    numColumns = columnInfo.count;
    
    // Si cambió el centro, el número de cuadros o el rango, animar al centro
    const centerChanged = oldCenterColumn !== centerColumn;
    const squaresChanged = oldNumSquares !== numSquares;
    const rangeChanged = oldValueRange !== valueRange;
    
    // Si cambió el centro, el número de cuadros o el rango, mover los cuadros al centro
    if (centerChanged || squaresChanged || rangeChanged) {
        // Regenerar columnas
        generateColumns(columnInfo.min, columnInfo.max);
        
        // Mover los cuadros al centro (sin animación)
        resetSquaresToCenter();
    } else {
        // Si no cambió nada, solo regenerar columnas normalmente
        generateColumns(columnInfo.min, columnInfo.max);
        initializeDragAndDrop();
        
        // Actualizar desplazamientos de todos los cuadrados existentes
        document.querySelectorAll('.square').forEach(square => {
            updateDisplacement(square);
        });
        updateSumDisplay();
        updateSquaredSumDisplay();
        updateEquilibriumIndicator();
        updateCenterColumnColor();
    }
}

// Inicializar formulario
function initializeForm() {
    const rangeInput = document.getElementById('value-range');
    const numSquaresInput = document.getElementById('num-squares');
    const centerSelect = document.getElementById('center-column');
    
    // Inicializar opciones del centro
    updateCenterOptions();
    
    // Aplicar cambios automáticamente cuando cambia el rango de valores
    rangeInput.addEventListener('change', function() {
        updateCenterOptions();
        applyChanges();
    });
    
    // Aplicar cambios automáticamente cuando cambia el select de cuadrados
    numSquaresInput.addEventListener('change', function() {
        applyChanges();
    });
    
    // Aplicar cambios automáticamente cuando cambia el select de centro
    centerSelect.addEventListener('change', function() {
        applyChanges();
    });
}

// Generar columnas dinámicamente
function generateColumns(minColumn = null, maxColumn = null) {
    const container = document.getElementById('columns-container');
    if (!container) {
        return;
    }
    
    container.innerHTML = '';
    
    // Si no se proporcionan min y max, calcularlos desde el centro y el rango
    if (minColumn === null || maxColumn === null) {
        const columnInfo = calculateColumnsFromRange(centerColumn, valueRange);
        minColumn = columnInfo.min;
        maxColumn = columnInfo.max;
        numColumns = columnInfo.count;
    }
    
    // Generar columnas desde minColumn hasta maxColumn
    for (let i = minColumn; i <= maxColumn; i++) {
        const column = document.createElement('div');
        column.className = 'column';
        column.setAttribute('data-column', i);
        
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        
        // Si es la columna central, agregar los cuadrados
        if (i === centerColumn) {
            dropZone.id = 'initial-column';
            
            // Crear cuadrados en orden inverso (el más grande abajo)
            for (let j = numSquares; j >= 1; j--) {
                const square = createSquare(j);
                dropZone.appendChild(square);
                // Inicializar desplazamiento en 0
                updateDisplacement(square);
            }
            
            // Actualizar la suma después de crear todos los cuadrados
            updateSumDisplay();
            updateSquaredSumDisplay();
            // Actualizar el indicador de equilibrio
            updateEquilibriumIndicator();
            // Actualizar color de la columna del centro
            updateCenterColumnColor();
            // Marcar la columna central con el círculo
            const centerColNumber = document.querySelector(`.column[data-column="${centerColumn}"] .column-number`);
            if (centerColNumber) {
                centerColNumber.classList.add('median-column');
                centerColNumber.title = 'Desafío: descubre qué representa este círculo';
            }
        }
        
        const columnNumber = document.createElement('div');
        columnNumber.className = 'column-number';
        columnNumber.textContent = i;
        
        column.appendChild(dropZone);
        column.appendChild(columnNumber);
        container.appendChild(column);
    }
    
    // Actualizar color de la columna del centro después de generar todas las columnas
    updateCenterColumnColor();
}

// Crear un cuadrado
function createSquare(size) {
    const square = document.createElement('div');
    square.className = 'square';
    square.setAttribute('data-size', size);
    square.setAttribute('draggable', 'true');
    
    // Guardar la columna inicial (columna central seleccionada)
    square.setAttribute('data-initial-column', centerColumn);
    
    // Asignar color según el tamaño (usando módulo para repetir colores si hay más de 12)
    const colorIndex = (size - 1) % squareColors.length;
    square.style.background = squareColors[colorIndex];
    
    // Crear elemento para mostrar desplazamiento
    const displacementBadge = document.createElement('div');
    displacementBadge.className = 'displacement-badge';
    displacementBadge.textContent = '0';
    square.appendChild(displacementBadge);
    
    return square;
}

// Inicializar funcionalidad de arrastrar y soltar
function initializeDragAndDrop() {
    const squares = document.querySelectorAll('.square');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    // Agregar event listeners a cada cuadrado
    squares.forEach(square => {
        // Remover listeners anteriores si existen
        square.replaceWith(square.cloneNode(true));
    });
    
    // Obtener los nuevos elementos
    const newSquares = document.querySelectorAll('.square');
    newSquares.forEach(square => {
        square.addEventListener('dragstart', handleDragStart);
        square.addEventListener('dragend', handleDragEnd);
    });
    
    // Agregar event listeners a cada zona de soltado
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
    });
}

// Manejar inicio del arrastre
function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    initialColumn = this.parentElement;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

// Manejar fin del arrastre
function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remover clases de todas las zonas
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
}

// Manejar cuando se arrastra sobre una zona
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

// Manejar entrada a una zona
function handleDragEnter(e) {
    this.classList.add('drag-over');
}

// Manejar salida de una zona
function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

// Calcular y actualizar desplazamiento de un cuadrado
function updateDisplacement(square) {
    const initialColumn = parseInt(square.getAttribute('data-initial-column'));
    const currentColumnElement = square.closest('.column');
    if (!currentColumnElement) return;
    
    const currentColumn = parseInt(currentColumnElement.getAttribute('data-column'));
    const displacement = Math.abs(currentColumn - initialColumn);
    
    // Actualizar el badge de desplazamiento
    const badge = square.querySelector('.displacement-badge');
    if (badge) {
        badge.textContent = displacement;
    }
    
    // Remover tooltip si existe
    square.removeAttribute('title');
    
    // Actualizar la suma total
    updateSumDisplay();
    // Actualizar la suma de cuadrados
    updateSquaredSumDisplay();
    // Actualizar el indicador de equilibrio
    updateEquilibriumIndicator();
}

// Actualizar la visualización de la suma de movimientos
function updateSumDisplay() {
    const allSquares = document.querySelectorAll('.square');
    const displacements = [];
    let total = 0;
    
    allSquares.forEach(square => {
        const badge = square.querySelector('.displacement-badge');
        if (badge) {
            const displacement = parseInt(badge.textContent) || 0;
            displacements.push(displacement);
            total += displacement;
        }
    });
    
    // Si no hay cuadrados, mostrar ceros según la cantidad de datos
    if (displacements.length === 0) {
        for (let i = 0; i < numSquares; i++) {
            displacements.push(0);
        }
    }
    
    // Crear la expresión: 0+0+0+... = total
    const expression = displacements.join('+');
    const sumDisplay = document.getElementById('sum-display');
    if (sumDisplay) {
        sumDisplay.textContent = `Suma: ${expression} = ${total}`;
    }
    
    // Calcular y mostrar el promedio, mostrando de dónde sale (total / cantidad de datos)
    const average = numSquares > 0 ? (total / numSquares).toFixed(2) : 0;
    const averageDisplay = document.getElementById('average-display');
    if (averageDisplay) {
        averageDisplay.textContent = numSquares > 0
            ? `Promedio: ${total} / ${numSquares} = ${average}`
            : `Promedio: ${average}`;
    }
    
    // Comparación visual entre DMA y Varianza
    updateComparisonVisual();
}

// Actualizar la visualización de la suma de cuadrados de movimientos
function updateSquaredSumDisplay() {
    const allSquares = document.querySelectorAll('.square');
    const rawDisplacements = [];
    const squaredDisplacements = [];
    let squaredTotal = 0;

    allSquares.forEach(square => {
        const badge = square.querySelector('.displacement-badge');
        if (badge) {
            const displacement = parseInt(badge.textContent) || 0;
            const squared = displacement * displacement;
            rawDisplacements.push(displacement);
            squaredDisplacements.push(squared);
            squaredTotal += squared;
        }
    });

    // Si no hay cuadrados, mostrar ceros según la cantidad de datos
    if (squaredDisplacements.length === 0) {
        for (let i = 0; i < numSquares; i++) {
            rawDisplacements.push(0);
            squaredDisplacements.push(0);
        }
    }

    // Crear la expresión simbólica: Suma: 2²+3²+0²... = total (números originales elevados al cuadrado)
    const powerExpression = rawDisplacements.map(d => `${d}²`).join('+');
    const squaredExpressionDisplay = document.getElementById('squared-expression-display');
    if (squaredExpressionDisplay) {
        squaredExpressionDisplay.textContent = `Suma: ${powerExpression} = ${squaredTotal}`;
    }

    // Crear la expresión: 0 +0 +0 +... = total (valores ya elevados al cuadrado)
    // Los términos de un solo dígito llevan un espacio extra al final para que
    // cada término quede con el mismo ancho que su equivalente arriba (dígito + ²).
    // trimEnd() evita que ese espacio del último término se sume al espacio
    // del " = " y quede un espacio de más antes del igual.
    const expression = squaredDisplacements
        .map(v => (String(v).length === 1 ? `${v} ` : `${v}`))
        .join('+')
        .trimEnd();
    const squaredSumDisplay = document.getElementById('squared-sum-display');
    if (squaredSumDisplay) {
        squaredSumDisplay.textContent = `Suma: ${expression} = ${squaredTotal}`;
    }
    
    // Calcular y mostrar el promedio de cuadrados, mostrando de dónde sale (total / cantidad de datos)
    const squaredAverage = numSquares > 0 ? (squaredTotal / numSquares).toFixed(2) : 0;
    const squaredAverageDisplay = document.getElementById('squared-average-display');
    if (squaredAverageDisplay) {
        squaredAverageDisplay.textContent = numSquares > 0
            ? `Promedio: ${squaredTotal} / ${numSquares} = ${squaredAverage}`
            : `Promedio: ${squaredAverage}`;
    }
    
    // Comparación visual entre DMA y Varianza
    updateComparisonVisual();
}

// Función para comparación visual entre DMA y Varianza
function updateComparisonVisual() {
    const averageDisplay = document.getElementById('average-display');
    const squaredAverageDisplay = document.getElementById('squared-average-display');
    const statsBox1 = document.querySelector('.stats-box:first-child');
    const statsBox2 = document.querySelector('.stats-box:last-child');
    
    if (!averageDisplay || !squaredAverageDisplay) return;
    
    const dma = parseFloat(averageDisplay.textContent.split(':')[1].trim()) || 0;
    const variance = parseFloat(squaredAverageDisplay.textContent.split(':')[1].trim()) || 0;
    
    // Remover clases anteriores
    if (statsBox1) statsBox1.classList.remove('highlight-difference');
    if (statsBox2) statsBox2.classList.remove('highlight-difference');
    
    // Si hay una diferencia significativa (variance > dma * 1.5), destacar
    if (variance > 0 && dma > 0 && variance > dma * 1.5) {
        if (statsBox2) statsBox2.classList.add('highlight-difference');
    }
}


// Actualizar el indicador de equilibrio
function updateEquilibriumIndicator() {
    const marker = document.getElementById('level-indicator-marker');
    const centerLine = document.querySelector('.level-indicator-center');
    if (!marker) return;
    
    // Calcular el rango real de columnas
    const columnInfo = calculateColumnsFromRange(centerColumn, valueRange);
    const minColumn = columnInfo.min;
    const maxColumn = columnInfo.max;
    const numCols = columnInfo.count;
    
    // Como el centro siempre es la columna central y el número de columnas es impar,
    // el centro está exactamente en el 50% de la barra
    const centerColumnPosition = 50;
    
    // Actualizar la posición de la línea negra para que coincida con la columna del centro
    if (centerLine) {
        centerLine.style.left = centerColumnPosition + '%';
    }
    
    const allSquares = document.querySelectorAll('.square');
    const columnValues = [];
    
    // Obtener los valores de las columnas donde están los cuadrados
    allSquares.forEach(square => {
        const columnElement = square.closest('.column');
        if (columnElement) {
            const columnValue = parseInt(columnElement.getAttribute('data-column'));
            columnValues.push(columnValue);
        }
    });
    
    // Remover marca de mediana de todas las columnas
    document.querySelectorAll('.column-number').forEach(colNum => {
        colNum.classList.remove('median-column');
    });
    
    // Marcar la columna central con el círculo
    const centerColNumber = document.querySelector(`.column[data-column="${centerColumn}"] .column-number`);
    if (centerColNumber) {
        centerColNumber.classList.add('median-column');
        centerColNumber.title = 'Desafío: descubre qué representa este círculo';
    }
    
    // Si no hay cuadrados
    if (columnValues.length === 0) {
        marker.style.left = centerColumnPosition + '%';
        marker.style.backgroundColor = '#991b1b';
        marker.classList.remove('balanced');
        
        // Marcar medidas como inválidas
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            statsContainer.classList.add('invalid-measures');
        }
        return;
    }
    
    // Calcular el promedio de los valores de las columnas
    const sum = columnValues.reduce((acc, val) => acc + val, 0);
    const average = sum / columnValues.length;
    
    // Calcular la diferencia entre el promedio y el centro
    const difference = average - centerColumn;
    
    // Calcular el ancho de una columna en porcentaje
    // El rango total es de minColumn a maxColumn, que tiene numCols columnas
    const totalRange = maxColumn - minColumn;
    const columnWidthPercent = totalRange > 0 ? (100 / numCols) : 0;
    
    // Calcular la posición del marcador
    // Si difference es 0, el marcador está en el 50% (centro)
    // Si difference es negativa, se mueve a la izquierda
    // Si difference es positiva, se mueve a la derecha
    // La diferencia se mapea proporcionalmente al ancho de las columnas
    let position = centerColumnPosition + (difference * columnWidthPercent);
    
    // Limitar entre 2% y 98% para que el marcador no se salga de la barra
    position = Math.max(2, Math.min(98, position));
    
    marker.style.left = position + '%';
    
    // Cambiar color según si está equilibrado
    const isBalanced = Math.abs(difference) < 0.01;
    const statsContainer = document.querySelector('.stats-container');
    
    if (isBalanced) {
        marker.style.backgroundColor = '#15803d';
        marker.classList.add('balanced');
        
        // Remover clase de medidas inválidas
        if (statsContainer) {
            statsContainer.classList.remove('invalid-measures');
        }
        
        // Feedback visual: agregar clase al contenedor para animación sutil
        const indicatorContainer = document.querySelector('.level-indicator-container');
        if (indicatorContainer) {
            indicatorContainer.classList.add('equilibrium-reached');
            setTimeout(() => {
                indicatorContainer.classList.remove('equilibrium-reached');
            }, 2000);
        }
    } else {
        marker.style.backgroundColor = '#991b1b';
        marker.classList.remove('balanced');
        
        // Agregar clase de medidas inválidas para mostrar en rojo
        if (statsContainer) {
            statsContainer.classList.add('invalid-measures');
        }
    }
    
    // Actualizar el color de la barra según la posición del marcador
    const bar = document.querySelector('.level-indicator-bar');
    if (bar) {
        // El centro siempre está en el 50% (0.5)
        const centerPos = 0.5;
        
        // Crear un gradiente que refleje los colores de las columnas con tonos grises azulados sutiles
        // Claro (extremos) -> Medio -> Gris azulado oscuro (centro) -> Medio -> Claro
        const gradientStops = [];
        
        // Calcular los puntos del gradiente basados en el centro (50%)
        const leftExtreme = Math.max(0, centerPos - 0.4);
        const leftMid = Math.max(0, centerPos - 0.2);
        const rightMid = Math.min(1, centerPos + 0.2);
        const rightExtreme = Math.min(1, centerPos + 0.4);
        
        gradientStops.push(`#f1f5f9 ${leftExtreme * 100}%`); // Muy claro en extremos
        gradientStops.push(`#e2e8f0 ${leftMid * 100}%`); // Claro
        gradientStops.push(`#cbd5e1 ${(centerPos - 0.05) * 100}%`); // Medio
        gradientStops.push(`#64748b ${centerPos * 100}%`); // Gris azulado oscuro en el centro (50%)
        gradientStops.push(`#cbd5e1 ${(centerPos + 0.05) * 100}%`); // Medio
        gradientStops.push(`#e2e8f0 ${rightMid * 100}%`); // Claro
        gradientStops.push(`#f1f5f9 ${rightExtreme * 100}%`); // Muy claro en extremos
        
        bar.style.background = `linear-gradient(90deg, ${gradientStops.join(', ')})`;
    }
    
    // Actualizar color de la columna del centro
    updateCenterColumnColor();
}

// Actualizar el color de la columna que coincide con el centro
function updateCenterColumnColor() {
    // Remover todas las clases de color de todas las columnas
    document.querySelectorAll('.column').forEach(column => {
        column.classList.remove('center-column', 'distance-1', 'distance-2', 'distance-3', 'distance-4', 'distance-5');
    });
    
    // Aplicar colores según la distancia al centro
    document.querySelectorAll('.column').forEach(column => {
        const columnValue = parseInt(column.getAttribute('data-column'));
        const distance = Math.abs(columnValue - centerColumn);
        
        if (distance === 0) {
            column.classList.add('center-column');
        } else if (distance === 1) {
            column.classList.add('distance-1');
        } else if (distance === 2) {
            column.classList.add('distance-2');
        } else if (distance === 3) {
            column.classList.add('distance-3');
        } else if (distance >= 4) {
            column.classList.add('distance-4');
        }
    });
}

// Manejar soltado en una zona
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    // Verificar que hay un elemento siendo arrastrado
    if (draggedElement && draggedElement !== null) {
        // Si se suelta en la misma columna, no hacer nada
        if (this === initialColumn) {
            return false;
        }
        
        // Remover el elemento de su posición original
        draggedElement.remove();
        
        // Agregar el elemento a la nueva columna
        // Si la columna está vacía, se agrega directamente (aparece abajo por flex-end)
        // Si tiene elementos, se agrega al final del contenedor (visualmente arriba de los existentes)
        this.appendChild(draggedElement);
        
        // Actualizar el desplazamiento del cuadrado movido
        updateDisplacement(draggedElement);
        // Actualizar el indicador de equilibrio
        updateEquilibriumIndicator();
    }
    
    return false;
}

// Inicializar botón de reinicio
function initializeResetButton() {
    const resetBtn = document.getElementById('reset-btn');
    
    resetBtn.addEventListener('click', function() {
        // Mover los cuadros al centro (sin animación)
        resetSquaresToCenter();
    });
}

// Aplicar distribución preestablecida
function applyDistribution(distributionType) {
    // Configuración base: 7 datos, centro 4, rango 6
    const numSquaresInput = document.getElementById('num-squares');
    const centerSelect = document.getElementById('center-column');
    const rangeInput = document.getElementById('value-range');
    
    // Establecer valores
    numSquaresInput.value = 7;
    centerSelect.value = 4;
    rangeInput.value = 6;
    
    // Aplicar cambios
    applyChanges();
    
    // Esperar a que se generen las columnas y luego distribuir los cuadros
    setTimeout(() => {
        const centerCol = document.querySelector(`.column[data-column="4"] .drop-zone`);
        if (!centerCol) return;
        
        const squares = Array.from(centerCol.querySelectorAll('.square'));
        if (squares.length < 7) return;
        
        let targetColumns = [];
        
        switch(distributionType) {
            case 'center':
                // Todos al centro: 4, 4, 4, 4, 4, 4, 4
                // No hacer nada, todos ya están en el centro
                break;
                
            case 'uniform':
                // Uniforme: 1, 2, 3, 4, 5, 6, 7
                targetColumns = [1, 2, 3, 4, 5, 6, 7];
                break;
                
            case 'same1':
                // Misma media (4) y DMA pero diferente varianza
                // Distribución: 2, 2, 4, 4, 4, 6, 6
                // Media = 28/7 = 4, DMA = 8/7 ≈ 1.14, Varianza = 16/7 ≈ 2.29
                targetColumns = [2, 2, 4, 4, 4, 6, 6];
                break;
                
            case 'same2':
                // Misma media (4) y DMA pero diferente varianza
                // Distribución: 2, 2, 4, 4, 5, 5, 6
                // Media = 28/7 = 4, DMA = 8/7 ≈ 1.14, Varianza = 12/7 ≈ 1.71
                targetColumns = [2, 2, 4, 4, 5, 5, 6];
                break;
                
            case 'same3':
                // Misma media (4) y DMA pero diferente varianza
                // Distribución: 1, 3, 4, 4, 4, 5, 7
                // Media = 28/7 = 4, DMA = 8/7 ≈ 1.14, Varianza = 20/7 ≈ 2.86
                targetColumns = [1, 3, 4, 4, 4, 5, 7];
                break;
        }
        
        // Distribuir los cuadros según la configuración
        if (targetColumns.length > 0) {
            // Obtener todos los cuadros del centro primero
            const allSquares = Array.from(centerCol.querySelectorAll('.square'));
            
            targetColumns.forEach((colNum, index) => {
                if (index < allSquares.length) {
                    const targetCol = document.querySelector(`.column[data-column="${colNum}"] .drop-zone`);
                    if (targetCol) {
                        targetCol.appendChild(allSquares[index]);
                    }
                }
            });
        }
        
        // Actualizar desplazamientos y equilibrio
        document.querySelectorAll('.square').forEach(square => {
            updateDisplacement(square);
        });
        updateEquilibriumIndicator();
    }, 100);
}

// Inicializar panel de comparación
function initializeComparisonPanel() {
    const triggerIcon = document.getElementById('comparison-trigger');
    const comparisonPanel = document.getElementById('comparison-panel');
    const comparisonClose = document.querySelector('.comparison-close');
    const exampleButtons = document.querySelectorAll('.btn-example');
    
    // Función para cerrar el panel
    function closePanel() {
        if (comparisonPanel) {
            comparisonPanel.style.display = 'none';
        }
    }
    
    // Función para abrir el panel
    function openPanel() {
        if (comparisonPanel) {
            comparisonPanel.style.display = 'block';
        }
    }
    
    if (triggerIcon && comparisonPanel) {
        triggerIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openPanel();
        });
    }
    
    if (comparisonClose && comparisonPanel) {
        comparisonClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closePanel();
        });
    }
    
    // Inicializar botones de ejemplo
    exampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exampleType = this.getAttribute('data-example');
            if (exampleType) {
                applyDistribution(exampleType);
            }
        });
    });
}
