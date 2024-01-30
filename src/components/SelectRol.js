import React, { useState } from 'react';

// Import icono bajar.
import { ReactComponent as IconDown } from '../images/down.svg';

// Import elementos para el select
import { ContenedorSelect, OpcionSeleccionada, Opciones, Opcion } from './ElementosSelect';



function SelectRol({ rol, setRol }) {

  const [mostrarSelect, cambiarMostrarSelect] = useState(false);

  const roles = [
    { id: 'administrador', texto: "Administrador" },
    { id: 'empleado', texto: "Empleado" },
  ];


  const handleClick = (e) => {
    setRol(e.currentTarget.dataset.valor);
  }

  return (
    <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
      <></>
      <OpcionSeleccionada>
        {rol}
        <IconDown />
      </OpcionSeleccionada>

      {mostrarSelect &&
        <Opciones>
          {roles.map((rol) => {
            return <Opcion
              key={rol.id}
              data-valor={rol.id}
              onClick={handleClick}
            >
              {rol.texto}
            </Opcion>
          })}
        </Opciones>
      }
    </ContenedorSelect>
  )
}

export default SelectRol;
