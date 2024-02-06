import React, { useState, useEffect } from 'react';

// Import icono bajar.
import { ReactComponent as IconDown } from '../images/down.svg';

// Import elementos para el select
import { ContenedorSelect, OpcionSeleccionada, Opciones, Opcion } from './ElementosSelect';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';



function SelectProveedor({ proveedor, setProveedor }) {

  const [mostrarSelect, cambiarMostrarSelect] = useState(false);
  const [proveedores, setProveedores] = useState('');

  const proveedoresCollection = collection(db, "proveedores");

  // Función recupero de proveedores de Firebase.
  const obtenerProveedores = async () => {
    const data = await getDocs(proveedoresCollection);
    setProveedores(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  }

  useEffect(() => {
    obtenerProveedores();
  }, [])


  const handleClick = (e) => {
    setProveedor(e.currentTarget.dataset.valor);
  }

  return (
    <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
      <></>
      <OpcionSeleccionada>
        {proveedor}
        <IconDown />
      </OpcionSeleccionada>

      {mostrarSelect &&
        <Opciones>
          {proveedores.map((proveedor) => {
            return <Opcion
              key={proveedor.id}
              data-valor={proveedor.id}
              onClick={handleClick}
            >
              {proveedor.proveedor}
            </Opcion>
          })}
        </Opciones>
      }
    </ContenedorSelect>
  )
}

export default SelectProveedor;
