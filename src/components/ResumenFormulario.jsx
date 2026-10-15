function ResumenFormulario({ formulario, enviado }) {
  return (
    <aside className="form-preview">
      <div className="section-heading">
        <span className="section-kicker">02 · PREVISUALIZACIÓN</span>
        <h2>Información en tiempo real</h2>
        <p>
          Este componente recibe el estado del formulario mediante props y
          muestra cómo cambia mientras el usuario escribe.
        </p>
      </div>

      <div className="preview-card">
        <div className="preview-status">
          <span className="status-dot"></span>
          {enviado ? "Formulario enviado" : "Actualizando en tiempo real"}
        </div>

        <div className="preview-item">
          <span>Nombre</span>
          <strong>{formulario.nombre || "Sin ingresar"}</strong>
        </div>

        <div className="preview-item">
          <span>Correo</span>
          <strong>{formulario.correo || "Sin ingresar"}</strong>
        </div>

        <div className="preview-item">
          <span>Teléfono</span>
          <strong>{formulario.telefono || "Sin ingresar"}</strong>
        </div>

        <div className="preview-item">
          <span>Mensaje</span>
          <strong>{formulario.mensaje || "Sin ingresar"}</strong>
        </div>
      </div>

      <div className="learning-note">
        <strong>¿Qué está pasando?</strong>
        <p>
          Cada <code>onChange</code> actualiza el estado del componente
          <code> Contacto</code>. Ese estado se envía como prop a este
          componente, provocando su actualización.
        </p>
      </div>
    </aside>
  );
}

export default ResumenFormulario;