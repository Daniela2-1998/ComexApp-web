import React, { useState, useEffect } from 'react';

// Import icono bajar.
import { ReactComponent as IconDown } from '../images/down.svg';

// Import elementos para el select
import { ContenedorSelect, OpcionSeleccionada, Opciones, Opcion } from './ElementosSelect';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function SelectCategoria({ categoria, setCategoria }) {

  const [mostrarSelect, cambiarMostrarSelect] = useState(false);
  const [categorias, setCategorias] = useState('');

  const categoriasCollection = collection(db, "categorias");

  // Función recupero de categorías de Firebase.
  const obtenerCategorias = async () => {
    const data = await getDocs(categoriasCollection);
    setCategorias(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  }

  useEffect(() => {
    obtenerCategorias();
  }, [])


  /*const categorias = [
    { id: 'general', texto: "General" },
    { id: 'alimentos', texto: "Alimentos" },
    { id: 'bebidas', texto: "Bebidas" },
    { id: 'galletitas', texto: "Galletitas" },
    { id: 'dulces', texto: "Dulces" },
    { id: 'muebles', texto: "Muebles" },
    { id: 'vehiculos', texto: "Vehiculos" },
    { id: 'exterior', texto: "Exterior" },
    { id: 'mascotas', texto: "Mascotas" },
    { id: 'ropa', texto: "Ropa" },
    { id: 'niños', texto: "Niños" },
    { id: 'libros', texto: "Libros" },
    { id: 'tecnología', texto: "Tecnología" },
    { id: 'escolares', texto: "Escolares" },
  ];
*/

  const handleClick = (e) => {
    setCategoria(e.currentTarget.dataset.valor);
  }

  return (
    <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
      <></>
      <OpcionSeleccionada>
        {categoria}
        <IconDown />
      </OpcionSeleccionada>

        { mostrarSelect &&
        <Opciones>
          {categorias.map((categoria) => {
            return <Opcion
              key={categoria.id}
              data-valor={categoria.id}
              onClick={handleClick}
            >
              {categoria.categoria}
            </Opcion>
          })}
        </Opciones>
      }

    </ContenedorSelect>
  )
}

export default SelectCategoria;
