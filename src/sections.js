import React,{useEffect} from 'react';
import {NousContacter} from './nousContacter.js';
import  SideBar from './sideBar.js';
import './sections.css';

export default function Sections() {
  // useEffect(()=>{document.getElementsByClassName('header')[0].style.height="0vh";})


  return (
    <div className='sections'>
        <NousContacter/>
        <img src="/filigrane.jpg" alt="filigrane" style={{margin:"-40px 0px",zIndex:"-10",padding:"0px",height:"70vh",width:"100vw"}} id="filigrane"/>
        <SideBar/>
    </div>
  )
}
