import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header/Header.tsx";
import HeaderUsuario from "./components/Header/usuario/Header.tsx";
import { Footer } from "./components/Footer/Footer.tsx";
import { Footer as FooterUsuario } from "./components/Footer/Usuario/Footer.tsx";

import Login from "./pages/Login.tsx";
import Registro from "./pages/Registro.tsx";
import Matriculacion from "./pages/Matriculacion";

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
import Noticias_usuario from "./pages/Usuario/Noticias_usuario.tsx";
import Carrito from "./pages/Usuario/Carrito.tsx";
import DetalleNoticia from "./components/Usuario/Noticias/NoticiaDetalle-usu.tsx";
import Pagos from "./pages/Usuario/Pagos.tsx";
import Federacion from "./pages/Usuario/Federacion.tsx"

//Administración
import InicioAdmin from "./pages/Admin/Inicio_admin.tsx";
import AlumnosAdmin from "./pages/Admin/Alumnos_admin.tsx";
import PagosAdmin from "./pages/Admin/Pagos_admin.tsx";
import HorariosAdmin from "./pages/Admin/Horarios_admin.tsx";
import AsistenciaAdmin from "./pages/Admin/Asistencias_admin.tsx";
import TiendaAdmin from "./pages/Admin/Tienda_admin.tsx";
import NoticiasAdmin from "./pages/Admin/Noticias_admin.tsx";

// Componente de ruta protegida
const RutaProtegida = ({ tipo, children }: { tipo: string, children: React.ReactNode }) => {
  const userJson = localStorage.getItem('usuario');
  const usuario = userJson ? JSON.parse(userJson) : null;
  return usuario?.tipo_usuario === tipo ? children : <Navigate to="/login" replace />;
};

const RUTAS_SIN_HEADER = ["/admin", "/login", "/registro", "/matriculacion"];

function Layout() {
  const location = useLocation();
  const ocultarHeader = RUTAS_SIN_HEADER.some(r => location.pathname.startsWith(r));

  const mostrarHeaderUsuario = location.pathname.startsWith("/usuario");

  return (
    <>
      {!ocultarHeader && !mostrarHeaderUsuario && <Header />}
      {mostrarHeaderUsuario && <HeaderUsuario />}
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
          <Route path="/matriculacion" element={<Matriculacion />} />
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

          <Route path="/usuario/noticias" element={
            <RutaProtegida tipo="CLIENTE">
              <Noticias_usuario />
            </RutaProtegida>
          } />

          <Route path="/usuario/noticias/:slug" element={
            <RutaProtegida tipo="CLIENTE">
              <DetalleNoticia/>
            </RutaProtegida>
          } />

          <Route path="/usuario/tienda" element={
            <RutaProtegida tipo="CLIENTE">
              <Tienda/>
            </RutaProtegida>
          } />
          <Route path="/usuario/tienda/:id" element={
            <RutaProtegida tipo="CLIENTE">
              <DetalleProducto/>
            </RutaProtegida>
          } />
          <Route path="/usuario/carrito" element={
            <RutaProtegida tipo="CLIENTE">
              <Carrito />
            </RutaProtegida>
          } />

          <Route path="/usuario/contacto" element={
            <RutaProtegida tipo="CLIENTE">
              <Contacto/>
            </RutaProtegida>
          } />
          
          <Route path="/usuario/pagos" element={
            <RutaProtegida tipo="CLIENTE">
              <Pagos/>
            </RutaProtegida>
          } />

          <Route path="/usuario/federacion" element={
            <RutaProtegida tipo="CLIENTE">
              <Federacion/>
            </RutaProtegida>
          } />

          {/*Administrador*/}
          <Route path="/admin" element={
            <RutaProtegida tipo="ADMINISTRADOR">
              <InicioAdmin />
            </RutaProtegida>
          } />
          <Route path="/admin/alumnos" element={
            <RutaProtegida tipo="ADMINISTRADOR">
              <AlumnosAdmin />
            </RutaProtegida>
          } />
          <Route path="/admin/pagos" element={
            <RutaProtegida tipo="ADMINISTRADOR">
              <PagosAdmin />
            </RutaProtegida>
          } />
          <Route path="/admin/horarios" element={
            <RutaProtegida tipo="ADMINISTRADOR">
              <HorariosAdmin />
            </RutaProtegida>
          } />
          <Route path="/admin/asistencia" element={
            <RutaProtegida tipo="ADMINISTRADOR">
              <AsistenciaAdmin />
            </RutaProtegida>
          } />
          <Route path="/admin/tienda" element={
            <RutaProtegida tipo="ADMINISTRADOR">
              <TiendaAdmin />
            </RutaProtegida>
          } />
          <Route path="/admin/noticias" element={
            <RutaProtegida tipo="ADMINISTRADOR">
              <NoticiasAdmin />
            </RutaProtegida>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!ocultarHeader && !mostrarHeaderUsuario && <Footer />}
      {mostrarHeaderUsuario && <FooterUsuario />}
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
