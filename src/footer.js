import React from 'react';
import './css/footer.css';
import { partenaires,missionActions,rs,activities,contacts} from './iterables.js';
// let table = new DataTable('.table');
export default function Footer(){
   
return <div style={{display:'flex',flexDirection:'column',width:'100%',}}>

<FooterItemContainer>
        <div >
            <FooterItem tilte='Nous Contacter' jsArray={contacts}/>
            <FooterItem tilte='Nos Mission & Actions' jsArray={missionActions}/>
        </div>
        <FooterItem tilte='Nos Partenaires' jsArray={partenaires}/>
        <FooterItem tilte='Nos Réalisations' jsArray={activities}/>
        <FooterItem tilte='Nos Réseaux sociaux' jsArray={rs}/>

</FooterItemContainer>
</div>
}

// const activities=[
// 'Ecole primaire de Ngolar sérère - Noto Diobass',
// 'Lycée John Fitzgerald Kennedy',
// 'Ecole Manguier 2',
// 'Lycée Lamine Gueye(Réfectoire)',
// 'Lycée Blaise Diagne',
// 'Ecole élémentaire de Yoff',
// 'Lycée Ousmane Sembene de Yoff',
// 'Ecole élémentaire LA LINGUERE(Keur Massar)',
// 'Ecole élémentaire Soukeyna Konaré(Saint Louis)',
// 'Ecole Sebi Gare(Sebikotane)',
//   'Ecole Primaire de Fakhane(Bambey) X2',
//   'Ecole primaire de Keur Madiabel(Kaolack)',
//   'Ecole Hamo 3 Guediawaye',
//   'Dahra Keur Mady DRAME(Kaolack)',
//   'Daray Serigne El Hadji MBACKE(TOUBA) X2',
//   'Ecole Lamane Ngomak Faye(Thiès)',
//   'Annexe Empire des enfants(Popenguine)',
//   'Ecole élémentaire Amath BA de Podor',
//   'Ecole Kaguitte(Campagne 2022 distribution des fournitures sclaires) - Ziguinchor',
//   'Ecole 4 Gayenne pres de école Serigne Bassirou Mbacké - Gossas',
//   'Ecole 9 - Dagana',
//   'Ecole Sinthiou Daga(Campagne 2021 distribution des fournitures sclaires) - Kaolack',
//   'Mour Diop(Salle informatique) - Medina',
//   'Ecole 4 de Nguekokh - Fatick',
//   'Plage Bargny(Operation plage Zéro dechets)',
//   "École primaire Bacary DABO (Campagne <<Tous à l'école>> 2023) - Kaguitte(Ziguinchor)",
//   "École primaire Kaguitte kassou (Campagne <<Tous à l'école>> 2023) - Kaguitte(Ziguinchor)",
//   "École primaire Nyassia (Campagne <<Tous à l'école>> 2023) - Nyassia(Ziguinchor)",

// ];
// const contacts=[
//     ['+221 77 616 01 04','/logos_contacts/call.png',''],
//     ['teamniintche@gmail.com','/images/RS_logos/gmail.webp',''],
//     ['Siège : Grand-Dakar rue *** n','/logos_contacts/location.png','']
// ]

// const missionActions=[
//     "Rénovation d'écoles et de Daaras",
//     "Réparation de de table-bancs",
//     "Aides aux parents d'élèves en kits scolaires"

// ]

// const rs=[ ['X (ex twitter)','/images/RS_logos/twitter.webp','https://www.x.com/TeamNiintche/'],
//     ['Facebook','/images/RS_logos/facebook.webp','https://www.facebook.com/teamniintche/'],
//     ['Youtube','/images/RS_logos/youtube.webp','https://www.youtube.com/@teamniintche2097/'],
//     ['Instagram','/images/RS_logos/instagram.webp','https://www.Instagram.com/teamniintche/'],
//     ['Linkedin','/images/RS_logos/linkedin.webp','https://www.linkedin.com/company/team-niintche/']
// ]
function FooterItemContainer({children}){
    return <div id="footer-item-container">
        {children}
    </div>
}

function FooterItem({tilte,jsArray}){
        
        return <div className="item-container">
        <h3 style={{letterSpacing:'3px',color:'grey',margin:'0px',borderRight:'5px solid rgba(200,0,0,0.7)',borderBottom:'1px solid grey',}}>{tilte}</h3>
        <ul className="footer-items">
            {jsArray[0][0].length>1?jsArray.map((el,key)=>
                <li id={key}>
                    <a href={el[2]} target='_blank' rel='noreferrer' style={{display:'flex',textDecoration:'none',flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:'0.5rem',}}>
                        <img src={el[1]} alt={el[0]} width="30px" height="30px"/>
                        {el[0]}
                    </a>
                </li>)
            :jsArray.map((el,key)=><li id={key} style={{marginBottom:'0.5rem',}}><span>{key+1}</span>{el}</li>)
            }
            
        </ul>
    </div>
}