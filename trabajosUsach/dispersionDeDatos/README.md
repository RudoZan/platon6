# Explorando la Dispersión de Datos

Aplicación web educativa interactiva diseñada para estudiantes de 3er año de enseñanza media y cursos universitarios de matemática. Esta herramienta permite explorar y comprender conceptos fundamentales de estadística descriptiva, específicamente las medidas de dispersión de datos.

## 🎯 Objetivo

Facilitar el aprendizaje interactivo de:
- **Distancias absolutas del centro** (Desviación Media Absoluta - DMA)
- **Distancias del centro al cuadrado** (Varianza)
- La sensibilidad de diferentes medidas de dispersión a valores extremos
- El concepto de equilibrio y distribución de datos alrededor de un valor central

## ✨ Características

### Interfaz Interactiva
- **Cuadros movibles**: Representan datos que pueden arrastrarse y soltarse en diferentes columnas
- **Indicador de desplazamiento**: Muestra la distancia de cada dato respecto al centro seleccionado
- **Indicador de equilibrio**: Barra visual que muestra el balance de la distribución de datos
- **Cálculos en tiempo real**: Suma y promedio de distancias absolutas y al cuadrado

### Panel de Comparación
- Ejemplos predefinidos que demuestran cómo distribuciones diferentes pueden tener el mismo promedio de distancias absolutas pero diferentes varianzas
- Visualización interactiva de la sensibilidad de las medidas de dispersión

### Parámetros Configurables
- **Cantidad de datos**: Entre 1 y 15 datos
- **Centro**: Valor de referencia entre 0 y 10
- **Rango de valores**: Define el rango de columnas visibles (2, 4, 6, 8, 10, 12)

## 🚀 Uso

1. Abre `index.html` en tu navegador web
2. Configura los parámetros según tus necesidades:
   - Selecciona la cantidad de datos
   - Elige el valor central
   - Define el rango de valores
3. Arrastra los cuadros a diferentes columnas para explorar la dispersión
4. Observa cómo cambian las medidas de dispersión en tiempo real
5. Usa el panel de comparación para explorar ejemplos predefinidos

## 📁 Estructura del Proyecto

```
explora_dispersion/
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos y diseño visual
├── script.js       # Lógica de la aplicación
└── README.md       # Este archivo
```

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con gradientes, sombras y animaciones
- **JavaScript (Vanilla)**: Lógica de interacción, drag & drop, y cálculos matemáticos

## 📚 Conceptos Educativos

### Medidas de Dispersión

1. **Distancias Absolutas del Centro (DMA)**
   - Calcula el promedio de las distancias absolutas de cada dato respecto al centro
   - Fórmula: DMA = (1/n) × Σ|xᵢ - c|
   - Trata todas las distancias de manera equivalente

2. **Distancias del Centro al Cuadrado (Varianza)**
   - Calcula el promedio de las distancias elevadas al cuadrado
   - Fórmula: Varianza = (1/n) × Σ(xᵢ - c)²
   - Más sensible a valores extremos que la DMA

### Aplicaciones Pedagógicas

- Visualización interactiva de conceptos estadísticos
- Comparación de diferentes medidas de dispersión
- Exploración de la sensibilidad a valores extremos
- Comprensión del concepto de equilibrio en distribuciones

## 🎨 Diseño

La aplicación cuenta con un diseño moderno y elegante que mantiene un aspecto académico:
- Paleta de colores en tonos grises azulados
- Interfaz limpia y minimalista
- Efectos visuales sutiles (gradientes, sombras, transiciones)
- Diseño responsive que se adapta a diferentes tamaños de pantalla

## 📝 Notas

- Los archivos PDF en el directorio están excluidos del repositorio mediante `.gitignore`
- La aplicación no requiere servidor web, puede ejecutarse directamente abriendo `index.html`
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)

## 👨‍💻 Desarrollo

Desarrollado por **Astutosoft 2026**

## 📄 Licencia

Este proyecto es de uso educativo.

---

**Versión**: 1.0  
**Última actualización**: 2026
