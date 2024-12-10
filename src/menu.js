import React from 'react'
import {Link} from 'react-router-dom';
import './css/menu.css';

export default function Menu() {
    const handleClick=()=>{
        document.querySelector('#menu').style.display='none';
        document.querySelector('#img_menu').style.display='inline';
        if(document.getElementsByClassName('secondebar')[0]){
          document.getElementsByClassName('secondebar')[0].style.display="flex";
        }
      }
  return (
    <div id='menu' onClick={handleClick}>
        <Link style={{textDecoration:'none'}} id='fermer'><span style={{color:'red',fontSize:'20px',textAlign:'left'}}><i className="fa fa-xmark"></i></span></Link>
        <Link to='/' className='menu_link' style={{marginTop:'10px'}}>ACCUEIL</Link>
        <hr/>
        <Link to='/nos_realisations' className='menu_link'>NOS REALISATIONS</Link>
        <hr/>
        <Link to="/campagnes" className='menu_link'>NOS CAMPAGNES</Link>
        <hr/>
        {/* <Link to='/quisommesnous' className='menu_link'>QUI SOMMES-NOUS ?</Link> */}
        <hr/>
    {/*<Link to='/' className='menu_link'>NOTRE COMPTABILITE</Link>*/}
        <hr/>
        <Link to='/nousContacter' className='menu_link'>NOUS CONTACTER</Link>
        <hr/>
    </div>
  )
}
