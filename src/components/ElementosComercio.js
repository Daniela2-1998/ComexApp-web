import styled from "styled-components";


const ContenedorOpciones = styled.div`
  width: 100%;
  height: 650px;
  margin-top: 5%;


  @media (max-width: 900px) {
    height: 1300px;
    margin-top: 0%;
  }
`;


const EspacioDeOpciones = styled.div`
  width: 100%;
  height: 400px;
  background: -webkit-linear-gradient(144deg,#1A1594, #1A1594 30%,#257cb6);
  display: flex;


  @media (max-width: 1100px) {
    height: 300px;
  }

  @media (max-width: 900px) {
    width: 50%;
    height: 1300px;
    margin-left: 25%;
    display: flex;
    flex-direction: column;
  }

  
  @media (max-width: 700px) {
    width: 50%;
    height: 1300px;
    margin-left: 25%;
    display: flex;
    flex-direction: column;
  }
`;


const CardOpcion1 = styled.div`
  width: 25%;
  height: 400px;
  margin-top: 10%;
  margin-left: 7%;
  padding: 2%;
  border: 2px solid #fff;
  border-radius: 20px;
  position: absolute;
  background-color: #242424;


  @media (max-width: 900px) {
    height: 350px;
    width: 65%;
    margin-left: -25%;
    position: relative;
  }

  @media (max-width: 700px) {
    height: 350px;
    width: 85%;
  }

  @media (max-width: 550px) {
    height: 350px;
    width: 95%;
  }

  @media (max-width: 500px) {
    height: 350px;
    width: 105%;
  }
`;

const CardOpcion2 = styled.div`
  width: 25%;
  height: 400px;
  margin-top: 10%;
  margin-left: 37%;
  padding: 2%;
  border: 2px solid #fff;
  border-radius: 20px;
  position: absolute;
  background-color: #242424;


  @media (max-width: 900px) {
    height: 350px;
    width: 65%;
    margin-left: 65%;
    position: relative;
  }

  @media (max-width: 700px) {
    height: 350px;
    width: 85%;
    margin-left: 55%;
  }

  @media (max-width: 550px) {
    height: 350px;
    width: 95%;
    margin-left: 40%;
  }

  @media (max-width: 500px) {
    height: 350px;
    width: 105%;
  }
`;


const CardOpcion3 = styled.div`
  width: 25%;
  height: 400px;
  margin-top: 10%;
  margin-left: 67%;
  padding: 2%;
  border: 2px solid #fff;
  border-radius: 20px;
  position: absolute;
  background-color: #242424;


  @media (max-width: 900px) {
    height: 350px;
    width: 65%;
    margin-left: -25%;
    position: relative;
  }

  @media (max-width: 700px) {
    height: 350px;
    width: 85%;
  }

  @media (max-width: 550px) {
    height: 350px;
    width: 95%;
  }

  @media (max-width: 500px) {
    height: 350px;
    width: 105%;
  }
`;



const CardOpcionTitulo = styled.h3`
  font-size: 2rem;
  color: #fff;
  text-align: center;
`;


const CardBoton = styled.button`
  width: 84%;
  height: 50px;
  margin-top: -25%;
  margin-left: -42%;
  position: absolute;
  border-radius: 10px;
  border: none;
  background: #fff;
  color: #242424;
  font-weight: bold;

  &:hover {
    background: #cecdcd;
    color: #090909;
    font-weight: bolder;
    font-size: large;
  }


  @media (max-width: 1100px) {
    margin-top: -60%;
  }
`;

export {ContenedorOpciones, EspacioDeOpciones, CardOpcion1, CardOpcion2, CardOpcion3, CardOpcionTitulo, CardBoton};