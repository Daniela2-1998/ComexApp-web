import React, {useState} from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

// Imports estilos
import styled from 'styled-components';
import '../css/Participantes.css';

// Imports componentes
import { FormularioRegistro, TituloCamposRegistro, ContenedorBotonesRegistro, BotonIngresoRegistro } from '../components/ElementosFormulario';
import SelectParticipanteComex from '../components/SelectParticipanteComex';
import SelectEstadoParticipante from '../components/SelectEstadoParticipante';
import BotonRegresar from '../components/BotonRegresar';
import Alerta from '../components/Alerta';


function RegistrarParticipanteComex() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();

    const [participante, setParticipante] = useState('exportador');
    const [estado, setEstado] = useState('activo');

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');
  
    const navigate = useNavigate();

    // Función volver atrás.
    const volverAMercaderias = () => {
        navigate(`/comercio-exterior/${nombre}/${usuario}/${rol}/${sesion}`);
    }



    return (

        <>
        <HelmetProvider>
          <Helmet>
            <title>Registrar participantes</title>
            <link rel='icon' href="../images/logo.png" />
          </Helmet>
        </HelmetProvider>

        <ContenedorGeneralRegistroParticipante>

            <ContenedorRegistroParticipante>
                <FormularioParticipantes>

                    <EncabezadoFormularioParticipantes>
                        <h1>Registrar participante</h1>
                    </EncabezadoFormularioParticipantes>

                    <FormularioRegistro>

                        <ContenedorCamposRegistroParticipantes>
                            <TituloCamposRegistro>Contacto:</TituloCamposRegistro>
                            <SelectParticipanteComex
                                participante={participante}
                                setParticipante={setParticipante}
                            />
                        </ContenedorCamposRegistroParticipantes>

                        <ContenedorCamposRegistroParticipantes>
                            <TituloCamposRegistro>Empresa:</TituloCamposRegistro>
                            <CampoParticipante type="text" />
                        </ContenedorCamposRegistroParticipantes>

                        <ContenedorCamposRegistroParticipantes>
                            <TituloCamposRegistro>Mail:</TituloCamposRegistro>
                            <CampoParticipante type="text" />
                        </ContenedorCamposRegistroParticipantes>

                        <ContenedorCamposRegistroParticipantes>
                            <TituloCamposRegistro>Teléfono:</TituloCamposRegistro>
                            <CampoParticipante type="text" />
                        </ContenedorCamposRegistroParticipantes>

                        <ContenedorCamposRegistroParticipantes>
                            <TituloCamposRegistro>CUIT:</TituloCamposRegistro>
                            <CampoParticipante type="text" />
                        </ContenedorCamposRegistroParticipantes>

                        <ContenedorCamposRegistroParticipantes>
                            <TituloCamposRegistro>País:</TituloCamposRegistro>
                            <CampoParticipante type="text" />
                        </ContenedorCamposRegistroParticipantes>

                        <ContenedorCamposRegistroParticipantes>
                            <TituloCamposRegistro>Productos asociados:</TituloCamposRegistro>
                            <CampoParticipante type="text" />
                        </ContenedorCamposRegistroParticipantes>

                        <ContenedorCamposRegistroParticipantes>
                            <TituloCamposRegistro>Estado:</TituloCamposRegistro>
                            <SelectEstadoParticipante
                                estado={estado}
                                setEstado={setEstado}
                            />
                        </ContenedorCamposRegistroParticipantes>


                        <ContenedorBotonesRegistro>
                            <BotonIngresoRegistro typeof='submit'>Registrar</BotonIngresoRegistro>
                            <BotonRegresar onClick={volverAMercaderias}>Volver a mercaderías</BotonRegresar>
                        </ContenedorBotonesRegistro>


                    </FormularioRegistro>

                </FormularioParticipantes>
            </ContenedorRegistroParticipante>

            <FondoColorParticipantes />

        </ContenedorGeneralRegistroParticipante>

        </>
    )
}

const ContenedorGeneralRegistroParticipante = styled.div`
    width: 100%;
    height: 708px;
    display: flex;
`;

const ContenedorRegistroParticipante = styled.div`
    width: 70%;
    height: 950px;
`;

const FondoColorParticipantes = styled.div`
    width: 30%;
    height: 950px;
    background: linear-gradient(0deg, #1A1594, #1A1594 30%,#257cb6);
`;

const FormularioParticipantes = styled.div`
   width: 70%;
   height: 870px;
   margin-top: 2%;
   margin-left: 7%;
   border: 2px solid #1A1594;
   border-radius: 20px;
`;

const EncabezadoFormularioParticipantes = styled.div`
   height: 80px;
   background: linear-gradient(0deg, #1A1594, #1A1594 30%,#257cb6);
   color: #fff;
   border-top-left-radius: 18px;
   border-top-right-radius: 18px;
   padding-top: 1.5%;
`;

const ContenedorCamposRegistroParticipantes = styled.div`
  height: 70px;
  margin-top: 2%;
  margin-left: 5%;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const CampoParticipante = styled.input`
  width: 95%;
  height: 40px;
  margin-top: 1%;
  padding: 1%;
  border-radius: 10px;
  border: 1px solid #1A1594;
  color: #1A1594;

  &:placeholder {
    color: rgb(148, 147, 147);
  }
`;



export default RegistrarParticipanteComex;
