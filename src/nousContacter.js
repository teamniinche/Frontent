import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './nousContacter.css';
import {InputString} from './forms.js';
import { identifiant,mail } from './icons';

export function NousContacter(){
    const facebook=require('./images/RS_logos/facebook.webp');
    const twitter=require('./images/RS_logos/twitter.webp');
    const instagram=require('./images/RS_logos/instagram.webp');
    const youtube=require('./images/RS_logos/youtube.webp');
    return <div className="reseaux_Sociaux" id="reso">
                {/* <p className="suivre" style={{color:"#fff"}}>Nous suivre sur nos réseaux sociaux</p> */}
                <ul id="liste_reseaux_sociaux">
                    <li><Link to="https://facebook.com/teamniintche/"><img src={facebook} alt="facebook"/></Link></li>
                    {/* <span>Facebook</span></Link></li> */}
                    <li><Link to="https://twitter.com/TeamNiintche/"><img src={twitter} alt="Twitter"/></Link></li>
                    {/* <span>Twitter</span></Link> </li> */}
                    <li><Link to="https://instagram.com/teamniintche/"><img src={instagram} alt="Instagram"/></Link></li>
                    {/* <span>Instagram</span></Link> </li> */}
                    <li><Link to="https://youtube.com/@teamniintche2097/"><img src={youtube} alt="Youtube"/></Link></li>
                    {/* <span>Youtube</span></Link></li> */}
                </ul>
            </div>
        }

export function Opinion(){
    const style={color:"white"}
    function handleChange(){

    }
    return <div className="opinion">
                <p className="ecrire">Nous écrire à la newsletter</p>
                <textarea name="textar" id="textare" cols="" rows="15" placeholder="Saisir votre message ici..."></textarea>
                <InputString type="text" icon={identifiant} iconStyle={style} for="Nom" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="mail" icon={mail} iconStyle={style} for="Adresse mail" render={(obj)=>{handleChange(obj)}}/>
                <button type="submit" className="btn btn-success" value="">Envoyer</button>
            </div>
        }
export function Numeros(){
    return <div className="reseaux_Sociaux">
                <p className="suivre">Nos numéros de téléphone</p>
                <ul id="liste_numeros">
                    <li>(+221) 77 152 86 20 / 76 375 57 32</li>
                </ul>
            </div>
        }
        
export default function MetaData(){
    return <div className="divtech">
            <div className="meta-data">
                {/* <CopyRight/> */}
                <NousContacter/>
            </div>
        </div>
    }

export function CopyRight() {
  return <div className="copyright">
  CopyRight © 2023 @ndourm9 Tous droits réservés ®
</div>
}

export function NousSoutenir() {
  return (
    <a className="noussoutenir" href='https://fr.diapci.sn/campaign/406/les-repas-de-la-solidarite'>
        Nous soutenir
    </a>
  )
}


