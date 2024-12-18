import React,{useEffect} from 'react';
import {useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import { useSelector} from 'react-redux'
import { MapContainer, TileLayer,Marker,Popup} from 'react-leaflet'
import {Icon} from 'leaflet';import "leaflet/dist/leaflet.css";

import { Karousel } from './campagnes-tn/items';
import { sites } from './iterables';
import './css/leafletCss.css'


export default function Map(props) {
    const ints=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    const [center,setCenter]=useState([14.5998233, -14.7402745])
    const [kZoom,setKZoom]=useState(0)
    const [coord,setCoord]=useState(null)
    const mapRef=useRef(null);
    // un tableau de refs qui permet une ref à chaque element d'une liste sur laquelle on boucle
    //sinon const listMarkerRef=useRef() est unique et affecté uniquement au dernier element la fin de la boucle
    const listMarkerRef=useRef([]); //il faut mettre [] sinon on a une erreur de "[...]Ref est null ou undefined"
    const targetLi=useRef(null);

    const fc=20+kZoom
    const icon =new Icon({
        iconUrl:'/markerTn1.ico',
        iconSize:[fc,fc],
        iconAnchor:[fc/2,fc],
        popupAnchor:[0,-fc*3/4]
    })
    const flag=new Icon(
      {
        iconUrl:'/flag-senegal.ico',
        iconSize:[fc/2,fc/2],
        iconAnchor:[fc/4,fc/4],
      }
    )


    const handleActivityClick=()=>{
      const listActivities=document.getElementById("div-avec-map");
      if(listActivities)listActivities.style.display="none";
    }
    const initialZoom=window.innerWidth>=500?7:6.2;
    const handleClick=(site,index)=>{
      window.innerWidth<=1000 && handleActivityClick()
      const map=mapRef.current; //A mapContainer on l'utilise en ref={mapRef} au lieu de whenCreayed() qui ne mar che pas d'ailleurs
                          setCoord([site.lat,site.long]);
                          // let lt=site.lat+0.120000 //0.12 coefficent de deplacement du ***centre*** vers le haut(sur la lattitude) pour l'adapter à la retraction
                          setCenter([site.lat,site.long]);
                          let zoom=index===0?initialZoom:14;
                          let lt_offset=window.innerWidth>=1000?site.lat:(site.lat+0.011000);
                          if(map) map.flyTo([lt_offset,site.long],zoom);
                          const marker=listMarkerRef.current[index]
                          targetLi.current.setAttribute('class','selected');
                          // marker.icon.iconSize=[80,100]
                          if(marker) marker.openPopup()
                          let Zoom=index===0?0:20;
                          setKZoom(Zoom)
                      }
  return <><div id="map">
    <MapContainer 
        ref={mapRef} 
        center={center}
        dragging={false}
        touchZoom={true}
        zoom={initialZoom/*6.2*/} 
        scrollWheelZoom={false} 
        className='mapContainer'
    >
        <TileLayer
          attribution='SénégaL 🇸🇳  | Activités <strong>Team Niintche</strong> & Partenaires'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sites.map((site,index)=>{
          return <Marker key={index} position={[site.lat, site.long]} icon={index===0?flag:icon} ref={element=>listMarkerRef.current[index]=element} eventHandlers={{ mouseover: ""}}>
                      <Popup>
                           {index===0?'SénégaL 🇸🇳  ':site.name}<br/>
                           <hr/>
                           <Travaux travaux={site.travaux}/>
                           {site.partner.length!==0?<div className='team-on-bg' style={{width:'90%',padding:'2%',backgroundImage:'url("/teamniintche_blanc.png")',borderRadius:'8px',border:'2px dotted rgba(0,0,0,0.5)',marginTop:'0.3rem',}}>
                                   {'Partenaire(s) :'}<br/>
                                   <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"fit-content",height:"fit-content",}}>
                                   {site.partner.map(
                                       ptner=>{return <a className="partnerLink" href={'https://www.'+ptner.site} target="_blank" rel="noreferrer" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"fit-content",padding:"5px",textDecoration:"none",backgroundColor:"whitesmoke",height:"fit-content",marginRight:"5px",}}>
                                                <span>{' '+ptner.nom[0].toUpperCase()+ptner.nom.slice(1)}</span>
                                                <img src={'/logos_partenaires/logo_'+ptner.nom+'.png'} alt={'logo_'+ptner.nom} width="45px" height="30px" />
                                                <span style={{color:"rgb(0,150,0)",}}>{ptner.apport.toLocaleString()+'M fcfa'}</span>
                                           </a>}
                                    )}
                                    </div>
                            </div>:null}
                            {site.name.includes('SénégaL')?null:<div>
                                <span style={{display:"inline-block",backgroundColor:"green",color:"white",fontWeight:"bold",padding:"4px 1rem",margin:"0.5rem 0px",borderTopRightRadius:"10px",borderBottomLeftRadius:"10px",}}>Coût moyen:<b>{site.cout}</b> Fcfa</span><br/>
                                <VoirDet site={site.name}/>
                            </div>}
                      </Popup> 
                </Marker>})
        }
    </MapContainer>
     {/* center of Senegal:[14.5998233, -14.7402745] */}
     <div id="div-avec-map">
          <div className="enfant-de-list">
              <p><span style={{color:'red',fontSize:'1.2rem',display:'inline-block',padding:'0.5rem',cursor:'pointer',}} onClick={handleActivityClick} id="activityNone"><i className="fa fa-xmark"></i></span> MAPPAGE {sites.length} ACTIVITES</p>
              <input value={coord} onChange={()=>null} style={{color:"rgba(0,0,0,.1)",borderColor:"rgba(0,0,0,.1)",fontWeight:"bold"}}/>
          </div>
          <ul id="ul-list" className="enfant-de-list"> 
              {sites.map((site,index)=><li key={index} ref={targetLi} id={'ID'+index} onClick={()=>{handleClick(site,index)}} style={{width:"100%",lineHeight:"2rem",cursor:"pointer"}}>
                    <span style={{width:"fit-content",fontWeight:"bold",color:"green"}}>
                        {site.ID<10?('0'+site.ID+'.  '):site.ID?site.ID+ '.  ':'' }
                    </span>
                    {site.name+' '}
                    {site.partner.map(ptner=>{return <span><img src={'/logos_partenaires/logo_'+ptner.nom+'.png'} alt={'logo_'+ptner.nom} width="35px" height="25px" /> {' '+ptner.nom}</span>})}
            </li>)} 
          </ul> 
      </div>
  </div>
  <div className="carousel-container">
    <Karousel 
      ints={ints}
      titre="QUELQUES IMAGES DE REFECTION 2024"
      sTitre="TN - Réfection Ecoles & Daahras 2024"
      imgFolderRoot="img-refection/imageRef2024"
      id="carousel-map"
    />
  </div>
  </>
}

export function Mapp(props) {
  const index=useSelector(state=>state.userNewCh.index)
  const lat=props.lat!==undefined?props.chantier.lat:14.5998233;
  const long=props.long!==undefined?props.chantier.long:-14.7402745;
  // alert(lat+"  "+long)
  const center=[lat, long];
  const mapRef=useRef(null);

  // un tableau de refs qui permet une ref à chaque element d'une liste sur laquelle on boucle
  //sinon const listMarkerRef=useRef() est unique et affecté uniquement au dernier element la fin de la boucle
  const listMarkerRef=useRef([]); //il faut mettre [] sinon on a une erreur de "[...]Ref est null ou undefined"

  const fc=40 //20+kZoom
  const icon =new Icon({
      iconUrl:'/markerTn1.ico',
      iconSize:[fc,fc],
      iconAnchor:[fc/2,fc],
      popupAnchor:[0,-fc*3/4]
  })
  const showPopup=(index)=>{
      const site=sites[0]
      // document.querySelector('.leaflet-container').style.height="12vw"
      const map=mapRef.current;
      // let lat=site.lat-0.120000 //0.12 coefficent de deplacement du centre
      if(map) map.flyTo([site.lat,site.long],13);
      const marker=listMarkerRef.current[index]
      if(marker) marker.openPopup()
  }
// const index=Site.index
useEffect(
  ()=>showPopup(index)
)
  // const handleClick=(site,index)=>{ 
  //   // document.querySelector('.leaflet-container').style.height="12vw"
  //   const map=mapRef.current; //A mapContainer on l'utilise en ref={mapRef} au lieu de whenCreayed() qui ne mar che pas d'ailleurs
  //                       setCoord([site.lat,site.long]);
  //                       // let lt=site.lat-0.120000 //0.12 coefficent de deplacement du centre vers le haut(sur la lattitude) pour l'adapter à la retraction
  //                       setCenter([site.lat,site.long]);
  //                       if(map) map.flyTo([site.lat,site.long],14);
  //                       const marker=listMarkerRef.current[index]
  //                       // marker.icon.iconSize=[80,100]
  //                       if(marker) marker.openPopup()
  //                       setKZoom(20)

  //                   }
// const handleSideBarClick=()=>{
// // const clicked=useSelector(state=>{return state.userNewCh.local})
// }
// const centre=center;
return <>
   
  <MapContainer ref={mapRef} center={center} zoom={6.2} scrollWheelZoom={false} className='mapContainer'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites.map((site,index)=>{
        return <Marker key={index} position={[site.lat, site.long]} icon={icon} ref={element=>listMarkerRef.current[index]=element} eventHandlers={{ mouseover: ""}}>
                    <Popup>{sites[index].name}</Popup> 
                    {/* </Marker><img src={srcPopup} alt="" style={{height:"70px",width:"100px"}}/></Popup> */}
              </Marker>})
      }
      {/* <Sites render={(num)=>setKZoom(num)}/> */}
  </MapContainer>    
</>
}

function VoirDet({site}){
    return <Link to="/">voir plus de détails sur l'activité</Link>
    // {/*<div className="tooltip">
    //         <ul className="tooltiptext">
    //             <li>L état des lieux Avant</li>
    //             <li>Le progamme établi des activités prévues</li>
    //             <li>Débit pour les activités prévues</li>
    //             <li>Le rendu de l ouvrage Après</li>
    //             <li>le Compte-rendu final des activités</li>
    //         </ul>
    //     </div>*/}
}
function Travaux({travaux}){
    return <div style={{maxWidth:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-start',gap:'5px',flexWrap:'wrap',}}>
            {travaux.map(travail=>{return <span style={{display:'inline-block',width:'fit-content',height:'fit-content',fontSize:'10px',backgroundColor:'whitesmoke',padding:'2px',borderRadius:'5px',border:'2px solid rgba(0,200,0,0.4)',fontWeight:'bold',}}>✔ {travail}</span>})}
        </div>
}
  
