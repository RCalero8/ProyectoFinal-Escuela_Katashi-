import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Registro/Matriculacion.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const CLAUSULAS = `
Primera. Que es deseo de ambas partes firmar el presente acuerdo.

Segunda. Que conoce los fines y las directrices de SHURI-TE y está de acuerdo con ellos y con los medios utilizados para llevar la actividad de Karate.

Tercera. Que se compromete a realizarla con responsabilidad y regularidad; avisando a SHURI-TE con la antelación suficiente en el caso de que surgiera alguna dificultad imprevista.

Cuarta. Que podrá cesar la actividad cuando lo desee, debiendo ponerlo en conocimiento de SHURI-TE con 1 mes de antelación, debiendo satisfacer todas las cuotas pendientes.

Quinta. Que igualmente, acepta que, en el supuesto de que sus servicios no sean satisfactorios, esta podrá prescindir de los mismos notificándolo con 1 mes de antelación.

Sexta. El curso inicia el día 14 del mes de septiembre de 2026 y finaliza el mes de junio de 2027. Las clases se impartirán ajustándose al calendario escolar, no impartiéndose en días no lectivos, festivos y puentes.

Séptima. Los entrenamientos serán PRESENCIALES y se realizarán en modalidad DEPORTE FEDERADO, por lo que todos los alumnos DEBERÁN ESTAR OBLIGATORIAMENTE FEDERADOS.

Octava. Existirán los siguientes uniformes: UNIFORME OFICIAL SHURI-TE (chaqueta, pantalón y cinturón) y UNIFORME DE VERANO. No estará permitido el uso de materiales no facilitados por SHURI-TE.

Undécima. Los pagos se realizarán dentro de los 5 primeros días de cada mes, siendo el método de pago DOMICILIACIÓN/TRANSFERENCIA BANCARIA o PRESENCIAL.

Duodécima. Está terminantemente prohibida la grabación, reproducción o publicación del contenido de este curso a terceros.
`;

const Matriculacion: React.FC = () => {
  const navigate  = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [esMayor, setEsMayor]       = useState<boolean | null>(null);
  const [metodoPago, setMetodoPago] = useState<"Tarjeta" | "Metálico" | "">("");
  const [autoriza, setAutoriza]     = useState<string>("");
  const [tarjeta, setTarjeta]       = useState({ titular: "", numero: "", caducidad: "", cvv: "" });
  const [enviando, setEnviando]     = useState(false);

  // Datos alumno
  const [alumno, setAlumno] = useState({
    nombre: "", apellido: "", dni: "", fecha_nacimiento: "",
    domicilio: "", telefono: "", email: "",
    lesiones: "", enfermedades: "", otros: "",
  });

  // Datos tutor (solo menor)
  const [tutor, setTutor] = useState({
    nombre: "", apellido: "", dni: "", fecha_nacimiento: "",
    domicilio: "", email: "", telefono: "", telefono_fijo: "",
  });

  // Datos cuenta (registro web)
  const [cuenta, setCuenta] = useState({
    email: "", password: "", confirmar: "",
  });

  // Fecha
  const hoy = new Date();
  const [dia]  = useState(String(hoy.getDate()));
  const [mes]  = useState(hoy.toLocaleString("es-ES", { month: "long" }));
  const [año]  = useState(String(hoy.getFullYear()).slice(2));

  // Canvas firma
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let dibujando = false;

    const start = (e: MouseEvent | TouchEvent) => {
      dibujando = true;
      ctx.beginPath();
      const rect = canvas.getBoundingClientRect();
      const x = "touches" in e ? e.touches[0].clientX - rect.left : (e as MouseEvent).offsetX;
      const y = "touches" in e ? e.touches[0].clientY - rect.top  : (e as MouseEvent).offsetY;
      ctx.moveTo(x, y);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!dibujando) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = "touches" in e ? e.touches[0].clientX - rect.left : (e as MouseEvent).offsetX;
      const y = "touches" in e ? e.touches[0].clientY - rect.top  : (e as MouseEvent).offsetY;
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stop = () => { dibujando = false; };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("touchstart", start as any, { passive: false });
    canvas.addEventListener("touchmove", draw as any, { passive: false });
    canvas.addEventListener("touchend", stop);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stop);
    };
  }, [esMayor]);

  const limpiarFirma = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!metodoPago) { alert("Selecciona un método de pago"); return; }
    if (!autoriza)   { alert("Indica si autorizas el uso de imágenes"); return; }
    if (cuenta.password !== cuenta.confirmar) { alert("Las contraseñas no coinciden"); return; }

    const firma = canvasRef.current?.toDataURL("image/png") || "";

    setEnviando(true);

    try {
      // 1. Crear usuario en la BD
      const resRegistro = await fetch(`${API_URL}/api/matriculacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alumno,
          tutor: esMayor ? null : tutor,
          es_mayor: esMayor,
          metodo_pago: metodoPago,
          autoriza_imagenes: autoriza === "si",
          firma,
          cuenta: {
            nombre:   esMayor ? alumno.nombre    : tutor.nombre,
            apellido: esMayor ? alumno.apellido  : tutor.apellido,
            email:    esMayor ? alumno.email     : tutor.email,
            password: cuenta.password,
          },
        }),
      });

      const data = await resRegistro.json();

      if (!resRegistro.ok) {
        alert(data.error || "Error al enviar la matrícula");
        setEnviando(false);
        return;
      }

      // 2. Guardar usuario en localStorage y redirigir
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      alert("✅ Matrícula enviada correctamente. ¡Bienvenido a la escuela!");
      window.location.href = "/usuario";

    } catch {
      alert("Error de conexión. Inténtalo más tarde.");
      setEnviando(false);
    }
  };

  return (
    <div className="matriculacion-section">

      {/* Hero */}
      <div className="matriculacion-hero">
        <img src="/Imagenes_Invitado/Logo.png" alt="Logo Katashi" />
        <h1>Inscripción Online — Temporada 2026/27</h1>
        <p>Escuela de Karate Katashi · Camas, Sevilla</p>
      </div>

      <div className="matriculacion-inner">
        <form onSubmit={handleEnviar}>

          {/* Selector mayor/menor */}
          <div className="matriculacion-selector">
            <h3>¿El/la alumno/a es mayor de edad?</h3>
            <div className="matriculacion-radio-group">
              <label className={`matriculacion-radio-btn ${esMayor === true ? "seleccionado" : ""}`}
                onClick={() => setEsMayor(true)}>
                <input type="radio" name="es_mayor" />
                🧑 Sí, soy mayor de edad
              </label>
              <label className={`matriculacion-radio-btn ${esMayor === false ? "seleccionado" : ""}`}
                onClick={() => setEsMayor(false)}>
                <input type="radio" name="es_mayor" />
                👦 No, soy menor de edad
              </label>
            </div>
          </div>

          {esMayor !== null && (
            <>
              {/* Datos alumno */}
              <div className="matriculacion-card">
                <div className="matriculacion-card-header">
                  <p className="matriculacion-card-titulo">
                    {esMayor ? "Datos del Solicitante (Alumno/a)" : "Datos del Alumno/a"}
                  </p>
                </div>
                <div className="matriculacion-card-body">
                  <div className="matriculacion-form-grid">
                    {[
                      ["Nombre", "nombre", "text"],
                      ["Apellidos", "apellido", "text"],
                      ["DNI", "dni", "text"],
                      ["Fecha de nacimiento", "fecha_nacimiento", "date"],
                      ["Domicilio", "domicilio", "text"],
                      ["Teléfono", "telefono", "text"],
                      ...(esMayor ? [["Email", "email", "email"]] : []),
                      ["Lesiones (opcional)", "lesiones", "text"],
                      ["Enfermedades (opcional)", "enfermedades", "text"],
                      ["Otros (opcional)", "otros", "text"],
                    ].map(([label, key, type]) => (
                      <div className="matriculacion-field" key={key}>
                        <label className="matriculacion-label">{label}</label>
                        <input className="matriculacion-input" type={type}
                          value={(alumno as any)[key] || ""}
                          onChange={e => setAlumno({...alumno, [key]: e.target.value})}
                          required={!["lesiones","enfermedades","otros"].includes(key)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Datos tutor (menor) */}
              {!esMayor && (
                <div className="matriculacion-card">
                  <div className="matriculacion-card-header">
                    <p className="matriculacion-card-titulo">Datos del Padre/Madre/Tutor Legal</p>
                  </div>
                  <div className="matriculacion-card-body">
                    <div className="matriculacion-form-grid">
                      {[
                        ["Nombre", "nombre"], ["Apellidos", "apellido"],
                        ["DNI", "dni"], ["Fecha de nacimiento", "fecha_nacimiento"],
                        ["Domicilio", "domicilio"], ["Email", "email"],
                        ["Teléfono móvil", "telefono"], ["Teléfono fijo (opcional)", "telefono_fijo"],
                      ].map(([label, key]) => (
                        <div className="matriculacion-field" key={key}>
                          <label className="matriculacion-label">{label}</label>
                          <input className="matriculacion-input"
                            type={key === "email" ? "email" : "text"}
                            value={(tutor as any)[key] || ""}
                            onChange={e => setTutor({...tutor, [key]: e.target.value})}
                            required={key !== "telefono_fijo"} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Cláusulas contrato */}
              <div className="matriculacion-card">
                <div className="matriculacion-card-header">
                  <p className="matriculacion-card-titulo">Cláusulas del Contrato</p>
                </div>
                <div className="matriculacion-card-body">
                  <div className="matriculacion-contrato">
                    {CLAUSULAS.trim().split("\n\n").map((p, i) => (
                      <p key={i}><strong>{p.split(".")[0]}.</strong>{p.substring(p.indexOf(".")+1)}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Autorización imágenes */}
              <div className="matriculacion-card">
                <div className="matriculacion-card-header">
                  <p className="matriculacion-card-titulo">Autorización para publicación de imágenes</p>
                </div>
                <div className="matriculacion-card-body">
                  <p style={{fontSize:13, color:"#374151", marginBottom:12}}>
                    La dirección del centro solicita consentimiento para publicar imágenes en las que
                    aparezcan alumnos en actividades de la escuela (web, redes sociales, filmaciones).
                  </p>
                  <div className="matriculacion-autorizacion">
                    <label>
                      <input type="radio" name="autoriza" value="si"
                        onChange={() => setAutoriza("si")} required /> ✅ Sí autorizo
                    </label>
                    <label>
                      <input type="radio" name="autoriza" value="no"
                        onChange={() => setAutoriza("no")} required /> ❌ No autorizo
                    </label>
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="matriculacion-card">
                <div className="matriculacion-card-header">
                  <p className="matriculacion-card-titulo">Método de pago de cuotas</p>
                </div>
                <div className="matriculacion-card-body">
                  <p style={{fontSize:13, color:"#6b7280", marginBottom:8}}>
                    Los pagos se realizarán dentro de los 5 primeros días de cada mes.
                  </p>
                  <div className="matriculacion-pago-options">
                    <div
                      className={`matriculacion-pago-btn ${metodoPago === "Tarjeta" ? "seleccionado" : ""}`}
                      onClick={() => setMetodoPago("Tarjeta")}>
                      <span>💳</span>
                      <span>Domiciliación / Tarjeta</span>
                    </div>
                    <div
                      className={`matriculacion-pago-btn ${metodoPago === "Metálico" ? "seleccionado" : ""}`}
                      onClick={() => setMetodoPago("Metálico")}>
                      <span>💵</span>
                      <span>Presencial / Metálico</span>
                    </div>
                  </div>

                  {/* Formulario tarjeta */}
                  {metodoPago === "Tarjeta" && (
                    <div className="matriculacion-tarjeta-form">
                      <p className="matriculacion-tarjeta-titulo">💳 Datos de la tarjeta</p>
                      <div className="matriculacion-form-grid">
                        <div className="matriculacion-field full">
                          <label className="matriculacion-label">Nombre del titular</label>
                          <input className="matriculacion-input" placeholder="Juan Pérez García"
                            value={tarjeta.titular} onChange={e => setTarjeta({...tarjeta, titular: e.target.value})} required />
                        </div>
                        <div className="matriculacion-field full">
                          <label className="matriculacion-label">Número de tarjeta</label>
                          <input className="matriculacion-input" placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            value={tarjeta.numero}
                            onChange={e => {
                              const val = e.target.value.replace(/\D/g,"").slice(0,16);
                              const fmt = val.match(/.{1,4}/g)?.join(" ") || val;
                              setTarjeta({...tarjeta, numero: fmt});
                            }} required />
                        </div>
                        <div className="matriculacion-field">
                          <label className="matriculacion-label">Fecha de caducidad</label>
                          <input className="matriculacion-input" placeholder="MM/AA"
                            maxLength={5}
                            value={tarjeta.caducidad}
                            onChange={e => {
                              const val = e.target.value.replace(/\D/g,"").slice(0,4);
                              const fmt = val.length > 2 ? val.slice(0,2)+"/"+val.slice(2) : val;
                              setTarjeta({...tarjeta, caducidad: fmt});
                            }} required />
                        </div>
                        <div className="matriculacion-field">
                          <label className="matriculacion-label">CVV</label>
                          <input className="matriculacion-input" placeholder="123" type="password"
                            maxLength={3}
                            value={tarjeta.cvv}
                            onChange={e => setTarjeta({...tarjeta, cvv: e.target.value.replace(/\D/g,"").slice(0,3)})} required />
                        </div>
                      </div>
                      <p className="matriculacion-tarjeta-aviso">
                        🔒 Tus datos están protegidos. No almacenamos el número completo de tu tarjeta.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cuenta web */}
              <div className="matriculacion-card">
                <div className="matriculacion-card-header">
                  <p className="matriculacion-card-titulo">Crear cuenta en la web</p>
                </div>
                <div className="matriculacion-card-body">
                  <p style={{fontSize:13, color:"#6b7280", marginBottom:14}}>
                    Crea tu acceso al panel personal para consultar clases, pagos y noticias.
                  </p>
                  <div className="matriculacion-form-grid">
                    <div className="matriculacion-field full">
                      <label className="matriculacion-label">Email de acceso</label>
                      <input className="matriculacion-input" type="email"
                        value={cuenta.email}
                        onChange={e => setCuenta({...cuenta, email: e.target.value})} required />
                    </div>
                    <div className="matriculacion-field">
                      <label className="matriculacion-label">Contraseña</label>
                      <input className="matriculacion-input" type="password"
                        value={cuenta.password}
                        onChange={e => setCuenta({...cuenta, password: e.target.value})} required />
                    </div>
                    <div className="matriculacion-field">
                      <label className="matriculacion-label">Confirmar contraseña</label>
                      <input className="matriculacion-input" type="password"
                        value={cuenta.confirmar}
                        onChange={e => setCuenta({...cuenta, confirmar: e.target.value})} required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Firma */}
              <div className="matriculacion-card">
                <div className="matriculacion-card-header">
                  <p className="matriculacion-card-titulo">
                    {esMayor ? "Firma del alumno/a" : "Firma del padre/madre/tutor"}
                  </p>
                </div>
                <div className="matriculacion-card-body">
                  <div className="matriculacion-firma-wrap">
                    <canvas ref={canvasRef} className="matriculacion-canvas" width={500} height={150} />
                    <button type="button" className="matriculacion-btn-limpiar" onClick={limpiarFirma}>
                      Limpiar firma
                    </button>
                  </div>
                  <div className="matriculacion-fecha">
                    En Camas, a {dia} de {mes} de 20{año}
                  </div>
                </div>
              </div>

              {/* Enviar */}
              <button type="submit" className="matriculacion-btn-enviar" disabled={enviando}>
                {enviando ? "Enviando matrícula..." : "📋 Enviar Inscripción"}
              </button>
            </>
          )}

        </form>
      </div>
    </div>
  );
};

export default Matriculacion;