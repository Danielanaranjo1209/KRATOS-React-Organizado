function FormularioContacto({ formulario, errores, onChange, onSubmit }) {
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="section-heading">
        <span className="section-kicker">01 · DATOS</span>
        <h2>Formulario de contacto</h2>
        <p>Completa la información para registrar la solicitud.</p>
      </div>

      <div className="form-group">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={onChange}
          placeholder="Ej. Jose Luis fernandez "
        />
        {errores.nombre && <small className="error-text">{errores.nombre}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={onChange}
          placeholder="ejemplo@correo.com"
        />
        {errores.correo && <small className="error-text">{errores.correo}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={formulario.telefono}
          onChange={onChange}
          placeholder="300 000 0000"
        />
        {errores.telefono && <small className="error-text">{errores.telefono}</small>}
      </div>
            <div className="form-group">
        <label htmlFor="mensaje">Deja tu mensaje.</label>
        <input
          id="mensaje"
          name="mensaje"
          type="text"
          value={formulario.mensaje}
          onChange={onChange}
          placeholder="Ej. Hola quiero saber más sobre la rutina..."
        />
        {errores.mensaje && <small className="error-text">{errores.mensaje}</small>}
      </div>



      <button className="btn btn-primary btn-submit" type="submit">
        Enviar información
      </button>
    </form>
  );
}

export default FormularioContacto;