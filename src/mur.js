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

</div>
}
