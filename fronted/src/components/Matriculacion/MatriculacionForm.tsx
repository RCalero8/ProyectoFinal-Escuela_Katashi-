import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Matriculacion/MatriculacionForm.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Curso {
  id_curso: number;
  nombre: string;
  descripcion: string;
  f_inicio: string;
  f_fin: string;
  precio: number;
}

const MatriculacionForm: React.FC = () => {
  const navigate = useNavigate();

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    f_nacimiento: "",
    nivel: "Principiante",
    id_curso: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState("");

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/matriculacion/cursos`);
        const data = await res.json();
        setCursos(data);
      } catch {
        console.error("Error al cargar cursos");
      }
    };
    fetchCursos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setExito("");

    const usuarioJson = localStorage.getItem("usuario");
    if (!usuarioJson) {
      setError("Debes iniciar sesión antes de matricularte");
      return;
    }

    const usuario = JSON.parse(usuarioJson);

    if (!form.dni || !form.nombre || !form.apellido || !form.f_nacimiento || !form.id_curso) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/matriculacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: usuario.id_usuario,
          dni: form.dni,
          nombre: form.nombre,
          apellido: form.apellido,
          f_nacimiento: form.f_nacimiento,
          nivel: form.nivel,
          id_curso: parseInt(form.id_curso),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al procesar la matriculación");
        setLoading(false);
        return;
      }

      setExito(
        `¡Matriculación completada! Te has inscrito en "${data.curso.nombre}".`
      );
      setLoading(false);

      setTimeout(() => navigate("/usuario"), 3000);
    } catch {
      setError("Error de conexión. Inténtalo más tarde.");
      setLoading(false);
    }
  };

  return (
    <div className="matriculacion-body">
      <div className="matriculacion-inner">
        <h2 className="matriculacion-titulo">Matriculación</h2>
        <p className="matriculacion-subtitulo">
          Completa tus datos para inscribirte en un curso de la Escuela Katashi.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="matriculacion-field">
            <label className="matriculacion-label">DNI / NIE:</label>
            <input
              className="matriculacion-input"
              type="text"
              name="dni"
              placeholder="12345678A"
              value={form.dni}
              onChange={handleChange}
              required
            />
          </div>

          <div className="matriculacion-field">
            <label className="matriculacion-label">Nombre:</label>
            <input
              className="matriculacion-input"
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="matriculacion-field">
            <label className="matriculacion-label">Apellidos:</label>
            <input
              className="matriculacion-input"
              type="text"
              name="apellido"
              placeholder="Tus apellidos"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="matriculacion-field">
            <label className="matriculacion-label">Fecha de nacimiento:</label>
            <input
              className="matriculacion-input"
              type="date"
              name="f_nacimiento"
              value={form.f_nacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="matriculacion-field">
            <label className="matriculacion-label">Nivel:</label>
            <select
              className="matriculacion-input"
              name="nivel"
              value={form.nivel}
              onChange={handleChange}
            >
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>

          <div className="matriculacion-field">
            <label className="matriculacion-label">Curso:</label>
            <select
              className="matriculacion-input"
              name="id_curso"
              value={form.id_curso}
              onChange={handleChange}
              required
            >
              <option value="">-- Selecciona un curso --</option>
              {cursos.map((c) => (
                <option key={c.id_curso} value={c.id_curso}>
                  {c.nombre}
                  {c.precio != null ? ` — ${c.precio} €` : ""}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="matriculacion-error">{error}</p>}
          {exito && <p className="matriculacion-exito">{exito}</p>}

          <button
            type="submit"
            className="matriculacion-btn"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Matricularme"}
          </button>
        </form>

        <span className="matriculacion-login-link">
          ¿Ya estás matriculado?{" "}
          <a onClick={() => navigate("/login")}>Iniciar sesión</a>
        </span>
      </div>
    </div>
  );
};

export default MatriculacionForm;
