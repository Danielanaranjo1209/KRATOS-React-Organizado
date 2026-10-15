import { Link, useParams } from 'react-router-dom'
import activities from '../data.js'
import PageTitle from '../components/PageTitle.jsx'

export default function ActividadDetalle() {
  const { id } = useParams()
  const activity = activities.find(item => item.id === id)

  if (!activity) return <main className="container"><PageTitle title="Actividad no encontrada" /><Link to="/actividades">Volver</Link></main>

  return (
    <main className="container narrow">
      <Link to="/actividades">← Volver a actividades</Link>
      <PageTitle title={activity.name} description={activity.description} />
      <section className="panel">
        <p><strong>Nivel:</strong> {activity.level}</p>
        <p><strong>Duración:</strong> {activity.minutes} minutos</p>
      
        <Link className="button" to="/planificacion">Ir a planificación</Link>
      </section>
    </main>
  )
}