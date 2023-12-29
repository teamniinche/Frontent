import React from 'react';
import {NousContacter} from './nousContacter.js';
import Mur from './mur.js'
import Actu from './actu.js';
import './accueil.css';

export default function Accueil() {


  return <>
      <Mur/>
      <div className='accueil'>
          <Actu/>
          {/* <img src="/filigrane.jpg" alt="filigrane" style={{margin:"-40px 0px",zIndex:"-10",padding:"0px",height:"70vh",width:"92vw"}} id="filigrane"/> */}
          <NousContacter/>
      </div>
    </>
}