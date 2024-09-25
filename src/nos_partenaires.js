import {partenaires} from './partenaires.js';
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
               {partenaires.map(ptner=>{ <tr>
                    <td>{ptner.nom}</td>
                    <td>{ptner.date}</td>
                    <td>{ ptner.map(actvt=><li>{actvt && actvt.nom}</li>)}</td>
                    <td>{ptner.total}</td>
                    <td>{ptner.contacts}</td>
                </tr>})}
            </tbody>
        </table>
        </div>
      
  }
