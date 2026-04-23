import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

// --- IMPORTA TUS NUEVAS PÁGINAS DE USUARIO Y ADMIN AQUÍ ---
// import PanelUsuario from "./pages/Usuario/PanelUsuario.tsx";
// import PanelAdmin from "./pages/Admin/PanelAdmin.tsx";

// Componentes temporales para que no te de error al compilar
const PanelUsuario = () => <div style={{padding: '100px'}}><h1>Panel del Alumno</h1></div>;
const PanelAdmin = () => <div style={{padding: '100px'}}><h1>Panel de Administrador</h1></div>;

function App() {
  // Función para obtener el usuario y su rol desde el localStorage
  const getUsuario = () => {
    const userJson = localStorage.getItem('usuario');
    return userJson ? JSON.parse(userJson) : null;
  };

  const usuario = getUsuario();

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* --- RUTAS PÚBLICAS (Invitados) --- */}
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

          {/* --- RUTAS PROTEGIDAS (Requieren Login) --- */}
          
          {/* Ruta para Alumnos (CLIENTE) */}
          <Route 
            path="/usuario" 
            element={
              usuario?.tipo_usuario === 'CLIENTE' ? <PanelUsuario /> : <Navigate to="/login" />
            } 
          />

          {/* Ruta para Administradores (ADMINISTRADOR) */}
          <Route 
            path="/admin" 
            element={
              usuario?.tipo_usuario === 'ADMINISTRADOR' ? <PanelAdmin /> : <Navigate to="/login" />
            } 
          />

          {/* Redirección automática si entran a una ruta que no existe */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;