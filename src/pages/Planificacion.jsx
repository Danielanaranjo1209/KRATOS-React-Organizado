import { useMemo, useState } from 'react'
import { useFormularioContext } from '../context/FormularioContex.jsx'
import activities from '../data.js'
import PageTitle from '../components/PageTitle.jsx'

const DIAS = [
  { value: 'lunes', label: 'Lunes' },
  { value: 'martes', label: 'Martes' },
  { value: 'miercoles', label: 'Miércoles' },
  { value: 'jueves', label: 'Jueves' },
  { value: 'viernes', label: 'Viernes' },
  { value: 'sabado', label: 'Sábado' },
  { value: 'domingo', label: 'Domingo' }
]
const formularioInicial = {
  actividadId: activities[0]?.id ?? '',
  dia: 'lunes',
  hora: '08:00',
  minutos: activities[0]?.minutes ?? 30,
  notas: ''
}

function horaAMinutos(hora) {
  const [horas, minutos] = hora.split(':').map(Number)
  return horas * 60 + minutos
}

export default function Planificacion() {
  const { estado, dispatch } = useFormularioContext()
  const planificacion = estado.planificacion
  const [formulario, setFormulario] = useState(formularioInicial)
  const [editandoId, setEditandoId] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')

  const actividadSeleccionada = activities.find(
    actividad => actividad.id === formulario.actividadId
  )

  const minutosTotales = useMemo(
    () => planificacion.reduce((total, item) => total + Number(item.minutos), 0),
    [planificacion]
  )

  const mostrarMensaje = (texto, tipo = 'error') => {
    setMensaje(texto)
    setTipoMensaje(tipo)
  }

  const cambiarCampo = (e) => {
    const { name, value } = e.target
    setFormulario(actual => ({
      ...actual,
      [name]: value,
      ...(name === 'actividadId' ? { minutos: activities.find(item => item.id === value)?.minutes ?? 30 } : {})
    }))
    setMensaje('')
  }

  const guardarEntrenamiento = (e) => {
    e.preventDefault()
    const minutos = Number(formulario.minutos)

    if (!formulario.actividadId || !formulario.dia || !formulario.hora) {
      mostrarMensaje('Selecciona una actividad, un día y una hora.')
      return
    }
    if (!Number.isFinite(minutos) || minutos < 5 || minutos > 240) {
      mostrarMensaje('La duración debe estar entre 5 y 240 minutos.')
      return
    }

    const nuevo = {
      id: editandoId ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      actividadId: formulario.actividadId,
      nombre: actividadSeleccionada?.name ?? 'Entrenamiento',
      nivel: actividadSeleccionada?.level ?? '',
      dia: formulario.dia,
      hora: formulario.hora,
      minutos,
      notas: formulario.notas.trim()
    }

    const inicioNuevo = horaAMinutos(nuevo.hora)
    const finNuevo = inicioNuevo + nuevo.minutos
    const conflicto = planificacion.some(item => {
      if (item.id === editandoId || item.dia !== nuevo.dia) return false
      const inicioExistente = horaAMinutos(item.hora)
      const finExistente = inicioExistente + Number(item.minutos)
      return inicioNuevo < finExistente && inicioExistente < finNuevo
    })

    if (conflicto) {
      mostrarMensaje('Ya tienes otro entrenamiento en ese horario. Elige una hora diferente.')
      return
    }

    dispatch(editandoId
      ? { type: 'EDITAR_ENTRENAMIENTO', entrenamiento: nuevo }
      : { type: 'AGREGAR_ENTRENAMIENTO', entrenamiento: nuevo }
    )
    setFormulario(formularioInicial)
    setEditandoId(null)
    mostrarMensaje(editandoId ? 'Entrenamiento actualizado.' : 'Entrenamiento añadido a tu planificación.', 'exito')
  }

  const editarEntrenamiento = (item) => {
    setFormulario({
      actividadId: item.actividadId,
      dia: item.dia,
      hora: item.hora,
      minutos: item.minutos,
      notas: item.notas ?? ''
    })
    setEditandoId(item.id)
    setMensaje('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelarEdicion = () => {
    setFormulario(formularioInicial)
    setEditandoId(null)
    setMensaje('')
  }

  const eliminarEntrenamiento = (id) => {
    dispatch({ type: 'ELIMINAR_ENTRENAMIENTO', id })
    if (editandoId === id) cancelarEdicion()
    mostrarMensaje('Entrenamiento eliminado de la planificación.', 'exito')
  }

  const limpiarPlanificacion = () => {
    if (planificacion.length && window.confirm('¿Quieres eliminar todos los entrenamientos de la semana?')) {
      dispatch({ type: 'LIMPIAR_PLANIFICACION' })
      cancelarEdicion()
      mostrarMensaje('La planificación semanal se ha limpiado.', 'exito')
    }
  }

 
const planPorDia = DIAS.map((dia) => {
  const entrenamientos = planificacion
    .filter((item) => item.dia === dia.value)
    .sort((a, b) => a.hora.localeCompare(b.hora))

  const minutosTotalesDia = entrenamientos.reduce(
    (total, item) => total + Number(item.minutos || 0),
    0
  )

  return {
    ...dia,
    entrenamientos,
    minutosTotalesDia
  }
})


  return (
    <main className="container">
      <PageTitle
        title="Planificación semanal"
        description="Organiza tus entrenamientos por día y hora, controla la duración y mantén tu rutina guardada."
      />

      <section className="planning-summary" aria-label="Resumen de la planificación">
        <article className="planning-stat">
          <span>Entrenamientos programados</span>
          <strong>{planificacion.length}</strong>
        </article>
        <article className="planning-stat">
          <span>Tiempo semanal</span>
          <strong>{Math.floor(minutosTotales / 60)} h {minutosTotales % 60} min</strong>
        </article>
        <article className="planning-stat">
          <span>Días activos</span>
          <strong>{new Set(planificacion.map(item => item.dia)).size} de 7</strong>
        </article>
      </section>
      
      <section className="panel planning-form-panel">
        <div className="planning-section-heading">
          <div>
            <span className="section-kicker">TU RUTINA</span>
            <h2>{editandoId ? 'Editar entrenamiento' : 'Añadir entrenamiento'}</h2>
            <p>Completa los datos para reservar un espacio en tu semana.</p>
          </div>
        </div>

        <form className="planning-form" onSubmit={guardarEntrenamiento}>
          <div className="planning-fields">
            <label>
              Actividad
              <select name="actividadId" value={formulario.actividadId} onChange={cambiarCampo} required>
                {activities.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
            <label>
              Día de la semana
              <select name="dia" value={formulario.dia} onChange={cambiarCampo} required>
                {DIAS.map(dia => <option key={dia.value} value={dia.value}>{dia.label}</option>)}
              </select>
            </label>
            <label>
              Hora de inicio
              <input name="hora" type="time" value={formulario.hora} onChange={cambiarCampo} required />
            </label>
            <label>
              Duración (minutos)
              <input name="minutos" type="number" min="5" max="240" step="5" value={formulario.minutos} onChange={cambiarCampo} required />
            </label>
            <label className="planning-notes">
              Notas (opcional)
              <textarea name="notas" rows="3" value={formulario.notas} onChange={cambiarCampo} placeholder="Ej. Llevar agua, trabajar técnica..." />
            </label>
          </div>

          {actividadSeleccionada && (
            <p className="planning-hint">
              Nivel: <strong>{actividadSeleccionada.level}</strong> · Duración sugerida: {actividadSeleccionada.minutes} minutos.
              Puedes ajustar la duración según tu rutina.
            </p>
          )}

          {mensaje && (
            <p className={`planning-message ${tipoMensaje}`} role="status">{mensaje}</p>
          )}

          <div className="planning-actions">
            <button className="button" type="submit">
              {editandoId ? 'Guardar cambios' : 'Añadir a planificación'}
            </button>
            {editandoId && (
              <button className="button button-outline" type="button" onClick={cancelarEdicion}>Cancelar edición</button>
            )}
          </div>
        </form>
      </section>

      <section className="weekly-plan">
        <div className="weekly-plan-heading">
          <div>
            <span className="section-kicker">VISTA SEMANAL</span>
            <h2>Mi semana de entrenamiento</h2>
          </div>
          {planificacion.length > 0 && (
            <button className="button button-outline" type="button" onClick={limpiarPlanificacion}>
              Limpiar semana
            </button>
          )}
        </div>

        {planificacion.length === 0 ? (
          <div className="planning-empty">
            <h3>Tu semana está lista para organizarse</h3>
            <p>Añade tu primer entrenamiento usando el formulario. Aquí aparecerá el día, la hora y la duración que elijas.</p>
          </div>
        ) : (
          <div className="weekly-grid">
            {planPorDia.map(dia => (
              <section className="day-column" key={dia.value}>
                <header className="day-column-header">
                  <h3>{dia.label}</h3>
                  <span>{dia.entrenamientos.length}</span>
                </header>
                {dia.entrenamientos.length === 0 ? (
                  <p className="day-empty">Sin entrenamientos</p>
                ) : dia.entrenamientos.map(item => (
                  <article className="planned-training" key={item.id}>
                    <span className="planned-time">{item.hora}</span>
                    <h4>{item.nombre}</h4>
                    <p>{item.minutos} minutos · {item.nivel}</p>
                    {item.notas && <p className="planned-notes">{item.notas}</p>}
                    <div className="planned-actions">
                      <button type="button" onClick={() => editarEntrenamiento(item)}>Editar</button>
                      <button type="button" onClick={() => eliminarEntrenamiento(item.id)}>Eliminar</button>
                    </div>
                  </article>
                ))}
              </section>
            ))}
          </div>
        )}
        <p className="storage-note">Tu planificación se guarda en este navegador y se conserva al recargar la página.</p>
      </section>
    </main>
  )
}
