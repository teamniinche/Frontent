import React from 'react'
import {Link} from 'react-router-dom'
import './css/style.css'


const actu={
    mots1:"Cependant vous pouvez visiter les autres pages accessibles dépuis le ",
    mots2:"Nous, la Teamniintche, au nombre de plus de 350 membres de toutes les régions du Sénégal, sommes les volontaires de la citoyenneté active. Femmes comme hommes, civils comme paramilitaires, nous nous investissons, avec désintérêt, dans les domaines de l’éducation, du social, de l’environnement, de l’humanitaire et de la solidarité dans l’unique but d’une part de soutenir l’effort de l’Etat et d’autre part de soulager la communauté sénégalaise.",
    mots3:"Nous sommes composés de toutes les catégories professionnelles d’élève du collège à cadre, de chômeur à chef d’entreprise et de toutes les tranches d’âge en état de travailler. Du coût, parmis ses membres, la team trouve des ouvriers qualifiés tels que des techniciens du bâtiment, des menuisiers métalliques, des menuisiers du bois, des électriciens, des plombiers, des peintres, des carreleurs, etc.",
    mots4:"De la bitume de Dial-Diop aux carrières du Fouta, du Sanctuaire de Popenguine à la Grande mosquée de Touba, nous avons parcouru 11/14 régions sous les vents chauds de l’été et les pluies indulgentes de l’hiver pour donner de notre mieux à améliorer la vie courante et recevoir de la diversité culturelle et naturelle de notre chère patrie à travers les marrées de Ndar, du Sine-Saloum et les forêts de la belle Casamance.",
    mots5:"De par cet engagement communautaire, la Teamniintche s’est particulièrement consacré à la rénovation d’écoles, à l’organisation chaque année d’une campagne de distribution de fournitures scolaires et/ou des vêtements à travers plusieurs régions du Sénégal ,à l’organisation de journées de don de sang, à des assistances sociales par des initiations de cagnotte et/ou des appels à l’aide via les réseaux sociaux pour des tiers en situation d’urgence, à des opérations de reboisement et/ou de nettoyage de plages, etc.",
}
export default function Actu() {
    const handleMenuClick=()=>{
        const displayOfMenu=document.querySelector('#menu').style.display
        if(displayOfMenu==="none"){
            document.querySelector('#menu').style.display='flex';
        }else{
            document.querySelector('#menu').style.display='none';
        }
    }
    return <>
        <DerniereActualite/>
        <div>
            <div style={{margin:"0px",padding:"1em",width:"90%"}}>
                <p style={{margin:"0px",padding:"0px",width:"100%",lineHeight:"2rem"}}>
                    <span className="badge" style={{color:"rgba(255,0,0,.6)",border:"1px solid rgba(255,0,0,.3)",borderRadius:"5px",letterSpacing:"3px"}}>CETTE PAGE EST EN COURS...</span>
                    <br/>
                    {actu.mots1} 👉
                    <span className="badge" style={{color:"rgba(0,0,255,.6)",border:"1px solid blue",borderRadius:"5px"}} onClick={handleMenuClick}>MENU</span>
                </p>
            </div>
            <div style={{margin:"0px",padding:"1em",width:"90%",paddingBottom:"30vh"}}>
                <span style={{marginBottom:"100px"}}>Pour de plus amples informations, <Link to='/nouscontacter' style={{fontWeight:"bold",display:"inline"}}>nous conctacter</Link> sur nos plateformes digitales.
                </span>
            </div>
        </div>
    </>
  }

  export function DerniereActualite(){
    const widthFirst="45vw";
    const heightFirst="30vw"; //210px
    return <>
      <h3 id="1" style={{margin:"0px",marginTop:"1em",borderTop:"1px double brown",padding:".5em 1em"}}><a href="#tec" style={{color:"rgba(255,0,0,.4)",letterSpacing: "4px",textDecoration:"none" }}>{">> "}Prochainement...</a></h3>
      <p id="pImgs" style={{margin:"0.5%",padding:"4% 2%",width:"95%",fontSize:"16px",lineHeight:"1.5em",height:"fit-content",borderRadius:"5px",textAlign:"justify",letterSpacing:"2px",fontWeight:"bold",color:"rgba(0,0,0,.7)",textShadow:"2px 2px .5px white",backgroundColor:"rgba(0,0,0,.09)",wordWrap:"wrap",}}>
          
      <img src="/img_accueil/photo_de_famille.jpg" alt="test" style={{float:"left",position:"relative",width:widthFirst,height:heightFirst,margin:"10px",marginlLeft:"0px"}}/>
        {actu.mots2}
      <img src="/img_accueil/don_de_sang.jpg" alt="test" style={{float:"right",position:"relative",width:"200px",height:"210px",margin:"10px",marginRight:"0px"}}/>
      {actu.mots3}
      <img src="/img_accueil/campagne.jpg" alt="test" style={{float:"left",position:"relative",width:"40vw",height:"25vw",margin:"10px",marginlLeft:"0px"}}/>
      {actu.mots4}
      <img src="/img_accueil/carrelage.jpg" alt="test" style={{float:"right",position:"relative",width:"200px",height:"210px",margin:"10px",marginRight:"0px"}}/>
      {actu.mots5}
      </p>
    </>
  }