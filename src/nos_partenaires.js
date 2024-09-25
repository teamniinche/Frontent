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
        total: "",
        contacts: ""
    },
    seter: {
        nom: "Seter",
        logo: "logo_seter.png",
        date: "01/09/2022",
        intervention: ["Démarches en cours ..."],
        total: "",
        contacts: ""
    },
    auchan: {
        nom: "Auchan",
        logo: "logo_auchan.png",
        date: "01/09/2022",
        intervention: [
            "Réfection école Keur Massar",
            "Réfection école Keur Madiabel(Kaolack)"
        ],
        total: "",
        contacts: ""
    },
    distingo: {
        nom: "Distingo",
        logo: "logo_distingo.png",
        date: "01/09/2022",
        intervention: [
            "Campagne TOUS A L'ÉCOLE 2021 à Kaguitte(Ziguinchor)",
            "Campagne TOUS A L'ÉCOLE 2023 à DABO (Ziguinchor)"
        ],
        total: "",
        contacts: ""
    },
    fabrimetal: {
        nom: "Fabri Metal",
        logo: "logo_fabrimetal.png",
        date: "01/09/2022",
        intervention: ["Réfection école SEBI GARE (Sébikotane)"],
        total: "",
        contacts: ""
    },
    mazars: {
        nom: "Mazars",
        logo: "logo_mazars.png",
        date: "01/09/2022",
        intervention: ["Réfection école Ngolar sérère(Notto Diobass)"],
        total: "",
        contacts: ""
    },
    senum: {
        nom: "Senum",
        logo: "logo_senum.png",
        date: "01/09/2022",
        intervention: ["Démarches en cours ..."],
        total: "",
        contacts: ""
    }
};
    return <div className='parteners' style={{width:"92%",height:"100vh",margin:"0px",padding:"4% 10%",}}>
        <table style={{width:"80%",height:"fit-content",}}>
            <thead>
                <th>Nom & Logo</th>
                <th>Dépuis ...</th>
                <th>Activités</th>
                <th>Apport total</th>
                <th>Contacts</th>
            </thead>
            <tbody>
               {Object.values(parteners).map(ptner=>{
                   /*let logoLink='./images/RS_logos/'+ptner.logo;
                   let logo=require(logoLink);*/
                   return <tr>
                        <td>
                           <img src="./images/RS_logos/facebook.webp" width="50px" height="40px"/>
                           <br/>
                           <span>{ptner.nom}</span>
                        </td>
                        <td>{ptner.date}</td>
                        <td>{ptner.intervention.map(actvt=>(<li>{actvt}</li>))}</td>
                        <td>{ptner.total}</td>
                        <td>{ptner.contacts}</td>
                    </tr>
                })}
            </tbody>
        </table>
        </div>
      
  }
