import React from 'react'
import { Link } from 'react-router-dom'
import './css/mur.css'
import Caroussel from './components/carousel';
import { imagesMur } from './iterables';

export default function Mur() {
  return <div className="header">
  {/* <img className="imageDeFont" src="/photoDeMur.jpg" alt="murale"/> */}
  <Caroussel propStyle={{cl:"imageDeFont",style:{border:"",borderRadius:"0px",}}} roof="img-illustratives/" images={imagesMur}/>
  <div className="divInsConnect">
      <Link className="insConnect" to="/connexion">Se connecter</Link>
      <span id="barDeSix"> | </span>
      <Link className="insConnect" to="/connexion/inscription">S'inscrire</Link>
  </div>
  <h4 style={{lineHeight:"1rem",display:"inline-block",width:"100%",color:"rgba(255,255,255,0.5",fontFamily:"sans-serif",fontSize:"1rem",position:"absolute",top:"60%",textAlign:"center",}}>
    <span style={{fontFamily:"'Sofia', sans-serif",fontSize:"3rem",color:"rgba(255,255,255,0.7",}}>TeamNiintche</span>
    <br/>
    Volontaires de la citoyenneté active
  </h4>
</div>
}
