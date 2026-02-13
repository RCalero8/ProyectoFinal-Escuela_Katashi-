import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header.tsx";
import Inicio from "./pages/Invitados/Inicio.tsx";
import Clases from "./pages/Invitados/Clases.tsx";
import Horarios from "./pages/Invitados/Clases.tsx";
import Contacto from "./pages/Invitados/Contacto.tsx";
import Login from "./pages/Login.tsx";
import Registro from "./pages/Registro.tsx";
import { Footer } from "./components/Footer/Footer.tsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
