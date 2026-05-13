import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Admin/Inicio_admin.css";
;

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const Inicio_admin: React.FC = () => {
  const usuario  = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [stats, setStats] = useState({
    totalAlumnos: 0,
    pagosPendientes: 0,
    clasesHoy: 0,
    totalIngresos: 0,
  });

  const [ultimosPagos, setUltimosPagos]   = useState<any[]>([]);
  const [ultimosAlumnos, setUltimosAlumnos] = useState<any[]>([]);

  useEffect(() => {
    // Alumnos
    fetch(`${API_URL}/api/admin/alumnos`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStats(s => ({ ...s, totalAlumnos: data.length }));
          setUltimosAlumnos(data.slice(0, 5));
        }
      }).catch(() => {});

    // Pagos
    fetch(`${API_URL}/api/admin/pagos`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const pendientes = data.filter((p: any) => p.estado === 'PENDIENTE').length;
          const ingresos   = data.filter((p: any) => p.estado === 'COMPLETADO')
                                 .reduce((acc: number, p: any) => acc + Number(p.precio), 0);
          setStats(s => ({ ...s, pagosPendientes: pendientes, totalIngresos: ingresos }));
          setUltimosPagos(data.slice(0, 5));
        }
      }).catch(() => {});

    // Horarios de hoy
    const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    const diaHoy = dias[new Date().getDay()];
    fetch(`${API_URL}/api/admin/horarios`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const hoy = data.filter((h: any) => h.dia === diaHoy).length;
          setStats(s => ({ ...s, clasesHoy: hoy }));
        }
      }).catch(() => {});
  }, []);

  const accesos = [
    { emoji: "👥", texto: "Gestionar Alumnos",   ruta: "/admin/alumnos" },
    { emoji: "📅", texto: "Gestionar Horarios",  ruta: "/admin/horarios" },
    { emoji: "💰", texto: "Gestionar Pagos",     ruta: "/admin/pagos" },
    { emoji: "✅", texto: "Pasar Lista",          ruta: "/admin/asistencia" },
    { emoji: "📰", texto: "Gestionar Noticias",  ruta: "/admin/noticias" },
    { emoji: "🛍️", texto: "Gestionar Tienda",    ruta: "/admin/tienda" },
    { emoji: "🏅", texto: "Federación",           ruta: "/admin/federacion" },
    { emoji: "📊", texto: "Informes",             ruta: "/admin/informes" },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-inner">

        {/* Bienvenida */}
        <div className="dashboard-bienvenida">
          <h1>👋 Bienvenido, {usuario.nombre}</h1>
          <p>Panel de administración — {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <span className="dashboard-stat-emoji">👥</span>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-numero">{stats.totalAlumnos}</span>
              <span className="dashboard-stat-label">Alumnos activos</span>
            </div>
          </div>
          <div className="dashboard-stat">
            <span className="dashboard-stat-emoji">💰</span>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-numero">{stats.pagosPendientes}</span>
              <span className="dashboard-stat-label">Pagos pendientes</span>
              <span className="dashboard-stat-sub">Requieren atención</span>
            </div>
          </div>
          <div className="dashboard-stat">
            <span className="dashboard-stat-emoji">📅</span>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-numero">{stats.clasesHoy}</span>
              <span className="dashboard-stat-label">Clases hoy</span>
            </div>
          </div>
          <div className="dashboard-stat">
            <span className="dashboard-stat-emoji">📈</span>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-numero">{stats.totalIngresos.toFixed(0)}€</span>
              <span className="dashboard-stat-label">Ingresos totales</span>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="dashboard-grid">

          {/* Últimos pagos */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-titulo">💰 Últimos pagos</h3>
              <Link to="/admin/pagos" className="dashboard-card-link">Ver todos →</Link>
            </div>
            <div className="dashboard-card-body">
              <table className="dashboard-tabla">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Tipo</th>
                    <th>Importe</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimosPagos.length === 0 ? (
                    <tr><td colSpan={4} style={{textAlign:"center", color:"#9ca3af"}}>Sin datos</td></tr>
                  ) : (
                    ultimosPagos.map((p: any) => (
                      <tr key={p.id_pago}>
                        <td>{p.nombre} {p.apellido}</td>
                        <td>{p.tipo}</td>
                        <td>{p.precio}€</td>
                        <td>
                          <span className={`dashboard-badge ${p.estado === 'COMPLETADO' ? 'pagado' : 'pendiente'}`}>
                            {p.estado === 'COMPLETADO' ? 'Pagado' : 'Pendiente'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Últimos alumnos */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3 className="dashboard-card-titulo">👥 Alumnos recientes</h3>
              <Link to="/admin/alumnos" className="dashboard-card-link">Ver todos →</Link>
            </div>
            <div className="dashboard-card-body">
              <table className="dashboard-tabla">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Nivel</th>
                    <th>DNI</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimosAlumnos.length === 0 ? (
                    <tr><td colSpan={3} style={{textAlign:"center", color:"#9ca3af"}}>Sin datos</td></tr>
                  ) : (
                    ultimosAlumnos.map((a: any) => (
                      <tr key={a.id_alumno}>
                        <td>{a.nombre} {a.apellido}</td>
                        <td><span className="dashboard-badge activo">{a.nivel}</span></td>
                        <td>{a.dni}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Accesos rápidos */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-titulo">⚡ Accesos rápidos</h3>
          </div>
          <div className="dashboard-card-body">
            <div className="dashboard-accesos">
              {accesos.map(a => (
                <Link to={a.ruta} className="dashboard-acceso" key={a.ruta}>
                  <span className="dashboard-acceso-emoji">{a.emoji}</span>
                  <span className="dashboard-acceso-texto">{a.texto}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Inicio_admin;
