import React, { useState } from "react";
import "../../../style/Invitado/Contacto/Formulario.css";

const Formulario: React.FC = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    privacidad: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.");
    setForm({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "", privacidad: false });
  };

  return (
    <div className="contacto-body">
      <div className="contacto-body-inner">

        {/* ── Formulario ── */}
        <div className="contacto-form-wrap">
          <h2 className="contacto-form-titulo">Formulario de contacto</h2>

          <form className="contacto-form" onSubmit={handleSubmit}>

            <div className="contacto-field">
              <label className="contacto-label">Nombre completo *</label>
              <input
                className="contacto-input"
                type="text"
                name="nombre"
                placeholder="Juan Perez García"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contacto-field">
              <label className="contacto-label">Correo electrónico *</label>
              <input
                className="contacto-input"
                type="email"
                name="email"
                placeholder="juan@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contacto-field">
              <label className="contacto-label">Teléfono (opcional)</label>
              <input
                className="contacto-input"
                type="tel"
                name="telefono"
                placeholder="123456789"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="contacto-field">
              <label className="contacto-label">Asunto *</label>
              <select
                className="contacto-select"
                name="asunto"
                value={form.asunto}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona el asunto</option>
                <option value="Información clases">Información clases</option>
                <option value="Inscripción">Inscripción</option>
                <option value="Horarios">Horarios</option>
                <option value="Precios">Precios</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="contacto-field">
              <label className="contacto-label">Mensaje *</label>
              <textarea
                className="contacto-textarea"
                name="mensaje"
                placeholder="Escribe aquí tu consulta ..."
                value={form.mensaje}
                onChange={handleChange}
                required
              />
            </div>

            <label className="contacto-privacidad">
              <input
                type="checkbox"
                name="privacidad"
                checked={form.privacidad}
                onChange={handleChange}
                required
              />
              Acepto la <a>política de privacidad</a> *
            </label>

            <button type="submit" className="contacto-btn-enviar">
              Enviar Mensaje
            </button>

          </form>
        </div>

        {/* ── Info lateral ── */}
        <div className="contacto-info">

          <div className="contacto-info-card">
            <div className="contacto-info-item">
              <span className="contacto-info-titulo">📍 Dirección</span>
              <p className="contacto-info-texto">C/ Juan Agustín Palomar, 10<br />41900 Camas (Sevilla)</p>
            </div>
            <div className="contacto-info-item">
              <span className="contacto-info-titulo">📞 Teléfono</span>
              <a className="contacto-info-link" href="tel:955123456">955 123 456</a>
            </div>
            <div className="contacto-info-item">
              <span className="contacto-info-titulo">✉️ Email</span>
              <a className="contacto-info-link" href="mailto:infoKarateKatashi@gmail.com">infoKarateKatashi@gmail.com</a>
            </div>
            <div className="contacto-info-item">
              <span className="contacto-info-titulo">🕐 Horario de atención</span>
              <p className="contacto-info-texto">Lunes a Viernes<br />17:00 - 21:00</p>
            </div>
          </div>

          {/* Mapa */}
          <div className="contacto-mapa-wrap">
            <iframe
              className="contacto-mapa-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.1!2d-6.0423!3d37.3896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDIzJzIyLjYiTiA2wrAwMicxMi4zIlc!5e0!3m2!1ses!2ses!4v1234567890"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Escuela Katashi"
            />
            <div className="contacto-mapa-label">
              📍 Escuela de Karate Camas - Camas, Sevilla
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Formulario;