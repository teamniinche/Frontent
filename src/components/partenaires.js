export default function Partenaires({obj}){
    const {src,alt,name,url,an}=obj;
    return <a href={url} target="_blank" rel="noreferrer" style={{position:'relative',maxWidth:'150px',width:'100%',height:'150px',margin:'2.5rem',marginTop:'1rem',backgroundColor:'transparent',}}>
    <img src={src} alt={alt} width="150px" height='150px' />
    <span style={{textAlign:'center',fontWeight:'bold',display:'inline-block',width:'100%',letterSpacing:'0.08rem',color:'rgb(0,0,90)',fontFamily:'reverse',}}>{name}</span>
    <span style={{position:'absolute',top:'-8px',left:"-2rem",display:'inline-block',letterSpacing:'0.08rem',fontSize:'0.7rem',padding:'0.2rem 0.2rem',borderRadius:'6px',backgroundColor:'rgba(0,0,100,0.5)',color:'white',}}>
        <span style={{display:'inline-block',height:'95%',border:'1px solid white',padding:'0.2rem 0.25rem',borderRadius:'4px',}}>{"Dépuis "+an}</span>
    </span>
    </a>
}
export function PartenerCard({imgLink,name}){
    return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0.5rem",backgroundColor:"white",borderRadius:"10px",}}>
        <img src={imgLink} alt="partener logo" style={{width:"100px",height:"100px",}}/>
        <span style={{textAlign:"center",}}>{name}</span>
    </div>
}

export function TeamEnChiffres({n,t}){
    return <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",margin:'10px',minWidth:'294px',width:'25%',}}>
        <span style={{textAlign:"center",padding:'1rem 0.5rem',marginRight:'2rem',display:'inline-block',backgroundColor:'rgba(0,125,0,0.8)',borderTopLeftRadius:'10px',borderBottomRightRadius:'10px',color:'white',fontWeight:'bold',width:'4rem',borderRight:'10px solid grey',}}>{n}</span>
        <h4 style={{textAlign:"left",display:'inline-block',color:'rgba(0,0,0,0.7)',fontFamily:'monospace',minWidth:'35%',width:'35%',overflow:'hidden',}}>{t}</h4>
    </div>
}