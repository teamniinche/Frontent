import React from 'react'
import {Link} from 'react-router-dom';
import './menu.css';

export default function Menu() {
    const handleClick=()=>{
        document.querySelector('#menu').style.display='none';
        document.querySelector('#img_menu').style.display='inline';
        if(document.getElementsByClassName('secondebar')[0]){
          document.getElementsByClassName('secondebar')[0].style.display="flex";
        }
      }
    const active=(page)=>{
        var urlcourante = document.location.href;
        const target={
            backgroundColor:"rgba(55, 0, 0, 0.2)",
            color:"white",
        };
        const activeStyle=urlcourante.includes(page)?target:{};
        return activeStyle;
    }
  return (
    <div id='menu' onClick={handleClick}>
        <Link style={{textDecoration:'none'}} id='fermer'><span style={{color:'red',fontSize:'20px',textAlign:'left'}}><i className="fa fa-xmark"></i></span></Link>
        <Link to='/' className='menu_link' style={{marginTop:'10px',...active("accueil")}}>ACCUEIL</Link>
        <hr/>
        <Link to='/nos_realisations' className='menu_link' style={active("realisations")}>NOS REALISATIONS</Link>
        <hr/>
        <Link to='/nos_partenaires' className='menu_link' style={active("partenaires")}>NOS PARTENAIRES</Link>
        {/*<Link to='/quisommesnous' className='menu_link'>QUI SOMMES-NOUS ?</Link>
        <hr/>
        <Link to='/' className='menu_link'>NOTRE COMPTABILITE</Link>*/}
        <hr/>
        <Link to='/nousContacter' className='menu_link' style={active("contact")}>NOUS CONTACTER</Link>
        <hr/>
    </div>
  )
}
