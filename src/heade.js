import React from 'react';
import './heade.css';
import img1 from '../src/images/logo_niintche_blanc.ico';
import menu from '../src/images/menu.ico';
import {Link} from 'react-router-dom';
import Menu from './menu.js';
// const imageMurale=require('./images/patriarkat.jpg')

export default class Heade extends React.Component{

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
    // <div className="header">
          <div className="top-bar" id='topbaar'>
              <div className="contient">
                <div id="right">
                  <Link to='/' ><img src={img1} alt="" className="logo"/></Link>
                  {/*quisommesnous*/}
                  {/* <Link to="/connexion" id="seconnecter">Se connecter</Link> */}
                </div>
                <div id="left">
                  <div className="nav-items">
                      <Link to="/" style={this.active("ccueil")}>Accueil</Link>
                      <Link to="/nos_realisations" style={this.active("alisations")}>Réalisations</Link>
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
          
  )}
}

// {/* <img className="imageDeFont" src={imageMurale} alt="murale"/>
// <div className="divInsConnect">
//      <Link className="insConnect" to="/connexion">Se connecter</Link>
//      <span id="barDeSix"> | </span>
//     <Link className="insConnect" to="/connexion/inscription">S'inscrire</Link>
//  </div>

// </div>  */}
