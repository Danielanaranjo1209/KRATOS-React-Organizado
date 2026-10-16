import { createContext, useContext, useEffect, useReducer } from 'react'

const CLAVE_CONTACTO = 'kratos-formulario-contacto'
const CLAVE_PLANIFICACION = 'kratos-planificacion-semanal'

function leerJSON(clave, valorInicial) {
  try {
    const valor = localStorage.getItem(clave)
    return valor ? JSON.parse(valor) : valorInicial
  } catch {
    return valorInicial
  }
}

const estadoInicial = {
  contacto: leerJSON(CLAVE_CONTACTO, { nombre: '', correo: '', telefono: '', mensaje: '' }),
  planificacion: leerJSON(CLAVE_PLANIFICACION, [])
}

function formularioReducer(estado, accion) {
  switch (accion.type) {
    case 'ACTUALIZAR_CONTACTO':
      return { ...estado, contacto: { ...estado.contacto, [accion.campo]: accion.valor } }
    case 'REEMPLAZAR_CONTACTO':
      return { ...estado, contacto: accion.contacto }
    case 'LIMPIAR_CONTACTO':
      return { ...estado, contacto: { nombre: '', correo: '', telefono: '', mensaje: '' } }
    case 'AGREGAR_ENTRENAMIENTO':
      return { ...estado, planificacion: [...estado.planificacion, accion.entrenamiento] }
    case 'EDITAR_ENTRENAMIENTO':
      return { ...estado, planificacion: estado.planificacion.map(item => item.id === accion.entrenamiento.id ? accion.entrenamiento : item) }
    case 'ELIMINAR_ENTRENAMIENTO':
      return { ...estado, planificacion: estado.planificacion.filter(item => item.id !== accion.id) }
    case 'LIMPIAR_PLANIFICACION':
      return { ...estado, planificacion: [] }
    default:
      return estado
  }
}

const FormularioContext = createContext(null)

export function FormularioProvider({ children }) {
  const [estado, dispatch] = useReducer(formularioReducer, estadoInicial)

  useEffect(() => {
    try { localStorage.setItem(CLAVE_CONTACTO, JSON.stringify(estado.contacto)) } catch (error) { console.error('No se pudo guardar el formulario de contacto.', error) }
  }, [estado.contacto])

  useEffect(() => {
    try { localStorage.setItem(CLAVE_PLANIFICACION, JSON.stringify(estado.planificacion)) } catch (error) { console.error('No se pudo guardar la planificación.', error) }
  }, [estado.planificacion])

  return <FormularioContext.Provider value={{ estado, dispatch }}>{children}</FormularioContext.Provider>
}

export function useFormularioContext() {
  const contexto = useContext(FormularioContext)
  if (!contexto) throw new Error('useFormularioContext debe usarse dentro de FormularioProvider.')
  return contexto
}
