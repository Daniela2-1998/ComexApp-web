import React, {useState, useEffect} from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Imports estilos
import styled from 'styled-components';
import '../css/Participantes.css';

// Imports componentes
import { FormularioRegistro, TituloCamposRegistro, ContenedorBotonesRegistro, BotonIngresoRegistro } from '../components/ElementosFormulario';
import SelectParticipanteComex from '../components/SelectParticipanteComex';
import SelectEstadoParticipante from '../components/SelectEstadoParticipante';
import BotonRegresar from '../components/BotonRegresar';
import Alerta from '../components/Alerta';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);




function EditarParticipanteComex() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();

    const { id } = useParams();

    const [empleado, setEmpleado] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [mail, setMail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [CUIT, setCUIT] = useState('');
    const [pais, setPais] = useState('');
    const [productosAsociados, setProductosAsociados] = useState('');
    
    const [participante, setParticipante] = useState('exportador');
    const [estado, setEstado] = useState('activo');

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');
  
    const navigate = useNavigate();



    // Función volver atrás.
    const volverAMercaderias = () => {
        navigate(`/comercio-exterior/${nombre}/${usuario}/${rol}/${sesion}`);
    }


    const obtenerParticipanteById = async (id) => {
        const participanteFirebase = await getDoc(doc(db, "participantesComex", id));
    
        if (participanteFirebase.exists()) {
            setEmpleado(participanteFirebase.data().empleado);
            setEmpresa(participanteFirebase.data().empresa);
            setMail(participanteFirebase.data().mail);
            setTelefono(participanteFirebase.data().telefono);
            setCUIT(participanteFirebase.data().CUIT);
            setPais(participanteFirebase.data().pais);
            setProductosAsociados(participanteFirebase.data().productos);
            setParticipante(participanteFirebase.data().participante);
            setEstado(participanteFirebase.data().estado);
        } else {
            console.log("No existe el participante solicitado.");
        }
    }
    
    // La función se ejecuta una única vez al abrir la página.
    useEffect(() => {
       obtenerParticipanteById(id)
    }, []);

    

    const actualizarParticipante = async (e) => {
        e.preventDefault();

        const expresionRegularMail = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

        if (!expresionRegularMail.test(mail)) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "Por favor ingresa un mail válido para el usuario."
            });
            return;
        }


        const part = doc(db, "participantesComex", id);
        const data = { empleado: empleado, empresa: empresa, cargo: participante, mail: mail, telefono: telefono, CUIT: CUIT, pais: pais, productos: productosAsociados, estado: estado };
        await updateDoc(part, data);
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
                        <h1>Editar participante</h1>
                    </EncabezadoFormularioParticipantes>

                        <FormularioRegistro onSubmit={actualizarParticipante}>

                            <ContenedorCamposRegistroParticipantes>
                                <TituloCamposRegistro>Empleado:</TituloCamposRegistro>
                                <CampoParticipante
                                    value={empleado}
                                    onChange={(e) => setEmpleado(e.target.value)}
                                    type="text"
                                />
                            </ContenedorCamposRegistroParticipantes>

                            <ContenedorCamposRegistroParticipantes>
                                <TituloCamposRegistro>Cargo:</TituloCamposRegistro>
                                <SelectParticipanteComex
                                    participante={participante}
                                    setParticipante={setParticipante}
                                />
                            </ContenedorCamposRegistroParticipantes>

                            <ContenedorCamposRegistroParticipantes>
                                <TituloCamposRegistro>Empresa:</TituloCamposRegistro>
                                <CampoParticipante
                                    value={empresa}
                                    onChange={(e) => setEmpresa(e.target.value)}
                                    type="text"
                                />
                            </ContenedorCamposRegistroParticipantes>

                            <ContenedorCamposRegistroParticipantes>
                                <TituloCamposRegistro>Mail:</TituloCamposRegistro>
                                <CampoParticipante
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)}
                                    type="text"
                                />
                            </ContenedorCamposRegistroParticipantes>

                            <ContenedorCamposRegistroParticipantes>
                                <TituloCamposRegistro>Teléfono:</TituloCamposRegistro>
                                <CampoParticipante
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    type="text"
                                />
                            </ContenedorCamposRegistroParticipantes>

                            <ContenedorCamposRegistroParticipantes>
                                <TituloCamposRegistro>CUIT:</TituloCamposRegistro>
                                <CampoParticipante
                                    value={CUIT}
                                    onChange={(e) => setCUIT(e.target.value)}
                                    type="text"
                                />
                            </ContenedorCamposRegistroParticipantes>

                            <ContenedorCamposRegistroParticipantes>
                                <TituloCamposRegistro>País:</TituloCamposRegistro>
                                <CampoParticipante
                                    value={pais}
                                    onChange={(e) => setPais(e.target.value)}
                                    type="text"
                                />
                            </ContenedorCamposRegistroParticipantes>

                            <ContenedorCamposRegistroParticipantes>
                                <TituloCamposRegistro>Productos asociados:</TituloCamposRegistro>
                                <CampoParticipante
                                    value={productosAsociados}
                                    onChange={(e) => setProductosAsociados(e.target.value)}
                                    type="text"
                                />
                            </ContenedorCamposRegistroParticipantes>

                            <ContenedorCamposRegistroParticipantes>
                                <TituloCamposRegistro>Estado:</TituloCamposRegistro>
                                <SelectEstadoParticipante
                                    estado={estado}
                                    setEstado={setEstado}
                                />
                            </ContenedorCamposRegistroParticipantes>


                            <ContenedorBotonesRegistro>
                                <BotonIngresoRegistro typeof='submit'>Actualizar</BotonIngresoRegistro>
                                <BotonRegresar onClick={volverAMercaderias}>Volver a mercaderías</BotonRegresar>
                            </ContenedorBotonesRegistro>


                        </FormularioRegistro>

                </FormularioParticipantes>
            </ContenedorRegistroParticipante>

            <FondoColorParticipantes />

        </ContenedorGeneralRegistroParticipante>


            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />

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
    height: 1150px;
`;

const FondoColorParticipantes = styled.div`
    width: 30%;
    height: 1150px;
    background: linear-gradient(0deg, #1A1594, #1A1594 30%,#257cb6);
`;

const FormularioParticipantes = styled.div`
   width: 70%;
   height: 1050px;
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



export default EditarParticipanteComex;
