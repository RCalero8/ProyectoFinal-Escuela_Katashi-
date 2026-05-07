import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header/Header.tsx";
import { Footer } from "./components/Footer/Footer.tsx";

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

//Usuarios
import InicioUsuario from "./pages/Usuario/Inicio.tsx";
import Mis_clases from "./pages/Usuario/Mis_Clases.tsx"
const PanelAdmin = () => <div style={{padding: '100px'}}><h1>Panel de Administrador</h1></div>;

// Componente de ruta protegida
const RutaProtegida = ({ tipo, children }: { tipo: string, children: React.ReactNode }) => {
  const userJson = localStorage.getItem('usuario');
  const usuario = userJson ? JSON.parse(userJson) : null;
  return usuario?.tipo_usuario === tipo ? children : <Navigate to="/login" replace />;
};

const RUTAS_SIN_HEADER = ["/usuario", "/admin", "/login", "/registro"];

function Layout() {
  const location = useLocation();
  const ocultarHeader = RUTAS_SIN_HEADER.some(r => location.pathname.startsWith(r));

  return (
    <>
      {!ocultarHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/noticias/:slug" element={<NoticiaDetalle />} />
          <Route path="/tienda/:id" element={<DetalleProducto />} />

          {/*Usuarios*/}
          <Route path="/usuario" element={
            <RutaProtegida tipo="CLIENTE">
              <InicioUsuario />
            </RutaProtegida>
          } />
          <Route path="/usuario/clases" element={
            <RutaProtegida tipo="CLIENTE">
              <Mis_clases />
            </RutaProtegida>
          } />

          <Route path="/admin" element={
            <RutaProtegida tipo="ADMINISTRADOR">
              <PanelAdmin />
            </RutaProtegida>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!ocultarHeader && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
