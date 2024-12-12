import React from 'react'
import { Link } from 'react-router-dom'
import './css/mur.css'
import Caroussel from './components/carousel';
import { imagesMur,notre_mission } from './iterables';

export default function Mur() {
  return <div className="header">
  {/* <img className="imageDeFont" src="/photoDeMur.jpg" alt="murale"/> */}
  <Caroussel propStyle={{cl:"imageDeFont",style:{border:"",borderRadius:"0px",}}} roof="img-illustratives/" images={imagesMur}/>
  <div className="divInsConnect">
      <Link className="insConnect" to="/connexion">Se connecter</Link>
      {/* <span id="barDeSix"> | </span>
      <Link className="insConnect" to="/connexion/inscription">S'inscrire</Link> */}
  </div>
  <h4 style={{lineHeight:"1rem",display:"inline-block",width:"100%",color:"rgba(255,255,255,0.7",fontFamily:"sans-serif",fontSize:"1rem",position:"absolute",top:"22%",textAlign:"center",}}>
    <span id="team-sur-mur" style={{fontFamily:"'Sofia', sans-serif",fontSize:"3rem",color:"rgba(255,255,255,0.9",}}>TeamNiintche</span>
    <br/>
    Bénévoles de la citoyenneté active
    <br/><br/>
    <span style={{fontFamily:"sans-serif",letterSpacing:"0.2rem",textAlign:"center",fontSize:"1rem",color:"rgba(255,255,255,1)",maxWidth:"300px",}}><i class="bi bi-quote" style={{fontSize:"1.4rem",}}></i> {notre_mission.p1} <br/><span style={{textDecoration:"underline 5px rgba(255,255,255,0.4)",}}>{notre_mission.p2}</span> <i class="bi bi-quote" style={{fontSize:"1rem",}}></i></span>
  </h4>
</div>
}
