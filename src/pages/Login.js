import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Helmet, HelmetProvider } from "react-helmet-async";

// ------------------------------------------------------------- IMPORTS FIREBASE --------------------------------------------------------------------------------------

import { db } from '../firebase/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


// ------------------------------------------------------------ IMPORTS ESTILOS/DISEÑOS --------------------------------------------------------------------------------

import styled from 'styled-components';
import '../css/Login.css'


function Login() {

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'usuario') {
      setUsuario(e.target.value);
    } else if (e.target.name === 'contraseña') {
      setContraseña(e.target.value);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    await signInWithEmailAndPassword(auth, usuario, contraseña)
      .then((userCredential) => {
        const user = userCredential.user;
        const sesion = user.uid;
        navigate(`/inicio/${usuario}/${sesion}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        navigate('/');
      });
  }



  return (
    <>
     <HelmetProvider>
          <Helmet>
            <title>Inicio de sesión</title>
            <link rel='icon' href="../images/logo.png" />
          </Helmet>
      </HelmetProvider>

      <ContenedorLogin className='liquid'>
        <figure className='icono-login'></figure>
        <Titulo>ComexApp</Titulo>

        <form onSubmit={handleSubmit}>
          <EspacioCamposLogin className='espacio-campos'>

            <ContenedorOpcionLogin>
              <LabelCampos>Usuario:</LabelCampos>
              <CamposLogin
                className='campos'
                type="text"
                name='usuario'
                placeholder='Ingresa tu nombre de usuario.'
                value={usuario}
                onChange={handleChange}
                required
              />
            </ContenedorOpcionLogin>

            <ContenedorOpcionLogin>
              <LabelCampos>Contraseña:</LabelCampos>
              <CamposLogin
                className='campos'
                type="password"
                name='contraseña'
                placeholder='Ingresa tu contraseña.'
                value={contraseña}
                onChange={handleChange}
                required
              />
            </ContenedorOpcionLogin>
          </EspacioCamposLogin>

          <BotonLogin as="button" type='submit' className='botonLogin'>INGRESAR</BotonLogin>
        </form>

      </ContenedorLogin>

    </>
  )
}



const ContenedorLogin = styled.div`
  height: 600px;
  width: 30%;
  margin-top: 3%;
  margin-left: 35%;
  border-radius: 20px;
  border: 2px solid;
  box-shadow:  5px -5px 25px #104e81;
  background-color: #fffcfc;
  overflow: hidden;

  
  /* --------------------------- RESPONSIVE POR TAMAÑO DE PANTALLAS  --------------------------------------------------------------------------*/


  @media (max-width: 1300px) {
    margin-bottom: 35%;
  }

  @media (max-width: 1000px) {
    width: 40%;
  }

  @media (max-width: 800px) {
    width: 50%;
    margin-left: 25%;
  }

  @media (max-width: 600px) {
    width: 60%;
    margin-left: 22%;
  }

  @media (max-width: 600px) {
    width: 80%;
    margin-top: 8%;
    margin-left: 10%;
  }

`;


const Titulo = styled.h1`
  color: #104e81;
  position: relative;
  z-index: 2;
  margin-top: 30%; 
`;


const EspacioCamposLogin = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  position: absolute;
`;


const ContenedorOpcionLogin = styled.div`
  width: 35%;
  height: 150px;
  margin-left: 2%;
  display: flex;
  color: rgb(110, 122, 122);
  align-items: center;
`;


const LabelCampos = styled.label`
  height: 20px;
  width: 50%;
  color: #22466d;
  font-weight: bolder;
  font-size: larger;
  padding: 2%;
  border-radius: 10px;
  margin-bottom: 60%;
  margin-left: 28%;

  /* --------------------------- RESPONSIVE POR TAMAÑO DE PANTALLAS  --------------------------------------------------------------------------*/


  @media (max-width: 1300px) {
    margin-bottom: 80%;
  }

  @media (max-width: 600px) {
    margin-bottom: 90%;
  }

`;

const CamposLogin = styled.input`
  height: 50px;
  width: 77%;
  margin-left: 10%;
  border: 2px solid #0073c0;
  border-radius: 10px;
  font-size: medium;
  display: flex;
  z-index: 2;
  position: absolute;
  color: #104e81;
  padding-left: 2%;
`;


const BotonLogin = styled.button`
  height: 55px;
  width: 78%;
  padding: 1%;
  margin-left: -38%;
  margin-top: 60%;
  border-radius: 13px;
  border: 2px solid #0073c0;
  background-color: #55a4d8;
  color: #113d6b;
  font-size: medium;
  font-weight: bold;
  z-index: 2;
  position: absolute;


  @media (max-width: 1300px) {
    margin-top: 75%;
  }

  @media (max-width: 600px) {
    margin-top: 85%;
  }


`;


export default Login;
