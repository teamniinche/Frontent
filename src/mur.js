import React from 'react'
import { Link } from 'react-router-dom'
import './mur.css'
const imageMurale=require('./images/patriarkat.jpg')

export default function Mur() {
  return <div className="header">
  <img className="imageDeFont" src={imageMurale} alt="murale"/>
  <div className="divInsConnect">
      <Link className="insConnect" to="/connexion">Se connecter</Link>
      <span id="barDeSix"> | </span>
      <Link className="insConnect" to="/connexion/inscription">S'inscrire</Link>
  </div>

</div>
}
