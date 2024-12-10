export function Titre({talgn,text}){
    const ta=talgn?talgn:'center';
    return <h2 style={{textAlign:ta,maxWidth:"70vw",paddingTop:'2.5rem',paddingBottom:'2rem',margin:'0px',fontFamily:'monospace',fontWeight:'bold',color:'rgba(200,0,0,0.7)',}}>
        {text}
    </h2>
}
export function SousTitre({text}){
    return <h3 style={{textAlign:'left',paddingTop:'2rem',paddingBottom:'2rem',margin:'0px',fontFamily:'monospace',fontWeight:'bold',color:'rgba(0,0,90,0.5)',borderBottom:'1px solid grey',}}>
        {text}
    </h3>
}