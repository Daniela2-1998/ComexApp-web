import styled from "styled-components";

// -------------------------------------------- COMPONENTES TABLAS DE VISUALIZACIÓN  ---------------------------------------------------------

// Título de la tabla.
const ContenedorTituloTabla = styled.div`
  width: 100%;
  height: 70px;
  padding: 1%;
  background-color: #1A1594 !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #fff;
  text-align: left;
  display:flex;
  justify-content: space-between;

  /* --------------------------- RESPONSIVE POR TAMAÑO DE PANTALLAS  --------------------------------------------------------------------------*/


  @media (max-width: 800px) {
    width: 110%;
  }
  
`;


// Encabezado de la tabla.
const EncabezadoTabla = styled.th`
  background-color: #1A1594 !important;  
  border-top: 2px solid #fff;
  color: #fff !important;
`;


// Encabezado de la tabla.
const RegistroTabla = styled.th`
  background-color: rgb(239, 238, 239) !important;
`;

export { ContenedorTituloTabla, EncabezadoTabla, RegistroTabla };