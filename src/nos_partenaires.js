//import {partenaires} from './partenaires.js';

export default function Partenaires() {

    /*var parteners={
        sonatel:{nom:"Sonatel",logo:"logo-sonatel.jpg",date:"01/09/2022",intervention:["Campagne TOUS A L'ÉCOLE 2021 à Kaguitte(Ziguinchor)","Campagne TOUS A L'ÉCOLE 2023 à DABO (Ziguinchor)"] ,total:"",contacts:""},
        seter:{nom:"Seter",logo:"logo-seter.jpg",date:"01/09/2022",intervention:["Démarches en cours ..."],total:"",contacts:""},
        auchan:{nom:"Auchan",logo:"logo-auchan.jpg",date:"01/09/2022",intervention:["Refection école Keur Massar","Réfection école Keur Madiabel(Kaolack)"],total:"",contacts:""},
        distingo:{nom:"Distingo",logo:"logo-distingo.jpg",date:"01/09/2022",intervention:["Campagne TOUS A L'ÉCOLE 2021 à Kaguitte(Ziguinchor)","Campagne TOUS A L'ÉCOLE 2023 à DABO (Ziguinchor)"],total:"",contacts:""},
        fabrimetal:{nom:"Fabri Metal",logo:"logo-fabrimetal.jpg",date:"01/09/2022",intervention:["Réfection école SEBI GARE (Sébikotane)"],total:"",contacts:""},
        mazars:{nom:"Mazars",logo:"logo-mazars.jpg",date:"01/09/2022",intervention:["Réfection école Ngolar sérère(Notto Diobass)"],total:"",contacts:""},
        senum:{nom:"Senum",logo:"logo-senum.jpg",date:"01/09/2022",intervention:["Démarches en cours ..."],total:"",contacts:""}
    }*/
    const parteners = {
    sonatel: {
        nom: "Sonatel",
        logo: "logo_sonatel.png",
        date: "01/09/2022",
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
        date: "01/09/2022",
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
        date: "01/09/2022",
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
        date: "01/09/2022",
        intervention: ["Réfection école primaire SEBI GARE (Sébikotane)"],
        total:10000000,
        contacts: "fabrimetal.com"
    },
    mazars: {
        nom: "Mazars",
        logo: "logo_mazars.png",
        date: "01/09/2022",
        intervention: ["Réfection école primaire Ngolar sérère(Notto Diobass)"],
        total:10000000,
        contacts: "mazars.org"
    },
    senum: {
        nom: "Senum",
        logo: "logo_senum.png",
        date: "01/09/2024",
        intervention: ["Démarches en cours ..."],
        total: "",
        contacts: "senum.com"
    },
    seter: {
        nom: "Seter",
        logo: "logo_seter.png",
        date: "01/09/2024",
        intervention: ["Démarches en cours ..."],
        total: "",
        contacts: "seter.sn"
    }
    }
    const fontSize="0.6rem";
    return <div className='parteners' style={{width:"80%",height:"80vh",margin:"0px",padding:"10vh 10%",paddingTop:"15vh",}}>
        {/*<img src="/images/teamniintche.png" width="60px" height="50px"/>*/}
        <h3 style={{color:"rgba(0,0,100,0.3)",padding:"1rem 0px",}}>La TeamNiintche remercie tous ses partenairees et collaborateurs.</h3>
        <table style={{width:"100%",height:"fit-content",}}>
            <thead>
                <th style={{height:"4rem",lineHeight:"1rem",backgroundColor:"rgba(0,0,100,0.3)",}}>Nom & Logo</th>
                <th style={{width:"8rem",backgroundColor:"rgba(0,0,100,0.3)",fontSize:fontSize,}}>Dépuis ...</th>
                <th style={{backgroundColor:"rgba(0,0,100,0.3)",paddingRight:"1rem",fontSize:fontSize,}}>Activités</th>
                <th style={{backgroundColor:"rgba(0,0,100,0.3)",fontSize:fontSize,minWidth:"10rem",fontWeight:"bold",textAlign:"center",}}>Apport total (F cfa)</th>
                <th style={{backgroundColor:"rgba(0,0,100,0.3)",fontSize:fontSize,}}>Contacts</th>
            </thead>
            <tbody>{Object.values(parteners).map(ptner=>{
                   return <tr style={{height:"5rem",borderBottom:"1px solid rgba(0,0,100,0.3)",}}>
                        <td style={{lineHeight:"1rem",}}>
                           <img src={"logos_partenaires/"+ptner.logo} width="70px" height="40px"/>
                           <br/>
                           <span>{ptner.nom}</span>
                        </td>
                        <td style={{width:"8rem",paddingRight:"1rem",fontSize:fontSize,}}>{ptner.date}</td>
                        <td style={{fontSize:fontSize,}}>{ptner.intervention.map(actvt=>(<li>{actvt}</li>))}</td>
                        <td style={{fontSize:fontSize,minWidth:"10rem",fontWeight:"bold",textAlign:"center",}}>{numStr(ptner.total,' '}</td>
                        <td style={{fontSize:fontSize,}}><a href="">{ptner.contacts}</a></td>
                    </tr>})}
            </tbody>
        </table>
        </div>
      
  }
