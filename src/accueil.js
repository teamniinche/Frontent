import React from 'react'
import {NousContacter} from './nousContacter.js';
import {nos_actions, teamEnChiffres } from './iterables.js';
import Mur from './mur.js'
import Actu from './actu.js';
import {Cards} from './cards.js';
import { Partnaires } from './campagnes-tn/items.js';
import { Titre } from './components/titres.js';
import { TeamEnChiffres } from './components/partenaires.js';
import { Bureau } from './components/bureau.js';
import './css/scrollItems.css';


export default function Accueil() {


  return <>
      <Mur/>
      <div className='accueil'>
          <div className="scrollItems" style={{minWidth:'96%',justifyContent:'center',width:"96%",display:'flex',background:'linear-gradient(to left top, white,rgba(0,90,90,0.8))',flexDirection:'row',gap:'2%',marginTop:'-13rem',padding:'0px 2%',paddingBottom:'2rem',}}>
            {/* <div style={{width:"40%",color:'black',fontWeight:'bold',zIndex:'10',}}>
              testons pour voir si ce sera ce qu'on veux ou bien ce sera autre !
            </div> */}
            {Object.values(nos_actions).map(mission=><Cards mission={mission}/>)}
          </div>
          <div style={{width:'70%',margin:'auto', fontFamily:'sans-serif',textAlign:'justify',letterSpacing:'0.1rem',lineHeight:'1.5rem',}}>
            <Titre text="Aux origines de Team Niintche"/>
            <p style={{marginBottom:"1.5rem",}}>La <strong>Team Niintche</strong> est née d'une rencontre d'acteurs communautaires qui ont eu à intervenir dans diverses activités dans le cadre de leurs engagements pour la communauté. Ainsi durant la <strong>pandémie de 2019</strong>, ils ont très tot senti la necessité d'organiser la communauté pour faire face au COVID 19. Distribudtion de masques,mise en placee de point de sensibilisation,confinement consensuel ont été leur fort durant toute la période du COVID.
            </p><p>Lorsque les autorités ont décidé de réouvrir les classes après un long moment de vacances,ils se sont engagés à <strong>nettoyer les écoles</strong> pour bien recevoir les élèves.Mais devant <strong>l'état inadapté des établissements visités</strong> particulièrement des toilettes,la volonté de <strong>refectionner ces lieux cruciaux de l'éducation</strong> a émergé et ce fut le départ de l'aventure <strong>TEAM NIINTCHE</strong>, un Consortium d'Associations de Proximité (<strong>CAP</strong>) réunis pour un objectif commun: <i><strong>Impulser une nouvelle dynamique d'engagement volontaire et participatif au service de la communauté en général , de l'École publique Sénégalaise en particulier</strong></i>.
            </p>
          </div>
          <div style={{width:'100%',background:'linear-gradient(to right bottom,white, rgba(0,100,0,0.1))',}}>
            <Titre text="Team Niintche en chiffres"/>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',width:'92%',alignItems:'center',flexWrap:'wrap',marginLeft:'8%',}}>
              {Object.values(teamEnChiffres).map(item=><TeamEnChiffres n={item.n} t={item.t} />)}
            </div>
          </div>
          <div style={{width:'100%',margin:'auto',}}>
            <Bureau/>
          </div>
          <div style={{width:'80%',padding:'0px 10%',backgroundColor:'whitesmoke',}}>
            <Titre text="Nos Partenaires"/>
            <Partnaires/>
          </div>
          {/* <Actu/> */}
          <NousContacter/>
      </div>
    </>
}