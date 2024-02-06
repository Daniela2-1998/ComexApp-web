import React, { useState } from 'react';

// Import icono bajar.
import { ReactComponent as IconDown } from '../images/down.svg';

// Import elementos para el select
import { ContenedorSelect, OpcionSeleccionada, Opciones, Opcion } from './ElementosSelect';



function SelectEstadoMercaderia({ estado, setEstado }) {

  const [mostrarSelect, cambiarMostrarSelect] = useState(false);

  const estados = [
    { id: 'disponible', texto: "Disponible" },
    { id: 'reservado', texto: "Reservado" },
    { id: 'sin stock', texto: "Sin stock" },
  ];


  const handleClick = (e) => {
    setEstado(e.currentTarget.dataset.valor);
  }

  return (
    <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
      <></>
      <OpcionSeleccionada>
        {estado}
        <IconDown />
      </OpcionSeleccionada>

      {mostrarSelect &&
        <Opciones>
          {estados.map((estado) => {
            return <Opcion
              key={estado.id}
              data-valor={estado.id}
              onClick={handleClick}
            >
              {estado.texto}
            </Opcion>
          })}
        </Opciones>
      }
    </ContenedorSelect>
  )
}

export default SelectEstadoMercaderia;
