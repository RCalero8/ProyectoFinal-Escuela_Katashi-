// Función principal para obtener y mostrar cursos
async function renderCursos() {
    const contenedor = document.getElementById('cursos-container');
    
    if (!contenedor) return;

    try {
        // Petición al servidor de Node.js
        const response = await fetch('http://localhost:3000/api/cursos');
        
        if (!response.ok) throw new Error("No se pudo obtener la información");

        const cursos = await response.json();

        // Configuración de colores según tu diseño
        const configCursos = {
            'Infantil': '#00c853',
            'Niños': '#c62828',
            'Prejuvenil': '#ffb300',
            'Adultos': '#333333',
            'Competición': '#c62828',
            'Preparación Física': '#00c853'
        };

        // Limpiar el contenedor antes de añadir
        contenedor.innerHTML = cursos.map(curso => `
            <div class="curso-card">
                <div class="curso-info">
                    <h3>${curso.nombre.toUpperCase()}</h3>
                    <p class="grado">${curso.grado || 'Consultar edad'}</p>
                    <p class="precio">${curso.precio}€ / mes</p>
                </div>
                <button class="btn-mas-info" style="background-color: ${configCursos[curso.nombre] || '#333'}">
                    Mas información
                </button>
            </div>
        `).join('');

    } catch (error) {
        console.error("Error detectado:", error);
        contenedor.innerHTML = `<p class="error-msg">Error: El servidor no responde. Revisa que el backend esté encendido.</p>`;
    }
}

// Ejecutar cuando el HTML esté totalmente cargado
document.addEventListener('DOMContentLoaded', renderCursos);

