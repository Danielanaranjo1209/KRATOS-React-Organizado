import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'

export default function NoEncontrado() {
  return (
    <main className="container not-found">
      <p className="error">404</p>
      <PageTitle title="Página no encontrada" description="La dirección que ingresaste no existe." />
      <Link className="button" to="/">Volver al inicio</Link>
    </main>
  )
}