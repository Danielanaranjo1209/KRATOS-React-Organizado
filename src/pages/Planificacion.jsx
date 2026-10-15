
import { useState, useContext } from 'react'
import activities from '../data.js'
import PageTitle from '../components/PageTitle.jsx'
import { FormularioContext } from '../context/FormularioContex.jsx'

export default function Planificacion() {
  const contexto = useContext(FormularioContext)

  const chosen = contexto.carrito
  const setChosen = contexto.setCarrito

  const [id, setId] = useState(activities[0].id)

  const activity = activities.find(item => item.id === id)

  const total = chosen.reduce(
    (sum, item) => sum + item.minutes,
    0
  )


  function addActivity() {
    if (chosen.length < 7 && activity) {
      setChosen(items => [
        ...items,
        { ...activity, key: Date.now() }
      ])
    }
  }

  function removeActivity(key) {
    setChosen(items => items.filter(item => item.key !== key))
  }

  return (
    <main className="container">
      <PageTitle
        title="Planificación semanal"
        description="Agrega hasta siete actividades a tu rutina de ejemplo."
      />

      <section className="panel">
        <div className="form-row">
          <select
            value={id}
            onChange={e => setId(e.target.value)}
          >
            {activities.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <button
            className="button"
            onClick={addActivity}
            disabled={chosen.length >= 7}
          >
            Añadir
          </button>
        </div>

        <p>
          <strong>
            {chosen.length}/7 actividades · {total} minutos en total
          </strong>
        </p>

        {chosen.length === 0 ? (
          <p>Aún no has añadido actividades.</p>
        ) : (
          <ul className="planned-list">
            {chosen.map((item, index) => (
              <li key={item.key}>
                {index + 1}. {item.name} ({item.minutes} min)

                <button
                  className="remove"
                  onClick={() => removeActivity(item.key)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
