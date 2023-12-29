import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import './lateam.css';
import {Error} from './nous.js'
import {serverUrl} from './root.js'
import { loader } from './toast.js';

const hostUrl=serverUrl
export default function LaTeam() {
  const [rubriques, setRubriques] = useState([]);
// const [error, setError] = useState('');

useEffect(() => {
  // document.getElementsByClassName('header')[0].style.height="0px"; //"0px" doit etre dynamisé
  fetch(hostUrl+'api/rubriques/allrubriques')
    .then(response => response.json())
    .then(rubriques => setRubriques(rubriques))
    .catch(error => <Error error={error.message}/>); // Stocke uniquement le message de l'erreur
}, []);

// if (error) {
//   return <Error error={error.message}/>;
// }
// const Rubriques=['Motivations','Missions','Historique','Réalisations','Histoires']

  return (
    <>
    <h6 id="tec" style={{height:'0px',margin:'0px'}}>'</h6>
    <div className='teamBody'>
      <ul id="entete">
        <li><a href='#hist'>Motivations</a></li>
        <li><a href='#1'>Missions</a></li>
        <li><a href='#2' id="hist">Historique</a></li>
        <li><a href='#3'>Réalisations</a></li>
        <li><a href='#4'>Histoires</a></li>
      </ul>
      <div>
        { 
          rubriques?rubriques.map(item => (
          <Lateam key={item.titre} rubrique={item} /> 
        )):loader}
      </div>
    </div>
    </>
  );
}


function Lateam(props) {
  const styleLink = {
    display: "inline",
    fontWeight: "bold",
    fontSize: "1em",
    color: "rgba(0, 0, 150, 1)",
    textDecoration: "underline"
  };

  const spanElement = (
    <Link to="/" style={styleLink}>
      Voir page dédiée aux réalisations
      <br />
    </Link>
  );

  const content = props.rubrique.titre === "Réalisations" ? (
    <>
      Pour plus de détails, {spanElement} {props.rubrique.redaction}
    </>
  ) : (
    props.rubrique.redaction
  );

  return (
    
    <div className="rubrique" id={props.rubrique.id}>
      <h3 style={{position:"sticky",top:"120px"}}>
        <a href="#tec" style={{ letterSpacing: "2px",backgroundColor:"white"}}>
          {props.rubrique.titre} 🔺
        </a>
      </h3>
      <p>{content}</p>
    </div>
  );
}


