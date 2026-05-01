import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Registro/Registroform.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const RegistroForm: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre:    "",
    apellido:  "",
    email:     "",
    password:  "",
    confirmar: "",
    terminos:  false,
  });

  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!form.terminos) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:   form.nombre,
          apellido: form.apellido,
          email:    form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.status === 404) {
        // No está en la escuela → matriculación
        navigate("/matriculacion");
        return;
      }

      if (!res.ok) {
        setError(data.error || "Error al crear la cuenta");
        setLoading(false);
        return;
      }

      // Éxito → guardar usuario y redirigir
      localStorage.setItem("usuario", JSON.stringify(data));
      navigate("/usuario");

    } catch {
      setError("Error de conexión. Inténtalo más tarde.");
      setLoading(false);
    }
  };

  return (
    <div className="registro-body">
      <div className="registro-inner">

        {/* Formulario */}
        <form onSubmit={handleSubmit}>

          <div className="registro-field">
            <label className="registro-label">Nombre:</label>
            <input
              className="registro-input"
              type="text"
              name="nombre"
              placeholder="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="registro-field">
            <label className="registro-label">Apellidos:</label>
            <input
              className="registro-input"
              type="text"
              name="apellido"
              placeholder="apellidos"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="registro-field">
            <label className="registro-label">Email:</label>
            <input
              className="registro-input"
              type="email"
              name="email"
              placeholder="email@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="registro-field">
            <label className="registro-label">Contraseña:</label>
            <input
              className="registro-input"
              type="password"
              name="password"
              placeholder="••••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="registro-field">
            <label className="registro-label">Confirme Contraseña:</label>
            <input
              className="registro-input"
              type="password"
              name="confirmar"
              placeholder="••••••••••"
              value={form.confirmar}
              onChange={handleChange}
              required
            />
          </div>

          <label className="registro-terminos">
            <input
              type="checkbox"
              name="terminos"
              checked={form.terminos}
              onChange={handleChange}
            />
            Acepto los términos y condiciones
          </label>

          <span className="registro-login-link">
            ¿Ya tienes cuenta? <a onClick={() => navigate("/login")}>Iniciar sesión</a>
          </span>

          {error && <p className="registro-error">{error}</p>}

          <button type="submit" className="registro-btn" disabled={loading}>
            {loading ? "Comprobando..." : "Comprobar"}
          </button>

        </form>

        {/* Imagen lateral */}
        <div className="registro-imagen">
          <img
            src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80"
            alt="Karateka"
          />
        </div>

      </div>
    </div>
  );
};

export default RegistroForm;