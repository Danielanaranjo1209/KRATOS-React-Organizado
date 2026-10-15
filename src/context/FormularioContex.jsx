

import { createContext, useEffect, useState } from "react";

export const FormularioContext = createContext(null);

const formularioInicial = {
  nombre: "",
  correo: "",
  telefono: "",
  mensaje: ""
};

function FormularioProvider({ children }) {
  const [formulario, setFormulario] = useState(() => {
    try {
      const guardado = localStorage.getItem(
        "kratos-formulario-contacto"
      );

      return guardado
        ? { ...formularioInicial, ...JSON.parse(guardado) }
        : formularioInicial;
    } catch {
      return formularioInicial;
    }
  });

  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(
        "kratos-planificacion"
      );

      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "kratos-formulario-contacto",
      JSON.stringify(formulario)
    );
  }, [formulario]);

  useEffect(() => {
    localStorage.setItem(
      "kratos-planificacion",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  const limpiarFormulario = () => {
    setFormulario({ ...formularioInicial });
  };

  const valor = {
    formulario,
    setFormulario,
    limpiarFormulario,
    carrito,
    setCarrito
  };

  return (
    <FormularioContext.Provider value={valor}>
      {children}
    </FormularioContext.Provider>
  );
}

export default FormularioProvider;
