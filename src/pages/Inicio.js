import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Helmet, HelmetProvider } from "react-helmet-async";

// Imports estilos.
import styled from 'styled-components';
import '../css/Inicio.css';

// Import Firebase.
import { db } from '../firebase/FirebaseConfig';
import { getDoc, doc } from "firebase/firestore";

// Import componentes
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import ContenedorGeneralInicio from '../components/ContenedorGeneral';



function Inicio() {

  // Estados y parámetro.
  const {usuario} = useParams();
  const {sesion} = useParams();

  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [area, setArea] = useState('');
  const [sesionGuardada, setSesionGuardada] = useState('');
  const [ usuarioRecuperado, setUsuarioRecuperado] = useState('')
  

  // Función de recupero de datos relevantes del usuario.
  const recuperarNombreRolYArea = async (usuario) => {
    const usuarioFirebase = await getDoc(doc(db, "usuarios", usuario));
    if (usuarioFirebase.exists()) {
      setNombre(usuarioFirebase.data().nombre);
      setRol(usuarioFirebase.data().rol);
      setArea(usuarioFirebase.data().area);
    }
  }

  const pasarElRol = (rol) => {
    setRol(rol);
  }

  const pasarUsuario = (usuario) => {
    setUsuarioRecuperado(usuario);
  }
 
  const pasarNombre = (nombre) => {
    setNombre(nombre);
  }

  const pasarSesion = (sesion) => {
    setSesionGuardada(sesion);
  }



  useEffect(() => {
    recuperarNombreRolYArea(usuario);
  }, []);


  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Inicio de {nombre}</title>
          <link rel='icon' href="../images/logo.png" />
        </Helmet>
      </HelmetProvider>

      <ContenedorGeneralInicio>

        <Encabezado pasarElRol={rol} />

        <MenuOpcionesInicio pasarElRol={rol} pasarNombre={nombre} pasarSesion={sesion} pasarUsuario={usuario} />

        <ContenedorSaludoEImagen>
          <ContenedorBienvenida>
            <h2>¡Bienvenido a ComexApp!</h2>
            <h5>Sesión de {nombre}</h5>
            <p>
              En este sistema podrás gestionar las operaciones nacionales e internacionales de la empresa, llevar una agenda personal o general de contactos 
              y administrar el stock de mercaderías, suministros y materias primas. 
            </p>
          </ContenedorBienvenida>

          <figure className='imagen'></figure>
        </ContenedorSaludoEImagen>

      </ContenedorGeneralInicio>
    </>
  )
}




const ContenedorSaludoEImagen = styled.div`
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column;
  }

`;

const ContenedorBienvenida = styled.div`
  width: 25%;
  background-color: #1A1594;

  @media (max-width: 900px) {
    width: 100%;
    height: 200px;
  }

  @media (max-width: 760px) {
    width: 100%;
    height: 200px;
  }
`;



export default Inicio;
