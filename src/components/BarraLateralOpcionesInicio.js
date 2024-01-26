import React, {useState, useEffect} from 'react';

import styled from 'styled-components';
import '../css/Inicio.css';

import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';

function BarraLateralOpcionesInicio() {

    const {usuario} = useParams();
    const [nombre, setNombre] = useState('');

    const recuperarNombre = async (usuario) => {
        const usuarioFirebase = await getDoc(doc(db, "usuarios", usuario));
        if(usuarioFirebase.exists()){
            setNombre(usuarioFirebase.data().nombre);
        }
    }

    useEffect(() => {
        recuperarNombre(usuario);
      }, []);
    
      //  as={Link} to={`/importadores/${nombre}`}

    return (
        <BarraLateral>
            <h1>¡Bienvenido a ComexApp!</h1>
            <Subtitulo>Sesión de {nombre}</Subtitulo>
            <ContenedorOpciones>
                <ListadoOpciones>
                    <BotonOpcion className='boton-opcion' as={Link} to={`/importadores/${nombre}`}>Importadores</BotonOpcion>
                    <BotonOpcion className='boton-opcion' as={Link} to={`/exportadores/${nombre}`}>Exportadores</BotonOpcion>
                    <BotonOpcion className='boton-opcion'>Despachantes</BotonOpcion>
                    <BotonOpcion className='boton-opcion'>Transportistas</BotonOpcion>
                    <BotonOpcion className='boton-opcion'>Compradores</BotonOpcion>
                    <BotonOpcion className='boton-opcion'>Vendedores</BotonOpcion>
                    <BotonOpcion className='boton-opcion'>Stock</BotonOpcion>
                    <BotonOpcion className='boton-opcion'>Operaciones</BotonOpcion>
                </ListadoOpciones>
            </ContenedorOpciones>
            <BotonOpcionCerrar className='cerrar'>Cerrar sesión</BotonOpcionCerrar >
        </BarraLateral>
    )
}



const BarraLateral = styled.div`
  height: 1000px;
  width: 30%;
  display: inline-block;
  position: fixed;
  box-sizing: border-box;
  margin-left: max(10%, 1045px);
  background-color: #1a1594;
  color: #fff;
  border: 2px solid #141248;
`;


const Subtitulo = styled.h5`
  margin-top: -2%;
`;


const ContenedorOpciones = styled.div`
  height: 530px;
`;


const ListadoOpciones = styled.ul`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BotonOpcion = styled.button`
  height: 50px;
  width: 90%;
  border-radius: 10px;
  color: #1a1594;
  font-weight: bold;
`;


const BotonOpcionCerrar = styled.button`
  height: 30px;
  width: 82%;
  border-radius: 10px;
  color: #1a1594;
  font-weight: bold;
`;


export default BarraLateralOpcionesInicio;
