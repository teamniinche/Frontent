import React,{useEffect, useState} from 'react';
import ReactModal from 'react-modal'
import './forms.css';
import {NousContacter} from './nousContacter.js'
// import { useNavigate } from 'react-router-dom';
import { identifiant,user,securite,calendrier,formation,telephone,mail,localisation} from './icons';
import * as validate from './regExpressions.js';
// import {Poster} from './requetesFetch.js';
import {DataListDepartements} from './dataListes.js';
import { loader } from './toast.js';
import {serverUrl} from './root.js';
const hostUrl=serverUrl
let types={
    text:"text",
    submit:"submit",
    checkbox:"checkbox",
    radio:"radio",
    file:"file",
    }
let radioStyleFemme={
    display:"inline-block",
    margin:"0px",
    padding:"0px",
    width:"30%",
    height:"30%",
    textAlign:"center",
    color:"rgba(255,0,255,1)",
    }
let radioStyleHomme={
    display:"inline-block",
    margin:"0px",
    padding:"0px",
    width:"30%",
    height:"30%",

    textAlign:"center",
    color:"blue",
    }

let styleInputLabel ={fontSize:"1em",letterSpacing:"2px",width:"fit-content",display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:"center"}
let star=<span style={{color:"red",fontWeight:"bold",fontSize:"1em"}}> *</span>

export default function Forms() {
    const [membre,setMembre]=useState(
        {Prénom:"",Nom:"",Sexe:"",Date:"",
        Département:"",Adresse:"",Téléphone:"",
        Pseudo:"",Mot:"",Confirmer:""
        })
    const [pseudo_Email_Code,setPseudo_Email_Code]=useState({pseudo:null,email:null,code:null,show:false})
    // const Navigate=useNavigate()
    const nouveauMembre={
        pseudo:membre.Pseudo,
        passWord:membre.Mot,
        firstName:membre.Prénom,
        lastName: membre.Nom,
        alias: "",
        sexe: membre.Sexe,
        departementDOrigine: membre.Département,
        dateAnniversaire: membre.Date,
        telephoneNumber: membre.Téléphone,
        email: membre.Adresse,
        formation1: "",
        formation2: "",
        qualification:membre.Qualification,
        tngroupe: "",
        galeriePrive: {
            imgPublic: "chantierCasamance.jpg",
            imgPrive: "",
            imgPublic1: "",
            imgPublic2: ""
        },
        apropos:"",
        confidentiel:"",
        statu: "v",
        profil: "common"
        }

    const [validite,setValidite]=useState({Prénom:false,Nom:false,Sexe:false,Date:false,Département:false,Adresse:false,Téléphone:false,Pseudo:false,Mot:false,Confirmer:false})
    const VALIDITE=validite.Prénom && validite.Nom && validite.Sexe && validite.Département && validite.Adresse && validite.Téléphone && validite.Pseudo && validite.Mot
    function validatorSwitch(arrayOfValidator,propriete){
        switch (propriete){
            case "Date":
                return arrayOfValidator.dateValidator;
            case "Téléphone":
                return arrayOfValidator.phoneValidator;
            case "Adresse":
                return arrayOfValidator.emailValidator;
            case "Confirmer":
                return arrayOfValidator.passwordValidator;
            case "Pseudo":
                return arrayOfValidator.pseudoValidator;
            case "Mot" || "Confirmer":
                return arrayOfValidator.passwordValidator;
            case "Nom":
                return arrayOfValidator.lastNameValidator;
            default:
                return arrayOfValidator.nameValidator;
            }
        }
    function handleChange(obj){
        let button=document.getElementById("buttonValider");
        if(!obj.bool){ //si ENTREE ne correspond à un pseudo existant
            let name=(obj.nom).split(" ")[0]
            if(name!=='Sexe'){ // Si ENTREE c'est le choix du sexe, pas besoin de la controler
                let id=name+"messageValidation";
                let para=document.getElementById(id);
                if(!validatorSwitch(validate,name).test(obj.val)){ // Controle de l'ENTREE pour les champs autres que "Sexe"
                    para.style.color="red";                         // ENTREE invalide
                    para.innerText='❌ '+name.toUpperCase()+' null !';
                    button.style.display="none";
                    if(name==='Pseudo'){
                        setMembre({...membre,Pseudo:"null",Mot:"null",Confirmer:"null"})
                        setValidite({...validite,Pseudo:false,Mot:false});
                    }else{
                        setMembre({...membre,[name]:"null"})
                        setValidite({...validite,[name]:false});
                    }
                }else{                                              //ENTREE valide
                    para.style.color="green";
                    para.innerText='✔';
                    if(VALIDITE){  //Controle si tous les champs sont buen remplis
                    button.style.display="block"
                    }
                    setMembre({...membre,[name]:obj.val})
                    setValidite({...validite,[name]:true});
                }
            }else{
                setMembre({...membre,Sexe:obj.val})
                setValidite({...validite,Sexe:true});
            }
        }else{// Si c'est PSEUDO et existe déjà(bool=true)
            let parag=document.getElementById("PseudomessageValidation");
            parag.style.color="red";
            parag.innerText='Ce pseudo existe déjà !';
            button.style.display="none";
            setMembre({...membre,Pseudo:null,Mot:null,Confirmer:null})
            setValidite({...validite,Pseudo:false,Mot:false,Confirmer:false});
            // alert('Ce Pseudo existe déjà !')
        }
        // console.log(nouveauMembre)
        // console.log(validite)
    }


    const Poster=(url,state)=>{
        fetch(url,
            {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(state)
            })
            .then(response => {
              if (response.ok) {return response.json();} 
              else {alert('Erreur lors de la tentative de POSTER.');}
            })
            .then(data => {if (data && data.pseudo){
              const url_confirm_email=hostUrl+'api/membres/sendConfirmationMail'
              const {newMembreId,pseudo,email}=data
              fetch(url_confirm_email,
                {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({pseudo:pseudo,email:email})
                })
                .then(response => {
                  if (response.ok) {return response.json();} 
                  else {alert("Erreur lors de la tentative de verification d'email." );}
                })
                .then(()=>setPseudo_Email_Code({pseudo:pseudo,email:email,show:true}))
            //   alert('Bienvenue '+ data.firstName + ' 👌🏻! Vous étes bien inscrit. Veuillez bien patienter pour la validatiion de votre inscription 🙏🏻🙏🏻🙏🏻')}
            //   alert('Poste bien réussi !')
    }})
      }



   const handleClick=(e)=>{
        e.preventDefault()
        if(VALIDITE && (membre.Mot===membre.Confirmer)){
            Poster(hostUrl+'api/membres/newMembre',nouveauMembre)
            setMembre({...membre,Pseudo:null,Mot:null,Confirmer:null})
        }else{alert("✖ Impossible d'envoyer le formulaire; il y'a des DONNEES NON CONFORMES !Veuillez bien vérifier les données saisies.")}
    }
        
    return <>
        <div className="divtec">
            <form className="form">
                <div style={{width:"90%",position:"sticky",top:"60px",backgroundColor:"rgba(255,0,0,.09)",maxHeight:"100px",margin:"2% 5%",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <h3 style={{minHeight:"50%"}}>📖 Formulaire d'incription 📖</h3>
                    <h5 style={{minHeight:"50%",letterSpacing:"2px",color:"grey"}}>Les champs avec astherisque (*) sont obligatoires ❗</h5>
                </div>
                <InputString type="text" for="Prénom" icon={identifiant} render={(obj)=>{handleChange(obj)}}/>
                <InputString type="text" for="Nom de famille" render={(obj)=>{handleChange(obj)}}/>
                <InputCheckBox for="sexe" option1="Homme" option2="Femme" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="date" icon={calendrier} for="Date de naissance" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="text" icon={formation} for="Qualification et/ou Profession" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="text" list icon={localisation} for="Département de domicile"  render={(obj)=>{handleChange(obj)}}/>
                <InputString type="phone" icon={telephone} for="Téléphone" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="mail" icon={mail} for="Adresse mail" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="text" for="Pseudo" icon={user} render={(obj)=>{handleChange(obj)}}/>
                <InputString type="password" for="Mot de passe" icon={securite} render={(obj)=>{handleChange(obj)}}/>
                <InputString type="password" for="Confirmer Mot de passe" icon={securite} render={(obj)=>{handleChange(obj)}}/>
                <button  id='buttonValider' onClick={(e)=>handleClick(e)}>Valider</button>
                {/* <button onClick={()=>{onClick()}}>Enregistrer les modifs</button> */}
            </form>
            <ReactModal
            isOpen={pseudo_Email_Code.show}
            style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex:15000,
                        alignContent:"center",
                    },content: {
                    position: 'absolute',
                    top: '20vh',
                    right: '8vw',
                    bottom: '40vh',
                    border: '1px solid #ccc',
                    background: 'white',
                    width:'82vw',
                    maxWidth:'400px',
                    height:'fit-content',
                    maxHeight:'400px',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '10px',
                    outline: 'none',
                    padding: '1vw',
                    paddingTop:"0px",
                    margin:"auto",
                zIndex:30000,
                }}}
            >
            <ConfirmEmail render={()=>setPseudo_Email_Code({...pseudo_Email_Code,show:false})} item={pseudo_Email_Code}/>
                </ReactModal>
        </div>
        <NousContacter/>
        </>
}
export function ConfirmEmail(props){
    const [ICode,setICode]=useState(null)
    const {pseudo,email}=props.item
    const inputCode=(e)=>{
        document.getElementById('uncorrect').style.display='none'
        const val=e.target.value
        if(val.length<=4){setICode(val)}
    }
    const handleCodeValide=()=>{
            const loader=document.getElementById('loader')
            const unCorrect=document.getElementById('uncorrect')
            loader.style.display='inline'
            const url_validation=hostUrl+'api/membres/code_is_valid'
            // const url_mise_a_jour=hostUrl+'api/membres/updateValidation'
            if(ICode!==null && ICode!=="" && ICode.length===4){
                fetch(url_validation,
                    {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email:email,code:ICode})
                    })
                    .then(response => response.json())
                    .then(data => {if (data.isValid){
                            // unCorrect.display='none'

                            props.render()
                            alert("✔✔ E-MAIL confirmé")
                        }else{
                            unCorrect.style.display='inline'
                        }
                        loader.style.display='none'
                    })
            }else{
                unCorrect.style.display='inline' 
            }
        }

    return <>
    <div style={{position:"sticky",top:"0px",backgroundColor:"white",width:"92%",paddingBottom:'15px',margin:'5px',borderBottom:'.5px solid brown',display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <div style={{width:"92%",margin:'5px',display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
            <h4 style={{color:"brown",width:"90%",letterSpacing:"3px",margin:"0px",padding:".4em 0px",textDecoration:".2px underline brown"}}>Vérification d'E-mail 💌</h4>
            <span style={{width:'5%',textAlign:'right',paddind:'0px'}}><i class="fas fa-xmark" style={{color:"rgba(200,0,0,.6)"}} onClick={()=>props.render()}></i></span>
        </div>
    </div>
    <div style={{listStyle:"none",display:"flex",flexDirection:"column",alignItems:"center",padding:"2%",margin:"0px",lineHeight:"2em"}} >
        <h4 style={{width:"88%",display:"flex",alignItems:"center",justifyContent:"center",padding:"0px 10%",textDecoration:"none"}} >{pseudo}, <br/>veuillez entrer le code à 4 chiffres envoyé à l'adresse {email}</h4>
        <input type="text" value={ICode} placeholder="****" style={{width:"80%",fontWeight:"bold",color:"rgb(150,0,0)",letterSpacing:"1rem",textAlign:"center",height:"2em",padding:"0.4em",marginBottom:"2em",}} onChange={(e)=>inputCode(e)}/>
        <div style={{width:"100%",height:"fit-content",display:"flex",justifyContent:"center",alignItems:"center",paddind:"0px",margin:"0px"}}><button onClick={handleCodeValide} style={{mouse:"pointer",borderRadius:"10px",textDecoration:"none",width:"fit-content",backgroundColor:"rgb(0,0,150)",fontWeight:"bold",color:"white",padding:".5em 2em",border:"1px dotted rgb(0,0,200)",margin:"2em 5%"}}>Vérifier</button><span id="loader" style={{margin:"0px",padding:"0px"}}>{loader}</span><span id="uncorrect">❌</span></div>
    </div>
</>
}
export  function InputString(props){ 
    const [state,setState]=useState({val:"",nom:"",label:"",bool:false})
    let name=props.for;
    let icon=props.icon?props.icon:"";
    function handleChange(event){
        let label=event.target.value===""?"":<>{name} {star}</>
        if(name==="Pseudo"){//RESET quand en modification
            setState({...state,val:event.target.value,nom:event.target.name,label:label,bool:false})
            props.render({...state,val:event.target.value,nom:event.target.name,bool:false})
        }else{
            setState({...state,val:event.target.value,nom:event.target.name,label:label})
            props.render({...state,val:event.target.value,nom:event.target.name})
        }
        // console.log({...state,val:event.target.value,nom:event.target.name})
        }
    const idd=props.for.split(" ")[0];
    useEffect(()=>{
        let inputList=document.getElementById(idd)
        if (props.list){
            inputList.setAttribute('list','departements');
            }
        },);
    function handleFocus(){
        // console.log(state)
        let label=<>{name} {star}</>
        setState({...state,label:label})
        if(name==='Pseudo'){
            const parag1=document.getElementById("Mot");
            const parag2=document.getElementById("Confirmer");
            const parag1Message=document.getElementById("MotmessageValidation");
            const parag2Message=document.getElementById("ConfirmermessageValidation");
            parag1.value='';
            parag2.value='';
            parag1Message.innerText=''
            parag2Message.innerText=''
        }
        }
    function handleBlur(event){
        let val=event.target.value;
        let label=event.target.value===""?"":<>{name} {star}</>
        setState({...state,label:label})
        if(name==="Pseudo"){
            fetch(hostUrl+'api/membres/allmembres/pseudos/'+val)
                .then(response => response.json())
                .then(bool=> {
                    // console.log({...state,bool:bool})
                    setState({...state,bool:bool})
                    props.render({...state,bool:bool})
                })
                // .catch(error => setError(error.message))
        }
        }

  return (
    <div className="div-input">
        <label htmlFor={props.for} className="labelInputString" id={props.id} style={styleInputLabel}> {state.label} </label>
        <div className="divEnglobantInputEtIcon"><span className="spanForIcon">{icon}</span><input type={props.type} id={props.for.split(" ")[0]} name={props.for} className="form_input" onBlur={(event)=>handleBlur(event)} onFocus={(event)=>handleFocus(event)} onChange={(event)=>handleChange(event)} placeholder={name+' *'} required /></div>
        <DataListDepartements/>
        <p id={props.for.split(" ")[0]+'messageValidation'}  style={{height:"3em",width:"fitContent",fontWeight:'bold',fontSize:'1em',margin:'0px 12%',marginBottom:'20px',padding:'0px'}}></p>
    </div>
    )}
    
export  function InputFile(props){ 
        const [state,setState]=useState({val:"",nom:""})
        let name=props.for;
        let label=<>{name} {star}</>
        function handleChange(event){
            setState({...state,val:event.target.value,nom:event.target.name})
            props.render({val:event.target.value,nom:event.target.name})
            }
        return (
            <div className="div-input">
                <label htmlFor={props.for} className="labelInputString" id={props.id} style={styleInputLabel}> {label} </label>
                <input type={types.file} name={props.for} className="form_input" onChange={handleChange} required />
            </div>
        )}


export  function InputCheckBox(props){
            function hHandleClick(event,state){
                props.render({nom:"Sexe",val:"Homme"});
                }
            function fHandleClick(event){
                props.render({nom:"Sexe",val:"Femme"});
                }
            return (
                <div className="div-input">
                    <legend text="Sexe" style={{display:"flex",flexDirection:"row",width:"106%",height:"70%", padding: "0% 0%",
                            margin: "0.2% 0px",border:"none",backgroundColor:"white",justifyContent:"center",alignItems:"center",marginBottom:"-2%"}}>

                        <span onClick={hHandleClick} style={{width:"50%",marginTop:"0%"}}>
                            <label htmlFor={props.option1} className="labelInputString" style={radioStyleHomme} id={props.option1} > {props.option1} </label>
                            <input type="radio"
                                    name={props.option1}
                                    className="form_input"
                                    style={radioStyleHomme}
                                    required
                                />
                            {/* <button onClick={()=>alert(state.sexe)}>Verify</button> */}
                        </span>
                        <span onClick={fHandleClick} style={{width:"50%",height:"100%",marginTop:"0%"}}>
                            <label htmlFor={props.option1} className="labelInputString" style={radioStyleFemme} id={props.option2} > {props.option2} </label>
                            <input type="radio"
                                    name={props.option1}
                                    className="form_input"
                                    style={radioStyleFemme}
                                    required
                                />
                        </span>
                    </legend>
                </div>
            )}
    
    

