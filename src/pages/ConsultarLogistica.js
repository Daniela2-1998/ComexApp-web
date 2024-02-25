import React, { useState, useEffect } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams, Link } from 'react-router-dom';

// Imports Firebase
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';

import styled from 'styled-components';

import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import { Titulo } from '../components/ElementosParticipantes';
import BotonRegresar from '../components/BotonRegresar';



function ConsultarLogistica() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();

    const [compañia, setCompañia] = useState([]);

    const [id, setId] = useState('');
    const [empleado, setEmpleado] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [mail, setMail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [CUIT, setCUIT] = useState('');
    const [pais, setPais] = useState('');
    const [productosAsociados, setProductosAsociados] = useState('');

    const [participante, setParticipante] = useState('exportador');
    const [estado, setEstado] = useState('activo');

    const [solicitud, setSolicitud] = useState('');

    const navigate = useNavigate();

    const consulta = query(
        collection(db, 'participantesComex'),
        where('empresa', '==', solicitud),
        where('cargo', '==', "logistica"),
    );

    const obtenerParticipante = async () => {
        const data = await getDocs(consulta);
        setCompañia(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        obtenerParticipante();
    }


    const aMaritimo = () => {
        navigate(`/comercio-exterior/logistica/maritimo/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Logística internacional - {nombre}</title>
                    <link rel='icon' href="../images/logo.png" />
                </Helmet>
            </HelmetProvider>

            <div>
                <Encabezado pasarElRol={rol} />
                <MenuOpcionesInicio pasarElRol={rol} />

                <Titulo>¿Qué empresa marítima buscas?</Titulo>
                <form onSubmit={handleSubmit}>
                    <InputConsulta
                        type="text"
                        placeholder='Ingresa el nombre de la empresa'
                        value={solicitud}
                        onChange={(e) => setSolicitud(e.target.value)}
                    />
                    <BotonConsulta>Consultar</BotonConsulta>
                </form>
            </div>


            {compañia ?
                compañia.map((comp) => {

                    return (
                        <DevolucionConsulta
                            key={comp.id}
                            data-valor={comp.id}
                        >
                            <EmpresaConsulta>{comp.empresa}</EmpresaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>ID:</NombreCampoConsulta>
                                <LabelConsulta>{comp.id}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Empleado:</NombreCampoConsulta>
                                <LabelConsulta>{comp.empleado}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Mail:</NombreCampoConsulta>
                                <LabelConsulta>{comp.mail}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Teléfono:</NombreCampoConsulta>
                                <LabelConsulta>{comp.telefono}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>CUIT:</NombreCampoConsulta>
                                <LabelConsulta>{comp.CUIT}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>País:</NombreCampoConsulta>
                                <LabelConsulta>{comp.pais}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Productos:</NombreCampoConsulta>
                                <LabelConsulta>{comp.productos}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Medio:</NombreCampoConsulta>
                                <LabelConsulta>{comp.medio}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Requisitos:</NombreCampoConsulta>
                                <LabelConsulta>{comp.requisitos}</LabelConsulta>
                            </ContenedorRespuestaConsulta>


                            {comp.estado === 'activo'
                                ?
                                <LabelActivoConsulta>{comp.estado}</LabelActivoConsulta>
                                :
                                <LabelInactivoConsulta>{comp.estado}</LabelInactivoConsulta>
                            }
                        </DevolucionConsulta>
                    )

                })

                :
                ''
            }
            <BotonRegresar onClick={aMaritimo}>Volver a marítima</BotonRegresar>

        </>
    )
}




const InputConsulta = styled.input`
   width: 20%;
   height: 50px;
   margin-top: 2%;
   color: #1A1594;
   border-top-left-radius: 20px;
   border-bottom-left-radius: 20px;
   border: 1px solid #1A1594;
   padding: 1.5%;
   font-weight: normal;
 

   &:placeholder{
       color: #1A1594;
  }

   &:active{
      color: #1A1594;
  }
`;

const BotonConsulta = styled.button`
    width: 10%;
    height: 50px;
    color: #1A1594;
    background-color: #fff;
    font-weight: bold;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 1px solid #1A1594;
`;

const DevolucionConsulta = styled.div`
    width: 45%;
    height: fit-content;
    margin-top: 3%;
    margin-left: 28%;
    border-bottom: 20px solid #1A1594;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;}
`;

const EmpresaConsulta = styled.h2`
    height: 50px;
    padding: 1%;
    background-color: #1A1594;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
`;

const ContenedorRespuestaConsulta = styled.div`
    display: flex;
    margin-left: 5%;
    margin-bottom: 2%;
`;

const NombreCampoConsulta = styled.label`
    height: 30px;
    width: 20%;
    padding: 0.5%;
    margin-right: 5%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    color: #fff;
    background-color: #1A1594;
`;

const LabelConsulta = styled.label`
    color: #1A1594;
    font-weight: normal;
    text-align: left;
`;

const LabelActivoConsulta = styled.label`
    background-color: rgb(3, 133, 3);
    color: #fff;
    text-align: center;
`;

const LabelInactivoConsulta = styled.label`
    background-color: rgb(238, 7, 7);
    color: #fff;
`;

export default ConsultarLogistica;

