import styled from "styled-components";


const ContenedorMercaderias = styled.div`
  width: 100%;
`;

const TituloMercaderias = styled.h1`
  margin-top: 2%;
  color: #1A1594;
`;

const EspacioBotonesMercaderia = styled.div`
  height: 80px;
  width: 70%;
  margin-left: 15%;
  margin-bottom: 2%;
  display: flex;
  justify-content: space-evenly;

  
  @media (max-width: 900px) {
    width: 90%;
    height: 100px;
    margin-left: 5%;
  }
`;

const BotonesMercaderias = styled.div`
  height: 50px;
  width: 25%;
  margin-top: 5%;
  padding: 1%;
  border-radius: 10px !important;
  border: none;
  color: #fff;

  
  @media (max-width: 900px) {
    width: 30%;
  }
`;

const ContenedorCardsMercaderias = styled.div`
  width: 100%;
  margin-top: 5%;
  margin-left: -3%;
  justify-content: space-evenly;
  display: grid;
  grid-gap: 0%;
  grid-template-columns: 15% 15% 15%;
  grid-template-rows: fit-content;


    
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;


const CardMercaderias = styled.div`
  width: 150%;
  margin-top: 7%;
  margin-bottom: 10%;
  border: 5px solid #242424;
  border-radius: 20px;
  background: linear-gradient(0deg, #1A1594, #1A1594 30%,#257cb6);

    
  @media (max-width: 900px) {
    width: 50%;
    margin-left: 25%;
  }
`;

const NombreMercaderia = styled.h3`
  margin-top: 2%;
  color: #1A1594;
  color: #fff;
  margin-top: 3%;
`;

const ContenedorInformacionMercaderias = styled.div`
  margin-left: 5%;
  text-align: left;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const DescripcionMercaderias = styled.label`
  margin-top: 7%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 7%;
`;

const ContenedorPrecioYStockMercaderias = styled.div`
  width: 80%;
  height: 40px;
  margin-left: 7%;
  margin-bottom: 5%;
  display: flex;
  justify-content: space-evenly;


  @media (max-width: 1300px) {
    width: 90%;
    margin-left: 0%;
  }
`;

const PrecioYStockMercaderias = styled.label`
  width: 40%;
  padding: 2%;
  border-radius: 20px;
  text-align: center;
  background: #242424;


  @media (max-width: 1300px) {
    width: 60%;
  }
`;


const EstadoMercaderias = styled.div`
  width: 50%;
  margin-left: 23%;
  border-radius: 20px;
  padding: 1%;
  text-align: center;
  font-weight: bold;
  text-transform: capitalize;
`;

const ProveedorMercaderias = styled.label`
  margin: 5%;
`;

const CategoriaMercaderias = styled.label`
  height: 50px;
  width: 80%;
  padding: 4%;
  margin-left: 7%;
  border-radius: 20px;
  border: none;
  text-align: center;
  background: #242424;
`;


const OpcionesIndividualesMercaderias = styled.div`
  margin-top: 10%;
  margin-bottom: 7%;
`;


export {ContenedorMercaderias, TituloMercaderias, EspacioBotonesMercaderia, BotonesMercaderias, ContenedorCardsMercaderias, 
    CardMercaderias, NombreMercaderia, ContenedorInformacionMercaderias, DescripcionMercaderias,
    ContenedorPrecioYStockMercaderias, PrecioYStockMercaderias, EstadoMercaderias, ProveedorMercaderias, CategoriaMercaderias,
    OpcionesIndividualesMercaderias
};