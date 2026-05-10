import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Componentes de Estructura
import { Header } from "./components/Header/Header.tsx";
import { Footer } from "./components/Footer/Footer.tsx";
// Supongo que crearás estos para la parte privada:
// import { HeaderUsuario } from "./components/Header/HeaderUsuario.tsx"; 
// import { FooterUsuario } from "./components/Footer/FooterUsuario.tsx"; 

// Páginas Invitado
import Login from "./pages/Login.tsx";
import Registro from "./pages/Registro.tsx";
import Inicio from "./pages/Invitado/Inicio.tsx";
import Conocenos from "./pages/Invitado/Conocenos.tsx";
import Clases from "./pages/Invitado/Clases.tsx";
import Noticias from "./pages/Invitado/Noticias.tsx";
import Tienda from "./pages/Invitado/Tienda.tsx";
import Contacto from "./pages/Invitado/Contacto.tsx";
import NoticiaDetalle from "./components/Invitado/Noticias/NoticiaDetalle.tsx";
import DetalleProducto from "./components/Invitado/Tiendas/Detalleproducto.tsx";

// Páginas Usuario
import InicioUsuario from "./pages/Usuario/Inicio.tsx";
import Mis_clases from "./pages/Usuario/Mis_Clases.tsx";

// Componentes temporales
const PanelAdmin = () => <div style={{padding: '100px'}}><h1>Panel de Administrador</h1></div>;

// --- COMPONENTE DE RUTA PROTEGIDA ---
const RutaProtegida = ({ tipo, children }: { tipo: string, children: React.ReactNode }) => {
  const userJson = localStorage.getItem('usuario');
  const usuario = userJson ? JSON.parse(userJson) : null;
  
  if (!usuario || usuario.tipo_usuario !== tipo) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// --- COMPONENTE DE LAYOUT ---
// Aquí es donde sucede la magia de cambiar Headers/Footers
function LayoutPrincipal() {
  const location = useLocation();
  
  // Definimos qué tipo de página es según la URL
  const esRutaUsuario = location.pathname.startsWith("/usuario");
  const esRutaAdmin = location.pathname.startsWith("/admin");
  const esAuth = ["/login", "/registro"].includes(location.pathname);

  // Renderizado del Header
  const renderHeader = () => {
    if (esAuth || esRutaAdmin) return null;
    if (esRutaUsuario) return <Header />; // Aquí pondrías <HeaderUsuario /> cuando lo tengas
    return <Header />;
  };

  // Renderizado del Footer
  const renderFooter = () => {
    if (esAuth || esRutaAdmin) return null;
    if (esRutaUsuario) return <Footer />; // Aquí pondrías tu Footer oscuro de usuario
    return <Footer />;
  };

  return (
    <>
      {renderHeader()}
      <main>
        <Routes>
          {/* === RUTAS PÚBLICAS (Invitado) === */}
          <Route path="/" element={<Inicio />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/noticias/:slug" element={<NoticiaDetalle />} />
          <Route path="/tienda/:id" element={<DetalleProducto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* === RUTAS PRIVADAS (Usuario/Alumno) === */}
          {/* Reutilizamos los mismos componentes (Noticias, Tienda) pero bajo la URL /usuario */}
          <Route path="/usuario" element={
            <RutaProtegida tipo="CLIENTE"><InicioUsuario /></RutaProtegida>
          } />
          <Route path="/usuario/clases" element={
            <RutaProtegida tipo="CLIENTE"><Mis_clases /></RutaProtegida>
          } />
          <Route path="/usuario/noticias" element={
            <RutaProtegida tipo="CLIENTE"><Noticias /></RutaProtegida>
          } />
          <Route path="/usuario/noticias/:slug" element={
            <RutaProtegida tipo="CLIENTE"><NoticiaDetalle /></RutaProtegida>
          } />
          <Route path="/usuario/tienda" element={
            <RutaProtegida tipo="CLIENTE"><Tienda /></RutaProtegida>
          } />
          <Route path="/usuario/tienda/:id" element={
            <RutaProtegida tipo="CLIENTE"><DetalleProducto /></RutaProtegida>
          } />

          {/* === RUTAS ADMIN === */}
          <Route path="/admin" element={
            <RutaProtegida tipo="ADMINISTRADOR"><PanelAdmin /></RutaProtegida>
          } />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {renderFooter()}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutPrincipal />
    </Router>
  );
}

export default App;