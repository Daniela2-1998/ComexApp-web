import React, { useState, useEffect } from 'react';

// Import icono bajar.
import { ReactComponent as IconDown } from '../images/down.svg';

// Import elementos para el select
import { ContenedorSelect, OpcionSeleccionada, Opciones, Opcion } from './ElementosSelect';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';



function SelectLogistica({ transporte, setTransporte }) {

  const [mostrarSelect, cambiarMostrarSelect] = useState(false);

  const transportes = [
    { id: 'no corresponde', texto: "no corresponde" },
    { id: 'terrestre', texto: "terrestre" },
    { id: 'marítimo', texto: "marítimo" },
    { id: 'aereo', texto: "aereo" },
  ];

  const handleClick = (e) => {
    setTransporte(e.currentTarget.dataset.valor);
  }

  return (
    <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
      <></>
      <OpcionSeleccionada>
        {transporte}
        <IconDown />
      </OpcionSeleccionada>

        { mostrarSelect &&
        <Opciones>
          {transportes.map((transporte) => {
            return <Opcion
              key={transporte.id}
              data-valor={transporte.id}
              onClick={handleClick}
            >
              {transporte.texto}
            </Opcion>
          })}
        </Opciones>
      }

    </ContenedorSelect>
  )
}

export default SelectLogistica;
