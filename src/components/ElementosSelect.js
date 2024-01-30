import styled from 'styled-components';
import theme from '../theme';


// -------------------------------------------- COMPONENTES TABLAS DE VISUALIZACIÓN  ---------------------------------------------------------


// Contenedor del select
const ContenedorSelect = styled.div`
    height: 40px;
    width: 100%;
    margin-left: 6%;
    background: ${theme.grisClaro};
    cursor: pointer;
    border-radius: 10px; 
    position: relative;
    padding: 0px 20px; 
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;
    
    &:hover {
        background: ${theme.grisClaro2};
    }
`;
 

// Contenedor de opción seleccionada
const OpcionSeleccionada = styled.div`
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
 

// Contenedor de opciones
const Opciones = styled.div`
    width: 100%;
    background: ${theme.grisClaro};
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    border-radius: 10px ; 
    max-height: 300px; 
    overflow-y: auto;
`;
 

// Contenedor de opción
const Opcion = styled.div`
    padding: 20px;
    display: flex;

    &:hover {
        background: ${theme.grisClaro2};
    }
`;


export {ContenedorSelect, OpcionSeleccionada, Opciones, Opcion};