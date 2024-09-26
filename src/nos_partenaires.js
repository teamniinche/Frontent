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
            "Campagne TOUS A L'ÉCOLE 2021 à Kaguitte(Ziguinchor)",
            "Campagne TOUS A L'ÉCOLE 2023 à DABO (Ziguinchor)"
        ],
        total: "10 000 000 F cfa",
        contacts: "GROUPE SONATEL"
    },
    auchan: {
        nom: "Auchan",
        logo: "logo_auchan.png",
        date: "01/09/2022",
        intervention: [
            "Réfection école Keur Massar",
            "Réfection école Keur Madiabel(Kaolack)"
        ],
        total: "15 000 000 F cfa",
        contacts: "AUCHAN SENEGAL"
    },
    distingo: {
        nom: "Distingo",
        logo: "logo_distingo.png",
        date: "01/09/2022",
        intervention: [
            "Campagne TOUS A L'ÉCOLE 2021 à Kaguitte(Ziguinchor)",
            "Campagne TOUS A L'ÉCOLE 2023 à DABO (Ziguinchor)"
        ],
        total: "10 000 000 F cfa",
        contacts: "distingo.com"
    },
    fabrimetal: {
        nom: "Fabri Metal",
        logo: "logo_fabrimetal.png",
        date: "01/09/2022",
        intervention: ["Réfection école SEBI GARE (Sébikotane)"],
        total: "10 000 000 F cfa",
        contacts: "fabrimetal.com"
    },
    mazars: {
        nom: "Mazars",
        logo: "logo_mazars.png",
        date: "01/09/2022",
        intervention: ["Réfection école Ngolar sérère(Notto Diobass)"],
        total: "10 000 000 F cfa",
        contacts: "mazars.org"
    },
    senum: {
        nom: "Senum",
        logo: "logo_senum.png",
        date: "01/09/2022",
        intervention: ["Démarches en cours ..."],
        total: "",
        contacts: "senum.com"
    },
    seter: {
        nom: "Seter",
        logo: "logo_seter.png",
        date: "01/09/2022",
        intervention: ["Démarches en cours ..."],
        total: "",
        contacts: "seter.sn"
    }
};
   /* const auchan=require('./images/logos_partenaires/logo_auchan.png');
    const sonatel=require('./images/logos_partenaires/logo_sonatel.png');
    const seter=require('./images/logos_partenaires/logo_seter.png');
    const senum=require('./images/logos_partenaires/logo_senum.png');
    const mazars=require('./images/logos_partenaires/logo_mazars.png');
    const distingo=require('./images/logos_partenaires/logo_distingo.png');
    const fabrimetal=require('./images/logos_partenaires/logo_fabrimetal.png');
   

    const trPartenaires=()=>{return 
                    }*/
    return <div className='parteners' style={{width:"80%",height:"80vh",margin:"0px",padding:"10vh 10%",paddingTop:"15vh",}}>
        <table style={{width:"80%",height:"fit-content",}}>
            <thead>
                <th style={{lineHeight:"1rem",}}>Nom & Logo</th>
                <th style={{with:"6rem",}}>Dépuis ...</th>
                <th>Activités</th>
                <th>Apport total</th>
                <th>Contacts</th>
            </thead>
            <tbody>{Object.values(parteners).map(ptner=>{
                   return <tr style={{height:"6rem",}}>
                        <td style={{lineHeight:"1rem",}}>
                           <img src={"logos_partenaires/"+ptner.logo} width="70px" height="60px"/>
                           <br/>
                           <span>{ptner.nom}</span>
                        </td>
                        <td style={{with:"6rem",}}>{ptner.date}</td>
                        <td>{ptner.intervention.map(actvt=>(<li>{actvt}</li>))}</td>
                        <td>{ptner.total}</td>
                        <td>{ptner.contacts}</td>
                    </tr>})}
            </tbody>
        </table>
        </div>
      
  }
