import {NousContacter} from './nousContacter.js'
import { parteners } from './iterables.js';
import './partenaires.css';

export default function Partenaires() {
    
    const fontSize="0.6rem";
    return <>
        <div className='parteners' style={{height:"87vh",margin:"0px",paddingTop:"120px",}}>
        {/*<img src="/images/teamniintche.png" width="60px" height="50px"/>*/}
        <h3 style={{color:"rgba(0,0,100,0.3)",padding:"1rem 0px",marginBottom:"0px",marginTop:"0px",textAlign:"center",}}>La <span style={{color:"rgba(0,0,100,0.7)",}}>Team Niintche</span> remercie tous ses partenairees et collaborateurs.</h3>
        <div style={{padding:"1rem",maxHeight:"100%",overflow:"scroll",scrollbarWidth:"thin",}}>
            <table style={{width:"100%",height:"fit-content",}}>
            <thead>
                <th style={{height:"4rem",lineHeight:"1rem",backgroundColor:"rgba(0,0,100,0.3)",minWidth:"5rem",}}>Nom & Logo</th>
                <th style={{width:"8rem",backgroundColor:"rgba(0,0,100,0.3)",fontSize:fontSize,textAlign:"center",}}>Dépuis ...</th>
                <th style={{backgroundColor:"rgba(0,0,100,0.3)",paddingRight:"1rem",fontSize:fontSize,}}>Activités</th>
                <th style={{backgroundColor:"rgba(0,0,100,0.3)",fontSize:fontSize,minWidth:"10rem",fontWeight:"bold",textAlign:"center",}}>Apport total (F cfa)</th>
                <th style={{backgroundColor:"rgba(0,0,100,0.3)",fontSize:fontSize,textAlign:"center",}}>Contacts</th>
            </thead>
            <tbody>{Object.values(parteners).map(ptner=>{
                    const url=ptner.logo.replace("-trparent","");
                   return <tr style={{height:"5rem",borderBottom:"1px solid rgba(0,0,100,0.3)",}}>
                        <td style={{lineHeight:"1rem",}}>
                           <img src={"logos_partenaires/"+url} width="70px" height="40px" alt={ptner.nom}/>
                           <br/>
                           <span>{ptner.nom}</span>
                        </td>
                        <td style={{width:"8rem",paddingRight:"1rem",fontSize:fontSize,textAlign:"center",}}>{ptner.date}</td>
                        <td style={{fontSize:fontSize,}}>{ptner.intervention.map(actvt=>(<li>{actvt}</li>))}</td>
                        <td style={{fontSize:fontSize,minWidth:"10rem",fontWeight:"bold",textAlign:"center",}}>{ptner.total.toLocaleString()}</td>
                        <td style={{fontSize:fontSize,textAlign:"right",}}><a href={ptner.contacts && "https://www."+ptner.contacts} target="_blank" rel="noreferrer">{ptner.contacts && "https://www."+ptner.contacts}</a></td>
                    </tr>})}
            </tbody>
        </table>
        </div>
        </div>
        <NousContacter/>
    </>
      
  }
