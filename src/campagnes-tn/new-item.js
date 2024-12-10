import React,{useState,useEffect, useContext} from 'react'
import ReactModal from 'react-modal';
import { InputString } from './input-class.js';
import { DisplayAlertContext} from './items.js';
import '../css/forms.css';
import '../css/campagne-css.css'
import * as validate from '../regExpressions.js';
import {serverApiUrl} from '../root.js';

const urls = {
    Nom: serverApiUrl+'users/add',
    Locality: serverApiUrl+'localities/add',
    Donateur:serverApiUrl+'dons/add'
};

export default function Modal({bool,entity}){
    // const [isModalOpen, setIsModalOpen] = useState(bool);
    const {DisplayTChange,configModal}=useContext(DisplayAlertContext);

    // useEffect(() => {
    //     setIsModalOpen(bool)
    // }, [entity,bool]);

    const Entity=(paramet)=>{
        var component;
        switch (paramet){
            case 'Users':
                component=AddUser
                break
            case 'Localities':
                component=AddLoc
                break
            default:
                component=AddDon
        }
        
        return component;
    }
    function handleIsModalOpen(){
        DisplayTChange(
            'sleep',
            {code:'green',message:''},
            0,
            {},
            {str:'rien',bool:false}
        )
    }

    return  <ReactModal
    isOpen={configModal.bool}
    style={{
            overlay: {
            position: 'fixed',
            top: 55,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex:999,
            },content: {
        position: 'absolute',
        top: '-50px',
        left: '2.5%',
        right: '2.5%',
        bottom: '0px',
        border: '1px solid #ccc',
        background: 'white',
        width:'90%',
        maxWidth:'90%',
        height:'95%',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '2%',
        paddingTop:"0px",
        zIndex:1000,
        }}
        }
        // overlayClassName="overlayChangeUser"
        className="contentClassName"
    >
        <div style={{padding:'10px 0px',margin:"auto",display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{position:"sticky",top:"0px",backgroundColor:"white",width:"92%",paddingBottom:'15px',margin:'5px',borderBottom:'.5px solid brown',display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <div style={{width:"92%",margin:'5px',display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                    <h3 style={{color:"brown",width:"90%",letterSpacing:"3px",margin:"0px",padding:".4em 0px",textDecoration:".2px underline brown"}}>Modification de profil</h3>
                    <span style={{width:'5%',textAlign:'right',paddind:'0px'}}><i className="fas fa-xmark" style={{color:"rgba(200,0,0,.6)"}} onClick={()=>handleIsModalOpen()}></i></span>
                </div>
            </div>
            <ModalChildrenContainer Component={Entity(entity)} /*render={boolea=>setIsModalOpen(boolea)}*/ />
        </div>
    </ReactModal>
}

function ModalChildrenContainer({Component /*,render*/}){

    const [membre,setMembre]=useState(
        {Prénom:"",Nom:"",Commune:"",Localite:"",Nombre:1,Impactes:5,Donateur:"",Locality:"",
        Departement:"",Adresse:"",Téléphone:"",Mot:"",Confirmer:""
        })
    const {DisplayTChange,id}=useContext(DisplayAlertContext)

    const nouveauMembre={
        Prénom:membre.Prénom,
        Nom:membre.Nom,
        Nombre:membre.Nombre,
        Impactes: membre.Impactes,
        Donateur: membre.Donateur,
        Localite: membre.Localite,
        Téléphone: membre.Téléphone,
        Adresse: membre.Adresse,
        Mot: membre.Mot,
        Confirmer: membre.Confirmer,
        Departement:membre.Departement,
        Commune: membre.Commune,
        Locality:membre.Locality,
        }

    const [validite,setValidite]=useState({Prénom:false,Nom:false,Commune:false,Localite:false,Departement:false,Adresse:false,Téléphone:false,Nombre:false,Donateur:false,Locality:false,Mot:false,Confirmer:false})
    
    const VALIDITE=(validite.Prénom && validite.Nom && validite.Adresse && validite.Téléphone && validite.Mot && validite.Confirmer) || (validite.Departement && validite.Commune && validite.Locality) || (validite.Prénom && validite.Téléphone && validite.Nombre && validite.Localite && validite.Donateur)
    
    function validatorSwitch(arrayOfValidator,propriete){
        switch (propriete){
            case "Téléphone":
                return arrayOfValidator.phoneValidator;
            case "Adresse":
                return arrayOfValidator.emailValidator;
            case "Nombre":
                return arrayOfValidator.numberValidator;
            case "Impactes":
                return arrayOfValidator.impactedValidator;
            case "Mot":
                return arrayOfValidator.passwordValidator;
            case "Confirmer":
                return arrayOfValidator.passwordValidator;
            default:
                return arrayOfValidator.nameValidator;
        }
    }

    function handleChange(obj){
        let button=document.getElementById("buttonValider");
        if(!obj.bool){ //si ENTREE ne correspond à un pseudo existant
            let name=(obj.nom).split(" ")[0]
            let id=name?name+"messageValidation":"AdressemessageValidation";// gestion du onblur only sans changement
            let para=document.getElementById(id);
            if(!validatorSwitch(validate,name).test(obj.val)){ // Controle de l'ENTREE pour les champs autres que "Sexe"
                para.style.color="red";                         // ENTREE invalide
                para.innerText='❌ '+name.toUpperCase()+' null !';
                button.style.display="block"//"none";
                if(name==='Adresse'){
                    setMembre({...membre,Pseudo:"null",Mot:"null",Confirmer:"null"})
                    setValidite({...validite,Pseudo:false,Mot:false});
                }else if(name==='Confirmer'){
                    if(obj.val.length>=5 && !membre.Mot.includes(obj.val)){
                        para.innerText+=': Les mots de passe correspondent pas'
                    }else{
                        setMembre({...membre,[name]:"null"})
                        setValidite({...validite,[name]:false});  
                    }
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
        }else{// Si c'est ADRESSE EMAIL et existe déjà(bool=true)
            let parag=document.getElementById("AdressemessageValidation");
            parag.style.color="red";
            parag.innerText='Cet utilisateur existe déjà !';
            button.style.display="block"//"none";
            setMembre({...membre,Pseudo:null,Mot:null,Confirmer:null})
            setValidite({...validite,Pseudo:false,Mot:false,Confirmer:false});
        }
    }
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const url=(obj,param)=>{
        var url=serverApiUrl+'localities/add';
        if(obj[param]!==""){ url=urls[param];}
        return url;
    }
    const firstElemNumeric=(str)=>{
        return parseInt(str.split("_")[0]);
    }

    function Urlencoded(obj,param){
        const urlencoded = new URLSearchParams();
        if(url(obj,param).includes('dons')){
            urlencoded.append("respoName", obj.Prénom);
            urlencoded.append("respoContact", obj.Téléphone);
            urlencoded.append("nberOfKit", obj.Nombre);
            urlencoded.append("nberOfImpacted", obj.Impactes);
            urlencoded.append("userId", firstElemNumeric(obj.Donateur));
            urlencoded.append("localityId", firstElemNumeric(obj.Localite));
        }else if(url(obj,param).includes('users')){
            urlencoded.append("fName", obj.Prénom);
            urlencoded.append("lName", obj.Nom);
            urlencoded.append("tel", obj.Téléphone);
            urlencoded.append("email", obj.Adresse);
            urlencoded.append("password", obj.Mot);
            urlencoded.append("isAdmin", 0);
        }else{
            urlencoded.append("dep", obj.Departement);
            urlencoded.append("com", obj.Commune);
            urlencoded.append("loc", obj.Locality);
        }
    return urlencoded;
    }

    const requestOptions=(obj,param)=>{
    return {
        method: "POST",
        headers: myHeaders,
        body: Urlencoded(obj,param)
    }
    }

    const updateOptions=(obj,param)=>{
        return {
            method: "PUT",
            headers: myHeaders,
            body: Urlencoded(obj,param)
        }
        }

    const Poster=(obj,param)=>{
        if(id===null){
            fetch(url(obj,param),requestOptions(obj,param))
                .then(response => response.json())
                .then(data =>{/*render(false);*/DisplayTChange('alert',{code:data.code,message:data.message},'',{},{str:'',bool:false}); })
        }else{
            const ulr=url(obj,param).split("add")[0]+"update/"+id;
            fetch(ulr,updateOptions(obj,param))
                .then(response => response.json())
                .then(data =>{/*render(false);*/DisplayTChange('alert',{code:data.code,message:data.message},'',{},{str:'',bool:false}); })

        }
    }

    const Parms=(obj)=>{
        var param;
        if(obj.Nom!==""){
            param='Nom';
        }else if(obj.Locality!==""){
            param='Locality';
        }else{
            param='Donateur';
        }
        return param
    }

   const handleClick=(e)=>{
        e.preventDefault()
        // if(VALIDITE && (membre.Mot===membre.Confirmer)){
            Poster(nouveauMembre,Parms(nouveauMembre))
        //     setMembre({...membre,Pseudo:null,Mot:null,Confirmer:null})
        // }else{alert("✖ Impossible d'envoyer le formulaire; il y'a des DONNEES NON CONFORMES !Veuillez bien vérifier les données saisies.")}
    }
        
    return <Component handleChange={handleChange} handleClick={handleClick}/>
}

function AddDon({handleChange,handleClick}){
    const {obj}=useContext(DisplayAlertContext);
    return <form className="form-campagne">
            <div style={{width:"90%",position:"sticky",top:"60px",backgroundColor:"rgba(255,0,0,.09)",maxHeight:"100px",margin:"2% 5%",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <h5 style={{minHeight:"50%",letterSpacing:"2px",color:"grey"}}>Les champs avec astherisque (*) sont obligatoires ❗</h5>
            </div>
            <div className="form-campagne-parts">
                <div  className="form-campagne-p">
                    <InputString type="text" obj={obj} for="Prénom nom (du recepteur)" render={(obj)=>{handleChange(obj)}}/>
                    <InputString type="phone" obj={obj} for="Téléphone (du recepteur)" render={(obj)=>{handleChange(obj)}}/>
                    <InputString type="number" obj={obj} for="Nombre de kits" render={(obj)=>{handleChange(obj)}}/>
                </div>
                <div  className="form-campagne-p">
                    <InputString type="number" obj={obj} for="Impactes" render={(obj)=>{handleChange(obj)}}/>
                    <InputString type="text" obj={obj} list for="Localite" render={(obj)=>{handleChange(obj)}}/>
                    <InputString type="text" obj={obj} list for="Donateur (délégué de la team)" render={(obj)=>{handleChange(obj)}}/>
                </div>
            </div>
            <button  id='buttonValider' onClick={(e)=>handleClick(e)} >Valider</button>
        </form>
}
function AddUser({handleChange,handleClick}){
    const {obj}=useContext(DisplayAlertContext);
    return <form  className="form-campagne">
        <div style={{width:"90%",position:"sticky",top:"60px",backgroundColor:"rgba(255,0,0,.09)",maxHeight:"100px",margin:"2% 5%",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h5 style={{minHeight:"50%",letterSpacing:"2px",color:"grey"}}>Les champs avec astherisque (*) sont obligatoires ❗</h5>
        </div>
        <div className="form-campagne-parts">
            <div  className="form-campagne-p" >
                <InputString type="text" obj={obj} for="Prénom" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="text" obj={obj} for="Nom de famille" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="phone" obj={obj} for="Téléphone" render={(obj)=>{handleChange(obj)}}/>
            </div>
            <div  className="form-campagne-p" >
                <InputString type="mail" obj={obj} for="Adresse mail" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="password" obj={obj} for="Mot de passe" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="password" obj={obj} for="Confirmer Mot de passe" render={(obj)=>{handleChange(obj)}}/>
            </div>
        </div>
        <button  id='buttonValider' onClick={(e)=>handleClick(e)}>Valider</button>
    </form>

}
function AddLoc({handleChange,handleClick}){
    const {obj}=useContext(DisplayAlertContext);
    return <form  className="form-campagne">
         <div style={{width:"90%",position:"sticky",top:"60px",backgroundColor:"rgba(255,0,0,.09)",maxHeight:"100px",margin:"2% 5%",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h5 style={{minHeight:"50%",letterSpacing:"2px",color:"grey"}}>Les champs avec astherisque (*) sont obligatoires ❗</h5>
        </div>
        <div className="form-campagne-parts">
            <div  className="form-campagne-p">
                <InputString type="text" obj={obj} list for="Departement" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="text" obj={obj} list for="Commune" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="text" obj={obj} for="Locality" render={(obj)=>{handleChange(obj)}}/>
            </div>
            <div  className="form-campagne-p"></div>
        </div>
        <button  id='buttonValider' onClick={(e)=>handleClick(e)}>Valider</button>
    </form>
}