import React from 'react'
import { Link } from 'react-router-dom'
import './mur.css'
const imageMurale=require('./images/patriarkat.jpg')

export default function Mur() {
  return <div className="header">
  <img className="imageDeFont" src={imageMurale} alt="murale"/>
  <div className="divInsConnect" style={{alignItems:"center",}}>
      <Link className="insConnect" to="/connexion">Se connecter</Link>
      <span id="barDeSix"> | </span>
      <Link className="insConnect" to="/connexion/inscription">S'inscrire</Link>
  </div>
  <h4 style={{lineHeight:"1rem",display:"inlline-block",width:"100%",color:"rgba(255,255,255,0.5",fontFamily:"sans-serif",fontSize:"1rem",position:"absolute",top:"60%",textAlign:"center",}}>
    <span style={{fontFamily:"'Sofia', sans-serif",fontSize:"3rem",color:"rgba(255,255,255,0.7",}}>TeamNiintche</span>
    <br/>
    Volontaires de la citoyenneté active
  </h4>
</div>
}
