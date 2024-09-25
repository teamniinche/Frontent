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
        logo: "logo-sonatel.png",
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
        logo: "logo-seter.png",
        date: "01/09/2022",
        intervention: ["Démarches en cours ..."],
        total: "",
        contacts: ""
    },
    auchan: {
        nom: "Auchan",
        logo: "logo-auchan.png",
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
        logo: "logo-distingo.png",
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
        logo: "logo-fabrimetal.png",
        date: "01/09/2022",
        intervention: ["Réfection école SEBI GARE (Sébikotane)"],
        total: "",
        contacts: ""
    },
    mazars: {
        nom: "Mazars",
        logo: "logo-mazars.png",
        date: "01/09/2022",
        intervention: ["Réfection école Ngolar sérère(Notto Diobass)"],
        total: "",
        contacts: ""
    },
    senum: {
        nom: "Senum",
        logo: "logo-senum.png",
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
               {Object.values(parteners).map(ptner=>{var logo="./images/logos partenaires/"+ptner.logo; return <tr>
                    <td>
                       <img src={logo} width="20px" height="30px"/>
                       <br/>
                       <span>{ptner.nom}</span>
                   </td>
                    <td>{ptner.date}</td>
                    <td>{ptner.intervention.map(actvt=>(<li>{actvt}</li>))}</td>
                    <td>{ptner.total}</td>
                    <td>{ptner.contacts}</td>
                </tr>})}
            </tbody>
        </table>
        </div>
      
  }
