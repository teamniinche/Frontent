//import {partenaires} from './partenaires.js';

export default function Partenaires() {
    
    const parteners = {
    sonatel: {
        nom: "Sonatel",
        logo: "logo_sonatel.png",
        date: "2022",
        intervention: [
            "Campagne TOUS A L'ÉCOLE 2021",
            "Campagne TOUS A L'ÉCOLE 2023"
        ],
        total:10000000,
        contacts: "GROUPE SONATEL"
    },
    auchan: {
        nom: "Auchan",
        logo: "logo_auchan.png",
        date: "2022",
        intervention: [
            "Réfection école élémentaire LA LINGUERE de Keur Massar",
            "Réfection école primaire de Keur Madiabel(Kaolack)"
        ],
        total:15000000,
        contacts: "AUCHAN SENEGAL"
    },
    distingo: {
        nom: "Distingo",
        logo: "logo_distingo.png",
        date: "2022",
        intervention: [
            "Campagne TOUS A L'ÉCOLE 2022",
            "Campagne TOUS A L'ÉCOLE 2023"
        ],
        total:10000000,
        contacts: "distingo.com"
    },
    fabrimetal: {
        nom: "Fabri Metal",
        logo: "logo_fabrimetal.png",
        date: "2022",
        intervention: ["Réfection école primaire SEBI GARE (Sébikotane)"],
        total:10000000,
        contacts: "fabrimetal.com"
    },
    mazars: {
        nom: "Mazars",
        logo: "logo_mazars.png",
        date: "2022",
        intervention: ["Réfection école primaire Ngolar sérère(Notto Diobass)"],
        total:10000000,
        contacts: "mazars.org"
    },
    senum: {
        nom: "Senum",
        logo: "logo_senum.png",
        date: "2024",
        intervention: ["Démarches en cours ..."],
        total: "",
        contacts: "senum.com"
    },
    seter: {
        nom: "Seter",
        logo: "logo_seter.png",
        date: "2024",
        intervention: ["Démarches en cours ..."],
        total: "",
        contacts: "seter.sn"
    }
    }
    const fontSize="0.6rem";
    return <div className='parteners' style={{height:"80vh",margin:"0px",padding:"10vh 10%",paddingTop:"15vh",}}>
        {/*<img src="/images/teamniintche.png" width="60px" height="50px"/>*/}
        <h3 style={{color:"rgba(0,0,100,0.3)",padding:"1rem 0px",}}>La TeamNiintche remercie tous ses partenairees et collaborateurs.</h3>
        <table style={{width:"100%",height:"fit-content",}}>
            <thead>
                <th style={{height:"4rem",lineHeight:"1rem",backgroundColor:"rgba(0,0,100,0.3)",minWidth:"5rem",}}>Nom & Logo</th>
                <th style={{width:"8rem",backgroundColor:"rgba(0,0,100,0.3)",fontSize:fontSize,textAlign:"center",}}>Dépuis ...</th>
                <th style={{backgroundColor:"rgba(0,0,100,0.3)",paddingRight:"1rem",fontSize:fontSize,}}>Activités</th>
                <th style={{backgroundColor:"rgba(0,0,100,0.3)",fontSize:fontSize,minWidth:"10rem",fontWeight:"bold",textAlign:"center",}}>Apport total (F cfa)</th>
                <th style={{backgroundColor:"rgba(0,0,100,0.3)",fontSize:fontSize,textAlign:"center",}}>Contacts</th>
            </thead>
            <tbody>{Object.values(parteners).map(ptner=>{
                   return <tr style={{height:"5rem",borderBottom:"1px solid rgba(0,0,100,0.3)",}}>
                        <td style={{lineHeight:"1rem",}}>
                           <img src={"logos_partenaires/"+ptner.logo} width="70px" height="40px"/>
                           <br/>
                           <span>{ptner.nom}</span>
                        </td>
                        <td style={{width:"8rem",paddingRight:"1rem",fontSize:fontSize,textAlign:"center",}}>{ptner.date}</td>
                        <td style={{fontSize:fontSize,}}>{ptner.intervention.map(actvt=>(<li>{actvt}</li>))}</td>
                        <td style={{fontSize:fontSize,minWidth:"10rem",fontWeight:"bold",textAlign:"center",}}>{ptner.total.toLocaleString()}</td>
                        <td style={{fontSize:fontSize,textAlign:"center",}}><a href="">{ptner.contacts}</a></td>
                    </tr>})}
            </tbody>
        </table>
        </div>
      
  }
