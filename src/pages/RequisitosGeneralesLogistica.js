import React, { useState, useEffect } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams, Link } from 'react-router-dom';

// Imports Firebase
import { collection, deleteDoc, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';

import styled from 'styled-components';

import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import { Titulo } from '../components/ElementosParticipantes';
import { FormularioRegistro, TituloCamposRegistro, ContenedorBotonesRegistro, BotonIngresoRegistro } from '../components/ElementosFormulario';
import { DevolucionConsulta, EmpresaConsulta, ContenedorRespuestaConsulta, NombreCampoConsulta, LabelConsulta } from './ConsultarLogistica';
import {ContenedorCamposRegistroParticipantes, CampoParticipante} from './RegistrarParticipanteComex';
import BotonRegresar from '../components/BotonRegresar';

import Alerta from '../components/Alerta';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



function RequisitosGeneralesLogistica() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();
    const { medio } = useParams();

    const [id, setId] = useState('');
    const [requisito, setRequisito] = useState('');
    const [transporte, setTransporte] = useState('');

    const [requisitos, setRequisitos] = useState('');

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');

    const navigate = useNavigate();


    const consulta = query(
        collection(db, 'requisitosLogisticaInt'),
        where('medio', '==', medio),
    );

    const obtenerRequisitos = async () => {
        const data = await getDocs(consulta);
        setRequisitos(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        console.log(requisitos)
    }

    useEffect(() => {
        obtenerRequisitos();
    }, [])

    const atras = () => {
        if (medio === 'terrestre') {
            navigate(`/comercio-exterior/logistica/terrestre/${nombre}/${usuario}/${rol}/${sesion}`);
        } else if (medio === 'marítimo') {
            navigate(`/comercio-exterior/logistica/maritimo/${nombre}/${usuario}/${rol}/${sesion}`);
        } else if (medio === 'aereo'){
            navigate(`/comercio-exterior/logistica/aereo/${nombre}/${usuario}/${rol}/${sesion}`);
        }
    }


    const almacenar = async (e) => {
        e.preventDefault();

        if (medio === '' || id === '' || requisito === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes completar todos los campos.'
            });
            return;
        }

        // Vinculación con los campos.
        await setDoc(doc(db, "requisitosLogisticaInt", id),
            { medio: transporte, requisito: requisito });

        new MySwal({
            title: "Ingreso éxitoso",
            text: "Requisito ingresado al sistema.",
            icon: "success",
            button: "aceptar",
        });

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

                <Titulo>Requisitos general {medio}:</Titulo>

                <FormularioRegistro onSubmit={almacenar}>

                    <TituloRegistroRequisitos>Registrar:</TituloRegistroRequisitos>

                    <ContenedorCamposRegistroParticipantes>
                        <TituloCamposRegistro>ID:</TituloCamposRegistro>
                        <CampoParticipante
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposRegistroParticipantes>

                    <ContenedorCamposRegistroParticipantes>
                        <TituloCamposRegistro>Medio:</TituloCamposRegistro>
                        <CampoParticipante
                            value={transporte}
                            onChange={(e) => setTransporte(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposRegistroParticipantes>

                    <ContenedorCamposRegistroParticipantes>
                        <TituloCamposRegistro>Requisito:</TituloCamposRegistro>
                        <CampoParticipante
                            value={requisito}
                            onChange={(e) => setRequisito(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposRegistroParticipantes>

                    <ContenedorBotonesRequisitos>
                        <BotonRegresar typeof='submit'>Registrar</BotonRegresar>
                        <BotonRegresar onClick={atras}>Volver a {medio}</BotonRegresar>
                    </ContenedorBotonesRequisitos>

                </FormularioRegistro>
            </div>


            {requisitos ?
                requisitos.map((requisito) => {

                    return (
                        <DevolucionConsulta
                            key={requisito.id}
                            data-valor={requisito.id}
                        >
                            <EmpresaConsulta>{requisito.medio}</EmpresaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>ID:</NombreCampoConsulta>
                                <LabelConsulta>{requisito.id}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Requisito:</NombreCampoConsulta>
                                <LabelConsulta>{requisito.requisito}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                        </DevolucionConsulta>
                    )

                })

                :
                ''
            }

            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </>
    )
}

const TituloRegistroRequisitos = styled.h3`
   color: #1A1594;
   margin-top: 3%;
`;

const ContenedorBotonesRequisitos = styled.div`
  height: 70px;
  width: 100%;
  margin-bottom: 7%;
  display: flex;
  justify-content: space-evenly;
`;

export default RequisitosGeneralesLogistica;
