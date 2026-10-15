import { useState } from 'react'
import activities from '../data.js'
import ActivityCard from '../components/ActivityCard.jsx'
import PageTitle from '../components/PageTitle.jsx'

export default function Actividades() {
  const [level, setLevel] = useState('Todas')
  const filtered = level === 'Todas' ? activities : activities.filter(item => item.level === level)

  return (
    <main className="container">
      <PageTitle title="Actividades" description="Filtra las actividades por nivel y consulta sus detalles." />
      <label className="filter">Nivel:
        <select value={level} onChange={e => setLevel(e.target.value)}>
          <option>Todas</option><option>Principiante</option>
          <option>Intermedio</option><option>Avanzado</option>
        </select>
      </label>

      <div className="grid">
        {filtered.map(item => <ActivityCard key={item.id} activity={item} />)}
      </div>
      
    </main>
  )
}