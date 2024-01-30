import React, { useState } from 'react';

// Import icono bajar.
import { ReactComponent as IconDown } from '../images/down.svg';

// Import elementos para el select
import { ContenedorSelect, OpcionSeleccionada, Opciones, Opcion } from './ElementosSelect';



function SelectArea({ area, setArea }) {

  const [mostrarSelect, cambiarMostrarSelect] = useState(false);

  const areas = [
    { id: 'general', texto: "General" },
    { id: 'comercio internacional', texto: "Comercio internacional" },
    { id: 'comercio nacional', texto: "Comercio nacional" },
    { id: 'importaciones', texto: "Importaciones" },
    { id: 'exportaciones', texto: "Exportaciones" },
    { id: 'despachante de aduanas', texto: "Despachante de aduanas" },
    { id: 'logística', texto: "Logística" },
    { id: 'marketing', texto: "Marketing" },
    { id: 'compras', texto: "Compras" },
    { id: 'ventas', texto: "Ventas" },
  ];


  const handleClick = (e) => {
    setArea(e.currentTarget.dataset.valor);
  }

  return (
    <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
      <></>
      <OpcionSeleccionada>
        {area}
        <IconDown />
      </OpcionSeleccionada>

      {mostrarSelect &&
        <Opciones>
          {areas.map((area) => {
            return <Opcion
              key={area.id}
              data-valor={area.id}
              onClick={handleClick}
            >
              {area.texto}
            </Opcion>
          })}
        </Opciones>
      }
    </ContenedorSelect>
  )
}

export default SelectArea;
