//import {partenaires} from './partenaires.js';
const parteners={
    sonatel:{nom:"Sonatel",logo:"logo-sonatel.jpg",date:"01/09/2022",intervention:["Campagne TOUS A L'ÉCOLE 2021 à Kaguitte(Ziguinchor)","Campagne TOUS A L'ÉCOLE 2023 à DABO (Ziguinchor)"] ,total:"",contacts:""},
    seter:{nom:"Seter",logo:"logo-seter.jpg",date:"01/09/2022",intervention:["Démarches en cours ..."],total:"",contacts:""},
    auchan:{nom:"Auchan",logo:"logo-auchan.jpg",date:"01/09/2022",intervention:["Refection école Keur Massar","Réfection école Keur Madiabel(Kaolack)"],total:"",contacts:""},
    distingo:{nom:"Distingo",logo:"logo-distingo.jpg",date:"01/09/2022",intervention:["Campagne TOUS A L'ÉCOLE 2021 à Kaguitte(Ziguinchor)","Campagne TOUS A L'ÉCOLE 2023 à DABO (Ziguinchor)"],total:"",contacts:""},
    fabrimetal:{nom:"Fabri Metal",logo:"logo-fabrimetal.jpg",date:"01/09/2022",intervention:["Réfection école SEBI GARE (Sébikotane)"],total:"",contacts:""},
    mazars:{nom:"Mazars",logo:"logo-mazars.jpg",date:"01/09/2022",intervention:["Réfection école Ngolar sérère(Notto Diobass)"],total:"",contacts:""},
    senum:{nom:"Senum",logo:"logo-senum.jpg",date:"01/09/2022",intervention:["Démarches en cours ..."],total:"",contacts:""}
}
export default function Partenaires() {


    return <div className='parteners' style={{width:"100%",height:"100vh",margin:"0px",padding:"2rem 10%",}}>
        <table style={{width:"80%",height:"fit-content",}}>
            <thead>
                <th>Nom & Logo</th>
                <th>Dépuis ...</th>
                <th>Activités</th>
                <th>Apport total</th>
                <th>Contacts</th>
            </thead>
            <tbody>
               {Array.from(parteners).map(ptner=>{ <tr>
                    <td>{ptner.nom}</td>
                    <td>{ptner.date}</td>
                    <td>{/* ptner.map(actvt=><li>{actvt && actvt.nom}</li>)*/}</td>
                    <td>{ptner.total}</td>
                    <td>{ptner.contacts}</td>
                </tr>})}
            </tbody>
        </table>
        </div>
      
  }
