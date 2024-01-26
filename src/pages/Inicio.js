import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Imports estilos.
import styled from 'styled-components';
import '../css/Inicio.css';

// Import Firebase.
import { db } from '../firebase/FirebaseConfig';
import { getDoc, doc } from "firebase/firestore";

// Import componentes
import BarraLateralOpcionesInicio from '../components/BarraLateralOpcionesInicio';

// Import páginas.


function Inicio() {

  // Estados y parámetro.
  const { usuario } = useParams();
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [area, setArea] = useState('');

  // Función de recupero de datos relevantes del usuario.
  const recuperarNombreRolYArea = async (usuario) => {
    const usuarioFirebase = await getDoc(doc(db, "usuarios", usuario));
    if (usuarioFirebase.exists()) {
      setNombre(usuarioFirebase.data().nombre);
      setRol(usuarioFirebase.data().rol);
      setArea(usuarioFirebase.data().area);
    }
  }

  useEffect(() => {
    recuperarNombreRolYArea(usuario);
  }, []);


  return (
    <ContenedorGeneralInicio>
      <figure className='imagen'></figure>
      <BarraLateralOpcionesInicio />
    </ContenedorGeneralInicio>
  )
}

const ContenedorGeneralInicio = styled.div`
  display: flex;
`;


export default Inicio;
