import { useState } from "react";
import { useFormularioContext } from "../context/FormularioContex.jsx";
import FormularioContacto from "../components/FormularioContacto.jsx";
import ResumenFormulario from "../components/ResumenFormulario.jsx";

function Contacto() {
  const { estado, dispatch } = useFormularioContext();
  const formulario = estado.contacto;

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    dispatch({ type: "ACTUALIZAR_CONTACTO", campo: name, valor: value });

    setEnviado(false);

    if (errores[name]) {
      setErrores((erroresAnteriores) => ({
        ...erroresAnteriores,
        [name]: ""
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (formulario.nombre.trim().length < 3) {
      nuevosErrores.nombre =
        "El nombre debe tener al menos 3 caracteres.";
    }

    if (!formulario.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo)
    ) {
      nuevosErrores.correo =
        "Ingresa un correo electrónico válido.";
    }

    if (!formulario.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje =
        "El mensaje es requerido para saber cuál es tu solicitud.";
    }

    return nuevosErrores;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevosErrores = validarFormulario();

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setEnviado(false);
      return;
    }

    setEnviado(true);
  };

  const limpiarFormulario = () => {
    dispatch({ type: "LIMPIAR_CONTACTO" });

    setErrores({});
    setEnviado(false);
  };

  return (
    <section className="contact-page">

      <div className="page-intro">
        <span className="section-kicker">
          FORMULARIOS · REACT
        </span>

        <h1>Contacto</h1>

        <p>
          Completa el formulario y observa cómo React mantiene
          sincronizada la información en un componente de
          visualización independiente.
        </p>
      </div>

      <div className="contact-grid">

        <FormularioContacto
          formulario={formulario}
          errores={errores}
          onChange={manejarCambio}
          onSubmit={manejarEnvio}
        />

        <ResumenFormulario
          formulario={formulario}
          enviado={enviado}
        />

      </div>

      {enviado && (
        <div className="success-message">

          <div className="success-icon">
            ✓
          </div>

          <div>

            <h2>
              ¡Gracias, {formulario.nombre}!
            </h2>

            <p>
              Hemos recibido correctamente tu información.
              Nos pondremos en contacto contigo a través de{" "}
              <strong>{formulario.correo}</strong>.
            </p>

            <button
              className="btn btn-secondary"
              onClick={limpiarFormulario}
            >
              Registrar otra solicitud
            </button>

          </div>

        </div>
      )}

    </section>
  );
}

export default Contacto;