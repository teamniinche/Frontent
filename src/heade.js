import React from 'react';
import './css/heade.css';
import img1 from '../src/images/logo_niintche_blanc.ico';
import menu from '../src/images/menu.ico';
import {Link} from 'react-router-dom';
import Menu from './menu.js';
// const imageMurale=require('./images/patriarkat.jpg')

export default class Heade extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick=this.handleClick.bind(this);
    this.active = this.active.bind(this);
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }
  // handleScroll = () => {
  //   const scrollTop = window.scrollY;
  //   if (scrollTop!==0){
  //     document.getElementById('topbaar').style.backgroundColor="rgb(150, 0 ,0)";
  //   }
  //   // else
  //   // document.getElementById('topbaar').style.backgroundColor="rgba(150, 0 ,0,.6)";
  //   }
  handleClick=()=>{
    document.querySelector('#img_menu').style.display='none';
    document.querySelector('#menu').style.display='flex';
  }
  active=(page)=>{
        var urlcourante = document.location.href;
        const target={backgroundColor:"rgba(55,0,0,0.2)",color:"white",};
        const activeStyle=urlcourante.includes(page)?target:{};
        return activeStyle;
  }

    
  render(){
  return (
    // <div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'fit-content',}}>
    // <div style={{backgroundColor:'white',height:'60px',width:'1000px',position:'sticky',top:'0px',zIndex:'10',}}>test</div>
    // {/* // <div className="header"> */}
          <div className="top-bar" id='topbaar' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",}}>
              <div id="allways" className="forConnexion">
              {/* <div id="topLeft"><Link to="" className="selfLeft left">Nous soutenir</Link></div> */}
                <Link to="" className="selfLeft left">Nous soutenir</Link>
                <Link to="https://x.com/TeamNiintche/" target="_blank"><i className="bi bi-twitter-x"></i></Link>
                <Link to="https://facebook.com/teamniintche/" target='_blank'><i className="bi bi-facebook"></i></Link>
                <Link to="https://youtube.com/@teamniintche2097/" target='_blank'><i className="bi bi-youtube"></i></Link>
                <Link className="selfLeft right"to="/connexion">Se connecter</Link>
              </div>
              <div className="contient">
                <div id="right">
                  <Link to='/' ><img src={img1} alt="" className="logo"/></Link>
                </div>
                <div id="left">
                  <div className="nav-items">
                      <Link to="/" style={this.active('ccueil')}>Accueil</Link>
                      <Link to="/nos_realisations" style={this.active("alisations")}>Réalisations</Link>
                      <Link to="/campagnes" style={this.active("ampagnes")}>Campagnes</Link>
                      <Link to="/nos_partenaires" style={this.active("partenaires")}>Nos partenaires</Link>
                      {/*<Link to="/quisommesnous">Qui sommes-nous ?</Link>
                      <Link to="/notre_comptabilite">Comptabilité</Link>*/}
                      <Link to="/nousContacter" style={this.active("ontact")}>Contacts</Link>
                  </div>
                  <div id='img_menu' onClick={this.handleClick}>
                    <Link id="menu_ico"><img src={menu} alt=""/>MENU</Link>
                  </div>
                </div>
              </div>
                <Menu/>
          </div>
          // </div>
  )}
}

// {/* <img className="imageDeFont" src={imageMurale} alt="murale"/>
// <div className="divInsConnect">
//      <Link className="insConnect" to="/connexion">Se connecter</Link>
//      <span id="barDeSix"> | </span>
//     <Link className="insConnect" to="/connexion/inscription">S'inscrire</Link>
//  </div>

// </div>  */}
