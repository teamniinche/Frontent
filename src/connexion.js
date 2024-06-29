import React,{useState,useLayoutEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import ReactModal from 'react-modal';
import {useDispatch} from 'react-redux' //le HOOK SETTER dans le cas de @redux/toolkit
import {loggedAccess} from './stoore.js'   //Pour le HOOK SETTER dans le cas de @redux/toolkit
import {InputString} from './forms.js';
import {NousContacter} from './nousContacter.js';
// import Modal from './modal.js';
import './connexion.css';
import { identifiant,securite } from './icons.js';
import { nameValidator,passwordValidator } from './regExpressions.js';
import { useLocalStorage } from './useLocalStorage.js';
import {ConfirmEmail } from './forms.js';
import {loader} from './toast.js'


const Connexion = () =>  {
    const [dataUser,setDataUser]=useState({Identifiant:"",Mot:""})
    const Navigate=useNavigate()
    const dispatch=useDispatch()  //le HOOK SETTER dans le cas de @redux/toolkit
    const {setIttem}=useLocalStorage('pseudo_images')
    const [pseudo_Email,setPseudo_Email]=useState({pseudo:null,email:null,show:false})
    // const [show,setShow]=useState(false)
    useLayoutEffect(()=>{ 
                    if(document.getElementsByClassName('top-bar')){document.getElementsByClassName('top-bar')[0].style.display="block";}
                    // document.getElementsByClassName('header')[0].style.display="block";
                    if(document.getElementsByClassName('top-bar')){document.getElementsByClassName('top-bar')[0].style.display="block";}
                    document.getElementById("loader").style.display="none"
                    dispatch(loggedAccess(null))
                  }
            )
    function handleChange(obj){
        document.getElementById('buttonConnectClick').style.display="none";
        let name=(obj.nom).split(" ")[0]
        let validator=name==='Mot'?passwordValidator:nameValidator;
        let item;
        if(name==='Mot'){
          item="Pw";
        }else{
          item="Pseudo";
        }
        let invalidItem="invalid"+item;
        let validItem="valid"+item;
        if(obj.val!==''){
        if(!validator.test(obj.val)){
          document.getElementById(invalidItem).style.display="block";
          document.getElementById(validItem).style.display="none";
          setDataUser({...dataUser,[name]:''})
        }else{
        document.getElementById(invalidItem).style.display="none";
        document.getElementById(validItem).style.display="block";
        setDataUser({...dataUser,[name]:obj.val})
        }}else{
          document.getElementById(invalidItem).style.display="none";
          document.getElementById(validItem).style.display="none";
          setDataUser({...dataUser,[name]:''})
      }}

    function handleClick(user){
      let alerte=document.getElementById('buttonConnectClick')
      let button=document.getElementById('connecterButton')
      let loader=document.getElementById('loader')
      loader.style.display="inline"
      button.innerText="Connexion ..."
      let pseudo=user.Identifiant;
      let pW=user.Mot;
      if(pseudo===''||pW===''){
        alerte.innerText='NI Identifiant ni Mot de passe ne doit etre NULL !)'
        alerte.style.display="block";
        button.innerText="Se connecter";
        loader.style.display="none";
      }else{
        // fetch('https://tnserver.onrender.com/api/membres/'+pseudo)
        // // fetch('https://tnserver.onrender.com/api/membres/login')

        //   .then(response => response.json())
        //   .then(membre => {
        //   if(membre.passWord===pW){
        //     // dispatch(loginSuccess(membre));
        //     dispatch(loggedAccess(membre))  //le HOOK SETTER dans le cas de @redux/toolkit
        //     Navigate("/compte")
        //   }else{
        //     alerte.innerText='Identifiant et/ou Mot de passe INVALIDE.S !'
        //     alerte.style.display="block";
        //   }
        // })
        // .catch(error => alert("Identifiant invalide !" + error.message)); // Stocke uniquement le message de l'erreur
        fetch('https://tnserver.onrender.com/api/membres/login',
          {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pseudo:pseudo,passWord:pW})
          })
          .then(response => {
            if (response.ok) {return response.json();} 
            else {throw new Error('Erreur lors de la tentative de CONNEXION.');}
          })
          .then(data => {if (data && data.pseudo){
                              dispatch(loggedAccess(data))  //le HOOK SETTER dans le cas de @redux/toolkit
                              setIttem({pseudo:data.pseudo,images:data.addedImages,profil:data.profil})
                          if(data.EValidation.confirmation){
                              // dispatch(loggedAccess(data))  //le HOOK SETTER dans le cas de @redux/toolkit
                              // setIttem({pseudo:data.pseudo,images:data.addedImages,profil:data.profil})
                              Navigate("/compte")
                          //alert('Bienvenue '+ data.firstName + ' 👌🏻!') // Vous étes bien inscrit. Veuillez bien patienter pour la validatiion de votre inscription 🙏🏻🙏🏻🙏🏻')
                          }else{
                              setPseudo_Email({pseudo:data.pseudo,email:data.email,show:true})
                              button.innerText="Se connecter";
                              loader.style.display="none";
                          }
                        }else{
                          alerte.innerText = data.erreur
                          alerte.style.display="block";
                          button.innerText="Se connecter";
                          loader.style.display="none";
                        }
                      })
      }

      // button.innerText="Se connecter"
    }
    const imgLg=require('./images/logo_niintche.webp')
  return <>
    <div className="divtech">
      <div style={{backgroundImage:"url('/filigrane.jpg')",height:"95vh",width:"100vw",marginBottom:"-50px",marginTop:"-10px"}}>
        <div className="titreConnexion">Connexion à votre compte <img src={imgLg} alt="Logo de la teamniintche" className="imgLg"/></div>
        <div className="connexionContainer">

        {/* <Modal show={show} modalTitle='Test' render={bool=>setShow(bool)}><h1>Le modal</h1></Modal>
        <button onClick={()=>setShow(true)}>ShowModal</button> */}


            <InputString type="text" icon={identifiant} for="Identifiant" render={(obj)=>{handleChange(obj)}}/>
            <span style={{display:"block",marginLeft:"50px"}}>
            <i class="fas fa-xmark" id="invalidPseudo" style={{color:"rgba(200,0,0,.6)",display:"none"}}> Entree null!</i>
            <i class="fas fa-check" id="validPseudo" style={{color:"rgba(0,100,0,.8)",display:"none"}}></i>
            </span>
            <InputString type="password" icon={securite} for="Mot de passe" render={(obj)=>{handleChange(obj)}}/>
            <span style={{display:"block",marginLeft:"50px"}}>
              <i class="fas fa-xmark" id="invalidPw" style={{color:"rgba(200,0,0,.6)",display:"none"}}> Entree null!</i>
              <i class="fas fa-check" id="validPw" style={{color:"rgba(0,100,0,.8)",display:"none"}}></i>
            </span>
            {/* <Link to="/compte"><button className='succesButton' style={{width:"50%",padding:".5em"}} onClick={()=>{handleClick(dataUser)}}>Se connecter</button></Link> */}
            <div style={{margin:"0px",padding:"0px",display:"flex",justifyContent:"flex-start",width:"100%",alignItems:"center"}}>
                {/* #le bouton */}
                <button className='succesButton' id="connecterButton" style={{width:"50%",padding:".5em"}} onClick={()=>{handleClick(dataUser)}}>Se connecter</button>
                {/* #le loader */}
                <span id="loader" style={{margin:"0px",padding:"0px"}}>{loader}</span> {/* #le loader */}
            </div>

            <ReactModal
            isOpen={pseudo_Email.show}
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
            <ConfirmEmail render={()=>setPseudo_Email({...pseudo_Email,show:false})} item={pseudo_Email}/>
                </ReactModal>

            <span id="buttonConnectClick">Identifiant et Mot de passe requis !</span>
            <h5 className="sousTitre" >Vous vous n'êtes encore inscrit ?
                <Link to="/connexion/inscription"><span>S'inscrire</span></Link>
            </h5>
        </div>
      </div>
    </div>
    <NousContacter/>
  </>
}

// export default connect()(Connexion);
export default Connexion
