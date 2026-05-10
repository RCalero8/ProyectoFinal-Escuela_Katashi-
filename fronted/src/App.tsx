import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

// Estructura de Invitado
import { Header } from "./components/Header/Header.tsx";
import { Footer } from "./components/Footer/Footer.tsx";

// Estructura de Usuario (Segundo Header y Footer Oscuro)
import HeaderUsuario from "./components/Header/usuario/Header"; 
// Asegúrate de importar el Footer oscuro que creamos anteriormente
import { Footer as FooterUsuario } from "./components/Footer/Footer.tsx"; 

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

const PanelAdmin = () => <div style={{padding: '100px'}}><h1>Panel de Administrador</h1></div>;

// --- COMPONENTE DE RUTA PROTEGIDA ---
const RutaProtegida = ({ tipo, children }: { tipo: string, children: React.ReactNode }) => {
  const userJson = localStorage.getItem('usuario');
  const usuario = userJson ? JSON.parse(userJson) : null;
  return usuario?.tipo_usuario === tipo ? children : <Navigate to="/login" replace />;
};

// --- LAYOUTS PARA DIFERENCIAR HEADERS/FOOTERS ---

// Diseño para Invitados
const InvitadoLayout = () => (
  <>
    <Header />
    <main><Outlet /></main>
    <Footer />
  </>
);

// Diseño para Usuarios (EL SEGUNDO HEADER)
const UsuarioLayout = () => (
  <>
    <HeaderUsuario />
    <main><Outlet /></main>
    <FooterUsuario /> 
  </>
);

function AppRoutes() {
  return (
    <Routes>
      {/* === GRUPO 1: RUTAS PÚBLICAS (Usa Header 1) === */}
      <Route element={<InvitadoLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/noticias/:slug" element={<NoticiaDetalle />} />
        <Route path="/tienda/:id" element={<DetalleProducto />} />
      </Route>

      {/* === GRUPO 2: AUTH (Sin Header/Footer) === */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* === GRUPO 3: RUTAS DE USUARIO (Usa Header 2 / PRIVADO) === */}
      <Route 
        path="/usuario" 
        element={
          <RutaProtegida tipo="CLIENTE">
            <UsuarioLayout />
          </RutaProtegida>
        }
      >
        <Route index element={<InicioUsuario />} />
        <Route path="clases" element={<Mis_clases />} />
        {/* Reutilizamos los componentes compartidos con el Header 2 */}
        <Route path="noticias" element={<Noticias />} />
        <Route path="noticias/:slug" element={<NoticiaDetalle />} />
        <Route path="tienda" element={<Tienda />} />
        <Route path="tienda/:id" element={<DetalleProducto />} />
      </Route>

      {/* === GRUPO 4: ADMIN === */}
      <Route 
        path="/admin" 
        element={
          <RutaProtegida tipo="ADMINISTRADOR">
            <PanelAdmin />
          </RutaProtegida>
        } 
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;