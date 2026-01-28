// inicio.js
document.addEventListener("DOMContentLoaded", () => {

  // ================= HEADER BURGER =================
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("active");
      burger.classList.toggle("active");
    });
  }

  // ================= CONFIGURACIÓN EXTRA DE CURSOS =================
  const extrasCursos = {
    Infantil: {
      emoji: "🧒",
      age: "4-6 años",
      schedule: "L-X-V 17:00-18:00",
      image: "https://images.unsplash.com/photo-1516684991026-4c3032a2b4fd",
      color: "#00c853"
    },
    Niños: {
      emoji: "👦",
      age: "7-9 años",
      schedule: "L-X-V 18:00-19:00",
      image: "https://images.unsplash.com/photo-1516684991026-4c3032a2b4fd",
      color: "#c62828"
    },
    Prejuvenil: {
      emoji: "👦👧",
      age: "10-13 años",
      schedule: "M-J 18:00-19:30",
      image: "https://images.unsplash.com/photo-1579331844418-fcd67e29b3d6",
      color: "#ffb300"
    },
    Adultos: {
      emoji: "🧑",
      age: "+14 años",
      schedule: "L-X-V 19:30-21:00",
      image: "https://images.unsplash.com/photo-1579331844418-fcd67e29b3d6",
      color: "#333333"
    },
    Competición: {
      emoji: "🥋",
      age: "Todos",
      schedule: "M-J 19:30-21:00",
      image: "https://images.unsplash.com/photo-1576149146095-caa19d4de102",
      color: "#c62828"
    },
    "Preparación Física": {
      emoji: "💪",
      age: "Todos",
      schedule: "S 10:00-11:30",
      image: "https://images.unsplash.com/photo-1725813961320-151288b4c4db",
      color: "#00c853"
    }
  };

  // ================= RENDER CURSOS =================
  async function renderCursos() {
    const contenedor = document.getElementById("cursos-container");
    if (!contenedor) return;

    try {
      const response = await fetch("http://localhost:3000/api/cursos");
      if (!response.ok) throw new Error("No se pudo obtener la información");
      const cursosBD = await response.json();

      contenedor.innerHTML = cursosBD.map(curso => {
        const clave = curso.nombre.trim();
        const extra = extrasCursos[clave] || {};

        return `
          <div class="curso-card">
            <div class="curso-img-wrapper">
              <img src="${extra.image || ''}" alt="${curso.nombre}" class="curso-img" />
              <div class="curso-overlay"></div>
              <div class="curso-emoji">${extra.emoji || ''}</div>
              <div class="curso-text-img">
                <h3>${curso.nombre.toUpperCase()}</h3>
                <p class="grado">${curso.grado || extra.age || 'Consultar edad'}</p>
              </div>
            </div>
            <div class="curso-content">
              <p class="curso-horario">${extra.schedule || ''}</p>
              <p class="precio">${curso.precio ? curso.precio + '€ / mes' : ''}</p>
              <button class="btn-mas-info" style="background-color: ${extra.color || '#333'}">
                Más información
              </button>
            </div>
          </div>
        `;
      }).join('');

    } catch (error) {
      console.error("Error al cargar cursos:", error);
      contenedor.innerHTML = `<p class="error-msg">Error: No se pudo cargar la información de cursos.</p>`;
    }
  }

  renderCursos();

  // ================= BOTONES HERO =================
  const btnConocenos = document.querySelector(".hero_buttons .conocenos");
  const btnVerClases = document.querySelector(".hero_buttons .ver_clases");

  if (btnConocenos) {
    btnConocenos.addEventListener("click", () => {
      const seccionHistoria = document.getElementById("contenido");
      if (seccionHistoria) {
        seccionHistoria.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (btnVerClases) {
    btnVerClases.addEventListener("click", () => {
      const seccionCursos = document.getElementById("cursos-container");
      if (seccionCursos) {
        seccionCursos.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ================= BOTÓN NAV ESPECIAL =================
  const btnNavConocenos = document.getElementById("btn_conocenos");
  if (btnNavConocenos) {
    btnNavConocenos.addEventListener("click", () => {
      const seccionHistoria = document.getElementById("contenido");
      if (seccionHistoria) {
        seccionHistoria.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ================= BOTONES SECCIÓN FINAL =================
  const btnRegistro = document.querySelector(".seccion_final .registro");
  const btnInicio = document.querySelector(".seccion_final .inicio");

  if (btnRegistro) {
    btnRegistro.addEventListener("click", () => {
      window.location.href = "registro.html";
    });
  }

  if (btnInicio) {
    btnInicio.addEventListener("click", () => {
      window.location.href = "inicio_sesion.html";
    });
  }

});

