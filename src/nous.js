import React ,{useEffect,useState} from 'react';
import {useContext} from 'react';
import './nous.css';
import {ResearchBar} from './sideBar.js';
import {Link, Outlet} from 'react-router-dom';
import { loader} from './toast.js';
// import InputString from './forms.js';
import {NousContacter} from './nousContacter';
import Slider from './slider.js'
import {serverUrl} from './root.js'

const hostUrl=serverUrl

export function isUndefined(val){if(val===undefined || val===''){return true }else{return false}}
export function ifVal(val){if(val.includes('.com/')){return val }else{return '.com/'}}
export function Error(props) {
  const error=props.error
  const typ=()=>{
    if(error.includes('JSON.parse: unexpected character at line')){
        return <h3 style={{margin:"0px",padding:"0px",width:"80%",textAlign:"center"}}>Erreur serveur, Veuillez contacter l'administrateur !</h3>
    }else if(error.includes(' fetch ')){
        return <h3 style={{margin:"0px",padding:"0px",width:"80%",textAlign:"center"}}>Veuillez vérifier votre connexion !</h3>
    }else if(props.autre){
      return <h3 style={{margin:"0px",padding:"0px",width:"80%",textAlign:"center"}}>{props.autre}</h3>
    }else{
      return ''
    }

  }
  
  return (
    <div style={{backgroundColor:"rgb(240,240,240)",width:"70%",height:"fit-content",padding:"20px 5%",margin:"3em 10%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <h1 style={{margin:"0px",padding:"0px",width:"80%",textAlign:"center",color:"grey"}}>Oups ❗ 🙇🏻‍♀️</h1>
        <div style={{margin:"0px",padding:"0px",width:"80%",textAlign:"center",lineHeight:"1.5em"}}>Une erreur s'est produite : {error}</div>
        {typ()}
    </div>
  )
}

const membreDefault={   
  "id":0, 
  "firstName":"Moustapha",
  "lastName":"GUEYE",
  "alias":"GrandTapha",
  "sexe":"male",
  "departementDOrigine":"Dakar",
  "dateAnniversaire":"01-01-1970",
  "telephoneNumber":"234567890",
  "email":"test@test.com",
  "qualification":"Ecrivain-(Les Saillies du profane",
  "tngroupe":"Coordination TN",
  "galeriePrive":{"imgPublic":"","imgPrive":"","imgPublic1":"","imgPublic2":""},
  "apropos":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis laoreet dui ut finibus. Phasellus dapibus, orci quis laoreet malesuada, nulla velit auctor ligula, cursus pretium erat nibh sit amet leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum lorem sem, sollicitudin ut dolor vitae, imperdiet facilisis arcu. Nullam gravida laoreet elit luctus eleifend. Etiam condimentum quam ante, vel faucibus velit rhoncus vitae. Aenean tortor diam, egestas ac consequat at, posuere nec justo.", 
  "rS":{"userFa":"","userX":"","userIn":"","userLi":""}
}

const MembreContext=React.createContext({
  membreObject:{membre:membreDefault},
  setMembreObject:()=>{}
  });
  
export function Nous (props){
  const [state,setState]=useState({membre:membreDefault})
  const [membres, setMembres] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // document.getElementsByClassName('header')[0].style.height="0px"; //"0px" doit etre dynamisé
    fetch(hostUrl+'api/membres/allmembres')
      .then(response => response.json())
      .then(membres => {
                        const unblockedMembres=membres.filter(membre=>membre.statu==="v")
                        setMembres(unblockedMembres)
                      })
      .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
  }, []);
  if (error) {return <Error error={error}/>}

  function inputChange(val){
    if (val===""){
      fetch(hostUrl+'api/membres/allmembres')
      .then(response => response.json())
      .then(membres => setMembres(membres))
      .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
      if (error) {return <Error error={error}/>}
    }else{
      fetch(hostUrl+'api/membres/allmembres/'+val)
      .then(response => response.json())
      .then(membres =>setMembres(membres))
      .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
      if (error) {return <Error error={error}/>}
    }
    }
    

  function handlaRender(membre){setState({membre:membre})}
   return (
    <MembreContext.Provider value={{membreObject:state}} >
      <div className='noustronc'>
        <div className='noussidebar'>
          <ResearchBar typ="MEMBRE" number={membres.length} render={iptValue=>inputChange(iptValue)} />
          <div className='noussidebar-membres'>
            {membres?membres.map((item)=><Membre key={item.id} membre={item} render={membre=>handlaRender(membre)} />):loader}
          </div>
        </div>
        <DetailsMembre/>
      </div>
    </MembreContext.Provider>
    );
  }

function DetailsMembre(){
  let myContext=useContext(MembreContext)
  let membre=myContext.membreObject.membre
  const addedImages=membre.addedImages===undefined?[]:membre.addedImages;
  const imgFromGalerie=addedImages.length===0?[]:addedImages.map(img=>[img,'From galérie'])
  const  rS=membre.rS
  const avatar=[['avatar.webp','NO IMAGES']]
  const {imgPublic,imgPrive,imgPublic1,imgPublic2}=membre.galeriePrive
  const IMAGES=[[imgPublic,''],[imgPrive,''],[imgPublic1,''],[imgPublic2,'']]
  let images=IMAGES.filter(image=>image[0]!=='')
  let iimages=[...images,...imgFromGalerie]
  let imges=iimages.length===0?avatar:iimages;
  console.log(imges)

  const facebook=require('./images/RS_logos/facebook.webp');
  const twitter=require('./images/RS_logos/twitter.webp');
  const instagram=require('./images/RS_logos/instagram.webp');
  const linkedin=require('./images/RS_logos/linkedin.webp');
  const faceLink=!isUndefined(rS.userFa)?ifVal(rS.userFa).split('.com/')[1]:''
  const xLink=!isUndefined(rS.userX)?ifVal(rS.userX).split('.com/')[1]:''
  const instaLink=!isUndefined(rS.userIn)?ifVal(rS.userIn).split('.com/')[1]:''
  const linkLink=!isUndefined(rS.userLi)?ifVal(rS.userLi).split('.com/')[1]:''
return(     
    <div className='detailsmembre'>
      <div className='memberCard'>
        <Slider images={imges} classe='sliderRendu' classe1='sliderNavPrec2' classe2='sliderNavSuiv2' />
        <div className='etatCivil'>
          <p style={{marginBottom:"5px"}}>
          <span>{membre.firstName + ' ' + membre.lastName}</span> {'--- @lias ' + membre.alias} <br/> 
          <span>{membre.qualification }</span> {'    ' + membre.departementDOrigine} 
          </p>
          <ul>
          <a href={'https://www.facebook.com/'+ faceLink}><li><img src={facebook} alt="facebook"/></li></a>
          <a href={'https://www.twitter.com/'+ xLink}><li><img src={twitter} alt="X"/></li></a>
          <a href={'https://www.instagram.com/' + instaLink}><li><img src={instagram} alt="instagram"/></li></a>
          <a href={'https://www.linkedin.com/' + linkLink}><li><img src={linkedin} alt="linkedin"/></li></a>
          </ul>
        </div>
      </div>
      <IlNousParleDeLui il={membre} />
    </div>
    )
  }
  
  function IlNousParleDeLui(props) {
    return (
      <>
      <h3 
        style={{
                display:"inline-block", 
                width:"94%",
                textAlign:"center",
                backgroundColor:"rgba(0,0,0,0.05)",
                margin:"2%",padding:"20px 0px",
                borderTop:".3px dotted brown",
                borderBottom:".3px dotted brown"
              }}>👇
        {props.il.alias+' nous parle de lui 🤓'} 
      </h3>
      <p className='apropos'>{props.il.apropos+' 👍 👏👏👏'}</p>
      </>
    )
  }
  

class Membre extends React.Component{
  constructor(props){
    super(props);
    this.handleMembreClick=this.handleMembreClick.bind(this);
    this.membre=this.props.membre
  }

  
  handleMembreClick=()=>{
    this.props.render(this.membre)
    document.getElementsByClassName("noussidebar")[0].style.display= window.innerWidth >="700"?"inline-block":"none";
    document.getElementsByClassName("detailsmembre")[0].style.display="inline-block";
  }

  handleTwitterClick=(e)=>{
    e.stopPropagation();
    const xLink=isUndefined(this.membre.rS.userX)?ifVal(this.membre.rS.userX).split('.com/')[1]:''
    let url = "https://twitter.com/"+xLink;
    window.open(url);
  }
  
  render(){
  const avatar='avatar1.jpg'
  const imgProfilLink=this.membre.galeriePrive.imgPublic
  let imageProfil=imgProfilLink!==''?imgProfilLink:avatar;
    
  const cloudName='dapkl1ien'
  const cloudinaryBaseUrl = 'https://res.cloudinary.com/'+cloudName+'/image/upload/signed_upload_demo_form/membres';
  let membreImg = cloudinaryBaseUrl+'/'+imageProfil;
    
  const twitter=require('./images/RS_logos/twitter.webp');
  const style={
    backgroundColor:this.membre.sexe==='Homme'?'rgba(0,0,250,.1)':'rgba(255,0,150,.1)',
  }
  return (
    <div style={style} className='membre' onClick={this.handleMembreClick}>

      <img src={membreImg} alt='Prenom NOM'/>

      <ul>
        <li className='prenomNom'>
        {this.membre.firstName +" " + this.membre.lastName +" - "+ this.membre.departementDOrigine}
        {/* <a href={url}></a> */}
        <img src={twitter} alt="twitter" onClick={(e)=>this.handleTwitterClick(e)} id="twitterAList"/>
        </li>

        <li>{this.membre.qualification}</li>

        <li>{'@s '+ this.membre.alias +" - " + this.membre.tngroupe}</li>

      </ul>

    </div>
  )
}}

export class SecondeBar extends React.Component{
  constructor(props){
    super(props);
    this.onClickMembres=this.onClickMembres.bind(this);
    }
  onClickMembres=()=>{
      if (document.getElementsByClassName("noussidebar")[0]){
      document.getElementsByClassName("noussidebar")[0].style.display= window.innerWidth >="700"?"inline-block":"inline-block";
      document.getElementsByClassName("detailsmembre")[0].style.display="none";
      }}
  render(){
  return (
    <div className='nous'>
      <div className='secondebar'>
        <ul>
          <li onClick={this.onClickMembres}><Link to="/quisommesnous/lesmembres">LES MEMBRES</Link></li>
          <li ><Link to="/quisommesnous">LA TEAM</Link></li>
          <li ><Link to="/quisommesnous/galerie">GALÉRIE</Link></li>
        </ul>
      </div>
      <Outlet/>
      <img src="/filigrane.jpg" alt="filigrane" style={{margin:"-40px 0px",zIndex:"-10",padding:"0px",height:"70vh",width:"100vw"}} id="filigrane"/>
      <NousContacter/>
    </div>
) }
}

export function Niintche() {
  return (
    <div>
    Pages reservées aux activités de junior Niintche individuellement.
    </div>
  )
}

