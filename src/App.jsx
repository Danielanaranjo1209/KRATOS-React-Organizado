import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Inicio from './pages/Inicio.jsx'
import Actividades from './pages/Actividades.jsx'
import ActividadDetalle from './pages/ActividadDetalle.jsx'
import Planificacion from './pages/Planificacion.jsx'
import Contacto from './pages/Contacto.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/actividades/:id" element={<ActividadDetalle />} />
        <Route path="/planificacion" element={<Planificacion />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
      <footer className="footer">KRATOS · Proyecto académico</footer>
    </>
  )
}