import React,{useEffect, useLayoutEffect, useState} from 'react';
import '../css/forms.css';
import {serverApiUrl} from '../root.js';
import * as dataListes from '../dataListes.js';
// const hostUrl='http://localhost:8080/tn-api-campagne/';
// import { loader } from './toast.js';
// import {serverUrl} from './root.js';

let styleInputLabel ={fontSize:"1em",letterSpacing:"2px",width:"fit-content",display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:"center"}
let star=<span style={{color:"red",fontWeight:"bold",fontSize:"1em"}}> *</span>

export  function InputString(props){ 
    const [state,setState]=useState({val:"",nom:"",label:"",bool:false})
    const [dep,setDep]=useState(dataListes.Dakar)
    let name=props.for;
    let icon=props.icon?props.icon:"";
    const idd=props.for.split(" ")[0];
    const defautl=props.obj?(props.obj[idd]?props.obj[idd]:null):null;
    console.log(defautl)

    // console.log(defautl)
    function handleChange(event){
        let label=event.target.value===""?"":<>{name} {star}</>
        if(idd==="Adresse"){//RESET quand en modification
            setState({...state,val:event.target.value,nom:event.target.name,label:label,bool:false})
            props.render({...state,val:event.target.value,nom:event.target.name,bool:false})
        }else{
            setState({...state,val:event.target.value,nom:event.target.name,label:label})
            props.render({...state,val:event.target.value,nom:event.target.name})
        }
    }

    function Lists(str){
        var dataList;
        switch (str){
            case 'Donateur':
                dataList='Donateurs';
                break
            case 'Localite':
                dataList='Localites';
                break
            case 'Commune':
                dataList='Communes';
                break
            default:
                dataList='departements';
        }
        return dataList;
    }
    
    useLayoutEffect(()=>{
        let inputList=document.getElementById(idd)
        if (props.list){
            inputList.setAttribute('list',Lists(idd));
        
        }
        defautl!==null && props.render({...state,val:defautl,nom:idd,label:props.for})

        },[idd]);
        
    function handleFocus(){
        // console.log(state)
        let label=<>{name} {star}</>
        setState({...state,label:label})
        if(idd==='Adresse'){
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

        if(idd==="Adresse" || idd==="Departement"){
            if(idd==="Adresse"){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            const urlencoded = new URLSearchParams();
            urlencoded.append("email", val);
            
            const requestOptions = {
                method: "post",
                headers: myHeaders,
                body: urlencoded
            };
            
            fetch(serverApiUrl+'users/doesExist', requestOptions)
                .then(response => response.json())
                .then(data=> {
                    setState({...state,bool:data.doesExist})
                    props.render({...state,bool:data.doesExist})
                })
            }else{
                setDep(dataListes[val]);
            }
        }}

  return (
    <div className="div-input">
        <label htmlFor={props.for} className="labelInputString" id={props.id} style={styleInputLabel}> {state.label} </label>
        <div className="divEnglobantInputEtIcon"><span className="spanForIcon">{icon}</span><input type={props.type} id={props.for.split(" ")[0]} name={props.for} className="form_input" onBlur={(event)=>handleBlur(event)} defaultValue={defautl} onFocus={(event)=>handleFocus(event)} onChange={(event)=>handleChange(event)} placeholder={name+' *'} required /></div>
        <dataListes.DataListDepartements/>
        <dataListes.DataListDonateurs/>
        <dataListes.DataListLocalites/>
        <dataListes.ComByDep dep={dep}/>

        <p id={props.for.split(" ")[0]+'messageValidation'}  style={{height:"3em",width:"fitContent",fontWeight:'bold',fontSize:'1em',margin:'0px 12%',marginBottom:'20px',padding:'0px'}}></p>
    </div>
    )}