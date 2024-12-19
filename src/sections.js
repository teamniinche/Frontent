import React from 'react';
// import {NousContacter} from './nousContacter.js';
import Footer from './footer.js';
import './css/sections.css';
import  SideBar from './sideBar.js';
/* <img src="/filigrane.jpg" alt="filigrane" style={{margin:"-40px 0px",zIndex:"-10",padding:"0px",height:"70vh",width:"100vw"}} id="filigrane"/> */

export default function Sections() {

    return (
      <div className='sections'>
          <Footer/>
          <SideBar/>
      </div>
    )
}
