import React from 'react';
import './css/divPortable.css';
import './css/style.css';

export default function TitreRealisations(props) {
    function handleClick(){
        let myEement=document.getElementById("div-avec-map");
        if(myEement)myEement.style.display="flex";
        }
    let ch=props.ChFocus==="John F.J.K"?"":props.ChFocus;
  return <>
    <nav class="navbar navbar-dark bg-light" id='divPortable' onClick={handleClick}>
      <div class="container-fluid bg-light">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <span id="spanReal" style={{textOverflow: "no-wrap",}}>32 Réalisatisations  <span style={{color:"blue",fontWeight:"bold"}}>{' >'}</span> {ch}
            {/*----------------------------------------------- {props.nombre} */}
        </span>
      </div>
    </nav>
 </>
}
