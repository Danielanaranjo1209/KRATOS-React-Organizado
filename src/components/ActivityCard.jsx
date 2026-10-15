import { Link } from 'react-router-dom'

export default function ActivityCard({ activity }) {
  return (
    <article className="card">
      <span className="tag">{activity.level}</span>
      <h3>{activity.name}</h3>
      <p>{activity.description}</p>
      <div className="card-footer">
        <span>{activity.minutes} minutos</span>
        <Link to={`/actividades/${activity.id}`}>Ver detalle →</Link>
      </div>
    </article>
  )
}