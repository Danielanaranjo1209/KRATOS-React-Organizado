import { Link } from 'react-router-dom'
import activities from '../data.js'
import ActivityCard from '../components/ActivityCard.jsx'
import PageTitle from '../components/PageTitle.jsx'

export default function Inicio() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">ACTIVIDAD · CONSTANCIA · BIENESTAR</p>
        <h1>Construye una rutina<br /><span>a tu propio ritmo.</span></h1>
        <p>KRATOS es una empresa ficticia que te ayuda a explorar actividades físicas y organizar tu semana.</p>
        <Link className="button" to="/actividades">Explorar actividades</Link>
      </section>
      <section className="container">
        <PageTitle title="Actividades destacadas" description="Conoce algunas opciones disponibles." />
        <div className="grid">
          {activities.slice(0, 3).map(item => <ActivityCard key={item.id} activity={item} />)}
        </div>
      </section>
    </main>
  )
}