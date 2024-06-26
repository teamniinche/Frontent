// import React from 'react';
import {NousContacter} from './nousContacter.js';
import Mur from './mur.js'
import Actu from './actu.js';
// import './accueil.css';

export default function Accueil() {


  return <>
      <Mur/>
      <div className='accueil'>
          <Actu/>
          <NousContacter/>
      </div>
    </>
}