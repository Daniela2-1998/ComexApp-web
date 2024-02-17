import React from "react";
import styled from "styled-components";

const Titulo = styled.h1`
   margin-top: 3%;
   color: #1A1594;
`;

const ContenedorCardsParticipantes = styled.div`
   width: 60%;
   margin-left: 15%;
   justify-content: space-evenly;
   display: grid;
   grid-gap: 0%;
   grid-template-columns: 50% 50%;
   grid-template-rows: fit-content;


   @media (max-width: 1100px) {
    width: 80%;
    margin-left: 5%;
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;

const CardParticipante = styled.div`
   width: 80%;
   margin-top: 7%;
   margin-left: 25%;
   margin-right: 10%;
   border: 1px solid #1A1594;
   border-radius: 20px;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

   
  @media (max-width: 1100px) {
    width: 90%;
    margin-right: 15%;
  }

  @media (max-width: 700px) {
    width: 80%;
    margin-left: 15%;
  }
`;

const ContenedorNombreParticipante = styled.div`
   height: 50px;
   background: linear-gradient(0deg, #1A1594, #1A1594 30%,#257cb6);
   color: #fff;
   font-weight: bolder;
   text-align: center;
   margin-bottom: 5%;
   border-top-left-radius: 20px;
   border-top-right-radius: 20px;
`;

const DescripcionParticipante = styled.div`
  display: flex;
  flex-direction: column;
`;

const InformacionParticipante = styled.label`
  color: #1A1594;
  font-weight: bold;
  text-align: left;
  margin-left: 10%;
  margin-bottom: 5%;
`;

const IDParticipante = styled.label`
  height: 30px;
  width: 50%;
  background: linear-gradient(0deg, #257cb6, #257cb6 30%,#1A1594);
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-top: -5%;
  margin-left: 25%;
  margin-bottom: 5%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const ParticipanteActivo = styled.label`
  background-color: rgb(3, 133, 3);
  color: #fff;
  width: 45%;
  padding: 2%;
  margin-left: 25%;
  margin-bottom: 5%;
  border-radius: 20px;
  text-align: center;
  color: rgb(231, 229, 229);
  font-weight: bold;
  text-transform: capitalize;
`;

const ParticipanteInactivo = styled.label`
  background-color: rgb(238, 7, 7);
  color: #fff;
  width: 45%;
  padding: 2%;
  margin-left: 25%;
  margin-bottom: 5%;
  border-radius: 20px;
  text-align: center;
  color: rgb(231, 229, 229);
  font-weight: bold;
  text-transform: capitalize;
`;



export {Titulo, ContenedorCardsParticipantes, CardParticipante, ContenedorNombreParticipante, DescripcionParticipante, 
   InformacionParticipante, IDParticipante, ParticipanteActivo, ParticipanteInactivo};