import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const links = [
    ['/', 'Inicio', true],
    ['/actividades', 'Actividades'],
    ['/planificacion', 'Planificación'],
    ['/contacto', 'Contacto']
  ]

  return (
    <header className="navbar">
      <Link className="brand" to="/">KRATOS<span>.</span></Link>
      <nav>
        <NavLink className= "nav-link" to="/" end>Inicio</NavLink>
        <NavLink className= "nav-link" to="/contacto">Contacto</NavLink>
        <NavLink className= "nav-link" to="/actividades">Actividades</NavLink>
        <NavLink className= "nav-link" to="/planificacion">Planificacion</NavLink>
        
      </nav>
    </header>
  )
}