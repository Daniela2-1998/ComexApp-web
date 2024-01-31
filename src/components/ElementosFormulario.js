import styled from "styled-components";

const ContenedorFormulario = styled.div`
  width: 50%;
  height: 670px;
  margin-top: 1%;
  margin-left: 30%;
  border: 2px solid grey;
  border-radius: 20px
`;

const ContenedorTituloRegistro = styled.div`
  width: 100%;
  height: 60px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background-color: #1A1594;
  color: #fff;
`;

const FormularioRegistro = styled.form`
  height: 510px;
  width: 100%;
`;

const ContenedorCamposRegistro = styled.div`
  height: 70px;
  margin-top: 2%;
  margin-left: 5%;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const TituloCamposRegistro = styled.label`
  color: #1A1594;
  font-weight: bold;
`;

const CamposRegistro = styled.input`
  width: 82%;
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

const EspacioSelectsRegistro = styled.div`
  width: 80%;
  height: 70px;
  margin-left: 1%;
  display: flex;
  justify-content: space-between;
`;

const ContenedorBotonesRegistro = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const BotonIngresoRegistro = styled.button`
  height: 50px;
  width: 25%;
  padding: 1.5%;
  color: #fff;
  background-color: #1A1594 !important;
  border-radius: 20px;
  margin-top: 5%;

  &:hover {
    background-color: #100d58 !important;
    font-size: large;
  }
`;


export {ContenedorFormulario, ContenedorTituloRegistro, FormularioRegistro, ContenedorCamposRegistro, TituloCamposRegistro, 
  CamposRegistro, EspacioSelectsRegistro, ContenedorBotonesRegistro, BotonIngresoRegistro};