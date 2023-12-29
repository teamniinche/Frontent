import {Link} from 'react-router-dom'
import './style.css'

export default function Actu() {
    const actu={
        mots1:'Cependant vous pouvez visiter les autres pages accessibles dépuis le ',
        // 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        // images:['arrivee_ecole2.jpg','background.jpg'],
        // mots2:''
        // 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    }
    // curl https://api.cloudinary.com/v1_1/demo/image/upload -X POST --data 'file=sample.jpg&timestamp=173719931&api_key=436464676&signature=a781d61f86a6f818af'
    const imgStyle1={
        // float:"left",
        width:"8em",
        height:"8em",
        margin:".05em",
        marginLeft:"0px",
        position:"absolute",
        display:"inline"
    }
    const imgStyle2={
        // float:"left",
        width:"8em",
        height:"8em",
        margin:".05em",
        marginRight:"0px",
        position:"absolute",
        display:"inline"
    }
    // const src1=require('./images/'+actu.images[0])
    // const src2=require('./images/'+actu.images[1])
    const handleMenuClick=()=>{
        const displayOfMenu=document.querySelector('#menu').style.display
        if(displayOfMenu==="none"){
            document.querySelector('#menu').style.display='flex';
        }else{
            document.querySelector('#menu').style.display='none';
        }
    }
    return <div>

        <div style={{margin:"0px",padding:"1em",width:"90%"}}>
            <p style={{margin:"0px",padding:"0px",width:"100%",lineHeight:"2rem"}}>
                <span className="badge" style={{color:"rgba(255,0,0,.6)",border:"1px solid rgba(255,0,0,.3)",borderRadius:"5px",letterSpacing:"3px"}}>CETTE PAGE EST EN COURS DE CONCEPTION ...</span>
                <br/>
                {actu.mots1} 👉
                <span className="badge" style={{color:"rgba(0,0,255,.6)",border:"1px solid blue",borderRadius:"5px"}} onClick={handleMenuClick}>MENU</span>
            </p>
        </div>
        <div style={{margin:"0px",padding:"1em",width:"90%",paddingBottom:"30vh"}}>
            {/* <img src={src1} alt='flyeuse' style={imgStyle1}/> */}
            {/* <p style={{margin:"0px",padding:"0px",width:"100vw",textAlign:"justify"}}>
                {actu.mots1}
            </p> */}
            {/* <p style={{margin:"0px",padding:"0px",width:"90%",textAlign:"justify",position:"absolute",float:"left"}}>
                {actu.mots2}
            </p>
            <img src={src2} alt='idea' style={imgStyle2}/> */}
            <span style={{marginBottom:"100px"}}>Pour de plus amples informations, <Link to='/nouscontacter' style={{fontWeight:"bold",display:"inline"}}>nous conctacter</Link> sur nos plateformes digitales.
            </span>
        </div>
      </div>
  }
