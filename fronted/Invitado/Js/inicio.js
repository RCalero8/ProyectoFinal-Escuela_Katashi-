const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace (opcional)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderCursos();
});

async function renderCursos() {
    const contenedor = document.getElementById('cursos-container');
    
    try {
        // 1. Llamada a tu API de Node.js
        const response = await fetch('http://localhost:3000/api/cursos');
        const cursos = await response.json();

        // 2. Diccionario para asignar colores de botones según el nombre del curso
        const configCursos = {
            'Infantil': { color: '#00c853', emoji: '👦' },
            'Niños': { color: '#c62828', emoji: '🧒' },
            'Prejuvenil': { color: '#ffb300', emoji: '🧑' },
            'Adultos': { color: '#333333', emoji: '👨' },
            'Competición': { color: '#c62828', emoji: '🥋' },
            'Preparación Física': { color: '#00c853', emoji: '💪' }
        };

        // 3. Limpiar contenedor y "pintar" los cursos
        contenedor.innerHTML = '';

        cursos.forEach(curso => {
            const config = configCursos[curso.nombre] || { color: '#333', emoji: '🥋' };
            
            const card = `
                <div class="curso-card">
                    <div class="curso-imagen">
                        <span class="emoji-float">${config.emoji}</span>
                        <img src="public/imagenes/cursos/${curso.nombre.toLowerCase()}.jpg" alt="${curso.nombre}">
                        <div class="overlay-text">
                            <h3>${curso.nombre.toUpperCase()}</h3>
                            <p>${curso.grado}</p>
                        </div>
                    </div>
                    <div class="curso-detalle">
                        <p class="horario">L-X-V 17:00-18:00</p> <button class="btn-info" style="background-color: ${config.color}">
                            Mas información
                        </button>
                    </div>
                </div>
            `;
            contenedor.innerHTML += card;
        });

    } catch (error) {
        console.error("Error al cargar los cursos:", error);
        contenedor.innerHTML = '<p>Error al conectar con el servidor.</p>';
    }
}