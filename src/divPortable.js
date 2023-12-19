import React from 'react';
import menu from '../src/images/menu.ico';
import './divPortable.css';
import './style.css';

export default function TitreRealisations(props) {
    function handleClick(){
        let myEement=document.getElementsByClassName("sideBar")[0];
        let tronc=document.getElementsByClassName("tronc")[0];
        myEement.style.display=myEement.style.display==="none"?"inline-block":"none";
        tronc.style.display=myEement.style.display==="none"?"inline-block":"none";
        }
    let ch=props.ChFocus==="John F.J.K"?"":props.ChFocus;
  return <>
    {/* <div id='divPortable' style={{textOverflow: "ellipsis",}} >
        <img src={menu} id="imgReal" alt=""/>
        <span id="spanReal" style={{textOverflow: "no-wrap",}}>25 Réalisatisations  <span style={{color:"blue",fontWeight:"bold"}}>{' >>>'}</span> {props.ChFocus}
        {/*----------------------------------------------- {props.nombre} */}
        {/* </span> */}
    {/* </div> */}
    {/* <div class="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
  <div class="bg-dark p-4">
    <h5 class="text-body-emphasis h4">Collapsed content</h5>
    <span class="text-body-secondary">Toggleable via the navbar brand.</span>
  </div>
</div> */}
<nav class="navbar navbar-dark bg-light" id='divPortable' onClick={handleClick}>
  <div class="container-fluid bg-light">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <span id="spanReal" style={{textOverflow: "no-wrap",}}>25 Réalisatisations  <span style={{color:"blue",fontWeight:"bold"}}>{' >>>'}</span> {ch}
        {/*----------------------------------------------- {props.nombre} */}
    </span>
  </div>
</nav>
 </>
}
