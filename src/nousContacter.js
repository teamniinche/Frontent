import React from 'react';
import {Link} from 'react-router-dom';
import './css/nousContacter.css';
import './css/nsContacter-rs.css';
import Footer from './footer.js';

export function NousContacter(){
    return <>
            <Footer/>
            <NousSuivre/>
        </>
        }

export function NousSuivre(){
    return <div className="reseaux_Sociaux" id="reso">
    <ul id="liste_reseaux_sociaux">
        <li><Link to="https://facebook.com/teamniintche/"><img src='/images/RS_logos/facebook.webp' alt="facebook"/></Link></li>
        <li><Link to="https://twitter.com/TeamNiintche/"><img src='/images/RS_logos/twitter.webp' alt="Twitter"/></Link></li>
        <li><Link to="https://instagram.com/teamniintche/"><img src='/images/RS_logos/instagram.webp' alt="Instagram"/></Link></li>
        <li><Link to="https://youtube.com/@teamniintche2097/"><img src='/images/RS_logos/youtube.webp' alt="Youtube"/></Link></li>
    </ul>
</div>
}
export function NsContacterNsSuivre(){
    return <div className="rs" id="rs">
    <ul id="lrs">
        <li style={{fontSize:'0.8rem',fontWeight:'bold',borderBottom:'2px solid white',}}>Nous suivre</li>
        <li><Link to="https://facebook.com/teamniintche/"><img src='/images/RS_logos/facebook.webp' alt="facebook"/></Link></li>
        <li><Link to="https://twitter.com/TeamNiintche/"><img src='/images/RS_logos/twitter.webp' alt="Twitter"/></Link></li>
        <li><Link to="https://instagram.com/teamniintche/"><img src='/images/RS_logos/instagram.webp' alt="Instagram"/></Link></li>
        <li><Link to="https://youtube.com/@teamniintche2097/"><img src='/images/RS_logos/youtube.webp' alt="Youtube"/></Link></li>
    </ul>
</div>
}


const iconsStyle={fontWeight:'bold',fontSize:'1.4rem',}
const liStyle={display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}
export function Opinion(){
    // const style={color:"white"}
    // function handleChange(){}
    return <div className="reseaux_Sociaux">
                <p className="suivre">Nous écrire</p>
                <ul id="liste_numeros">
                <li style={liStyle}>
                        <span className="lnum-ul-li-span" style={{display:'flex',width:'2rem',height:'100%',flexDirection:'column',justifyContent:'center',alignItems:'center', gap:'1rem',padding:'0px 1rem',margin:'0px 2rem',backgroundColor:'rgba(80,0,0,0.3)',}}>
                            <i class="bi bi-envelope-at-fill" style={{color:'rgba(150,0,0,0.9)',...iconsStyle}}></i>
                        </span>
                        <span>
                            teamniintche@gmail.com
                        </span>
                    </li>
                </ul>
                {/* <textarea name="textar" id="textare" cols="" rows="15" placeholder="Saisir votre message ici..."></textarea>
    }
    return <div className="opinion">
                <p className="ecrire">Nous écrire à <br/><b>teamniintche@teamniintche.com</b></p>
                <textarea name="textar" id="textare" cols="" rows="15" placeholder="Saisir votre message ici..."></textarea>
                <InputString type="text" icon={identifiant} iconStyle={style} for="Nom" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="mail" icon={mail} iconStyle={style} for="Adresse mail" render={(obj)=>{handleChange(obj)}}/>
                <button type="submit" className="btn btn-success" value="">Envoyer</button> */}
            </div>
        }
export function Numeros(){
    return <div className="reseaux_Sociaux">
                <p className="suivre">Nos numéros</p>
                <ul id="liste_numeros">
                    <li style={liStyle}>
                         <span className="lnum-ul-li-span" style={{display:'flex',width:'2rem',height:'100%',flexDirection:'column',justifyContent:'center',alignItems:'center', gap:'0.6rem',padding:'0px 1rem',margin:'0px 2rem',backgroundColor:'rgba(0,80,0,0.3)',}}>
                            <i class="bi bi-telephone-plus-fill" style={{color:'green',...iconsStyle}}></i>
                            <i class="bi bi-whatsapp" style={{color:'green',...iconsStyle}}></i>
                        </span>
                        <span>
                            (+221) 77 616 01 04
                        </span>
                    </li>
                </ul>
            </div>
        }
        
export default function MetaData(){
    return <div className="divtech">
            <div className="meta-data">
                <NousContacter/>
            </div>
        </div>
    }

export function CopyRight() {
  return <div className="copyright">
  CopyRight © 2023 Team Niintche Tous droits réservés ®
</div>
}

export function NousSoutenir(){
  return (
    // https://fr.diapci.sn/campaign/406/les-repas-de-la-solidarite
    <a className="noussoutenir" href="#">
        Nous soutenir
    </a>
  )
}


