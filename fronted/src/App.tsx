import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header.tsx";

import Login from "./pages/Login.tsx";
import Registro from "./pages/Registro.tsx";
import { Footer } from "./components/Footer/Footer.tsx";
import "./App.css";
import Inicio from "./pages/Invitado/Inicio.tsx";
import Conocenos from "./pages/Invitado/Conocenos.tsx";
import Clases from "./pages/Invitado/Clases.tsx";
import Noticias from "./pages/Invitado/Noticias.tsx";
import Tienda from "./pages/Invitado/Tienda.tsx";
import Contacto from "./pages/Invitado/Contacto.tsx";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Inicio />} />
          <Route path="/login" element={<Conocenos />} />
          <Route path="/login" element={<Clases />} />
          <Route path="/login" element={<Noticias />} />
          <Route path="/login" element={<Tienda />} />
          <Route path="/login" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
