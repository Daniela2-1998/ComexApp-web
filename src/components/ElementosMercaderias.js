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



// ELEMENTOS DEL LISTADO
const ContenedorListado = styled.div`
  width: 90%;
  height: fit-content;
  margin-top: 0%;
  margin-left: 7%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
`;

const Elemento = styled.div`
  width: 95%;
  height: fit-content;
  border-radius: 20px;
  margin-top: 4%;
  background: rgb(231, 229, 229);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  
  text-align: left;
  padding-left: 3%;
  border-left: 20px solid #1A1594;
`;

const TituloMercaderiaListado = styled.h5` 
  color: #1A1594 !important;
  margin-top: 1%;
  margin-bottom: 1%;
  font-weight: bolder;
  text-decoration-line: underline;
`;

const ContenidoListado = styled.div` 
  width: 60%;
`;

const DescripcionMercaderiaListado = styled.label` 
  color: #1A1594;
  margin-bottom: 2%;
`;

const ProveedorListado = styled.div` 
  width: 40%;
  margin-bottom: 3%;
  color: #1A1594;
  font-weight: bolder;
  text-transform: capitalize;
`;

const ContenedorPrecioStockListado = styled.div` 
  width: 60%;
`;

const PrecioStockListado = styled.label` 
  width: 30%;
  padding: 2%;
  margin-right: 2%;
  margin-bottom: 3%;
  border-radius: 20px;
  text-align: center;
  background: #1A1594;
  color: rgb(231, 229, 229);


  @media (max-width: 850px) {
    width: 50%;
  }

  @media (max-width: 550px) {
    width: 80%;
  }
`;


const EstadoListado = styled.label` 
  width: 37%;
  padding: 2%;
  margin-bottom: 3%;
  border-radius: 20px;
  text-align: center;
  color: rgb(231, 229, 229);
  font-weight: bold;
  text-transform: capitalize;


  @media (max-width: 550px) {
    width: 70%;
  }
`;

export {ContenedorMercaderias, TituloMercaderias, EspacioBotonesMercaderia, BotonesMercaderias, ContenedorCardsMercaderias, 
    CardMercaderias, NombreMercaderia, ContenedorInformacionMercaderias, DescripcionMercaderias,
    ContenedorPrecioYStockMercaderias, PrecioYStockMercaderias, EstadoMercaderias, ProveedorMercaderias, CategoriaMercaderias,
    OpcionesIndividualesMercaderias, 

    ContenedorListado, Elemento, TituloMercaderiaListado, DescripcionMercaderiaListado, ContenidoListado, ProveedorListado,
    ContenedorPrecioStockListado, PrecioStockListado, EstadoListado
};