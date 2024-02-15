import React, { useState } from 'react';

// Import icono bajar.
import { ReactComponent as IconDown } from '../images/down.svg';

// Import elementos para el select
import { ContenedorSelect, OpcionSeleccionada, Opciones, Opcion } from './ElementosSelect';



function SelectParticipanteComex({ participante, setParticipante }) {

  const [mostrarSelect, cambiarMostrarSelect] = useState(false);

  const participantes = [
    { id: 'exportador', texto: "exportador" },
    { id: 'importador', texto: "importador" },
    { id: 'despachante', texto: "despachante" },
    { id: 'agente de carga', texto: "agente de carga" },
  ];


  const handleClick = (e) => {
    setParticipante(e.currentTarget.dataset.valor);
  }

  return (
    <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
      <></>
      <OpcionSeleccionada>
        {participante}
        <IconDown />
      </OpcionSeleccionada>

      {mostrarSelect &&
        <Opciones>
          {participantes.map((participante) => {
            return <Opcion
              key={participante.id}
              data-valor={participante.id}
              onClick={handleClick}
            >
              {participante.texto}
            </Opcion>
          })}
        </Opciones>
      }
    </ContenedorSelect>
  )
}

export default SelectParticipanteComex;
