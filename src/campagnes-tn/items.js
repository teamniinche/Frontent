import React,{useLayoutEffect,useState,createContext,useContext} from 'react';
import { Dropdown,Carousel } from 'react-bootstrap';
import Modal from './new-item.js';
import {serverApiUrl} from '../root.js';
import '../css/items.css';
import {missionActions,parteners,partenaires,activities,contacts,rs,annees} from '../iterables.js'
import Partenaires,{PartenerCard} from '../components/partenaires.js';
import { AlertPoped } from './poputs.js';
import DataTable from 'datatables.net-dt';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import '../css/footer.css';
DataTable.use(DT);
// const iconsStyle={padding:'1rem',size:'0.8rem',margin:'0px',cursor:'pointer',};

export const DisplayAlertContext=createContext();

// let table = new DataTable('.table');
export default function Items(){
    const colors={"text":'transparent',"line":"grey"}//'#595b5e'
    const [entities,setEntities]=useState('Dons');
    const [bgColor,setBgColor]=useState(colors.text)

    const [str,updateStr]=useState({st:'sleep',data:{code:'green',message:''}}); // ALERT
    const [configModal,setConfigModal]=useState({str:'',bool:false})  // CREATE
    const [configs,setConfigs]=useState({id:null,obj:{}})  // UPDATE
    const id=configs.id;const obj=configs.obj;

    // ALERT     ||   UPDATE    ||      CREATE       3 missions
    function DisplayTChange(st,data,id,obj,configmodal){
        // DisplayTChange('alert',{code:data.code,message:data.message},null,{},{str:'',bool:false}); }
        if(id===null){updateStr({st:st,data:data}); // ALERT
        }else if(id===0){setConfigModal({str:configmodal.str,bool:configmodal.bool})} // CREATE
        else if(id===''){
            setConfigModal({str:configmodal.str,bool:configmodal.bool}); // CREATE
            updateStr({st:st,data:data});
            console.log(data.message)
        }else{
            setConfigs({id:id,obj:obj});
            setConfigModal({str:configmodal.str,bool:configmodal.bool});  } // UPDATE
    }

    // useEffect(()=>{
    //     if(id!==null){

    //         // const {act,entities,id,params}=action;
    //         // try{
    //         //     fetch("http://localhost:8080/tn-api-campagne/"+entities+"/"+act+"/"+id,params)
    //         //     .then(data=>{
    //         //         DisplayTChange('alert',{code:data.code,message:data.message},null)
    //         //     })
    //         // }catch{
    //         //     return
    //         // }
    //     };
    // },[id])

    const Entity=(paramet)=>{
        var entites;
        switch (paramet){
            case 'Users':
                entites=Users
                break
            case 'Localities':
                entites=Localities
                break
            default:
                entites=Dons
        }
        return entites;
    }
    
    return <DisplayAlertContext.Provider value={{str,DisplayTChange,id,obj,configModal}}>
    <div id="items-mere" style={{display:'flex',flexDirection:'column',}}>
        {/* <AlertPoped message="Utilisateur enregistré avec succés" color="green"/> */}
        {str.st==='alert'?<AlertPoped message={str.data.message} color={str.data.code}/>:<Alertoped/>}

    <div  id="parent-itemsCampagnes" style={{backgroundColor:"#212529",paddingTop:"80px",height:"fit-content",width:"100vw",display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'flex-start',}}> 
        <div className="itemsCampagnes" style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'flex-start',}}>
            <div id="entries-tables" style={{width:"100%",maxWidth:"100%",overflow:"scroll",color:"white",}}>
                <div className="entriesCampagnes" style={{backgroundColor:bgColor,width:'15%',padding:'2rem',borderRadius:"5px solid "+colors.Line,boxShadow:"2px 2px 5px "+colors.text,}}>
                    <Entities render={(str)=>setEntities(str)}/>
                </div>
                <div className="tablesCampagnes" style={{backgroundColor:bgColor,borderRadius:"5px solid "+colors.line,boxShadow:"2px 2px 5px "+colors.text,padding:"5px",width:"98%",border:"1px solid "+colors.line,margin:'0px 1rem',marginBottom:'1rem',}}>
                    <Table Component={Entity(entities)} render={(clor)=>setBgColor(clor)}/>
                </div>
            </div>
            <PartImgs/>
        </div>
        <div className="partenairesCampagnes" style={{backgroundColor:"#dae0e7",width:'15%',padding:'2rem',borderRadius:"5px solid "+colors.Line,boxShadow:"2px 2px 5px "+colors.text,}}>
        <h3>Nos Partenaires</h3>
        <Parteners/>
        </div>
    </div>
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

    </DisplayAlertContext.Provider>
    }

function Table({Component,render}){
    const {configModal}=useContext(DisplayAlertContext);
    const bool=configModal && configModal.bool;
    const str=configModal && configModal.str;
    
    return <>
        <Component render={(clor)=>render(clor)}/>
        <Modal bool={bool} entity={str}/>
    </>

}

export function PartImgs(){
    const ints=[1,2,3,4,5,6,7,8,9,10,11];
    const ptnrs=['Sonatel','C.E.F.E','Senum','Distingo','A.W.N','Jeader'];
    return <div id="part_imgs" style={{backgroundColor:"#dae0e7",width:"96%",margin:"0px",padding:"2%",}}>
            <h3 style={{textAlign:"center",color:"grey",}}>CAMPAGNE 2024 : LES PARTENAIRES</h3>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",flexWrap:"wrap",gap:"1rem",paddingBottom:'1rem',}}>
                    {Object.values(parteners).map(p=>{return ptnrs.includes(p.nom) && <PartenerCard imgLink={"logos_partenaires/"+p.logo} name={p.nom}/>})}
                </div>
            <hr/>
            <Karousel 
                ints={ints}
                titre="QUELQUES IMAGES DE LA CAMPAGNE 2024"
                sTitre="TN - Campagne TOUS A L'ECOLE 2024 - éco-kits"
                imgFolderRoot="img-campagnes/campagne-2022/img2022"
            />
        </div>

}

export function Karousel({ints,titre,sTitre,imgFolderRoot,id}){
    const fSize=Window.innerWidth>='700'?{fontSize:'1rem',}:{fontSize:'0.8rem',};
    return <>
    <h4 style={{textAlign:"center",color:"grey",}}>{titre}</h4>
    <div className="karouselDiv" id={""+(id && id)} style={{margin:"5px 0%",}}>
        <Carousel>
      {ints.map((Int,key)=>
        <Carousel.Item>
        <img
          className="d-block w-100"
          src={imgFolderRoot+Int+".jpg"}
          alt={"slide "+key}
          style={{width:'100%',border:"2px solid rgba(255,255,255,1)",borderRadius:"10px",}}
        />
        <Carousel.Caption>
          <h3>{null}</h3>
          <p style={{fontFamily:'serif',textShadow:'1px 1px 2px blue',...fSize}}>{sTitre}</p>
        </Carousel.Caption>
      </Carousel.Item>
      )}
    </Carousel>
    {/* {if(!bool){document.getElementsByClassName('carousel-control-next').style.display='none'}} */}
    </div>
    </>
}

function Localities({render}){
    const {DisplayTChange}=useContext(DisplayAlertContext)
    const [tableData,setTableData]=useState({})
    // const [bol,setBol]=useState(false);

    useLayoutEffect(()=>{ 
        fetch("https://api-tn-46ff13fab352.herokuapp.com/tn-api-campagne/localities",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})//, requestOptions)
        .then((response) => response.json())
        .then((result) => setTableData(result))
        .catch((error) => console.error(error))
    },[]
    )

    useLayoutEffect(() => {
        if (tableData.length > 0) {
            const table = new DataTable('#table_id', {
                responsive: true
            });
            return () => {
                table.destroy();
            };
        }
    }, [tableData]);

    function handleDelete(id){
        fetch(serverApiUrl+"localities/delete/"+id,{method: 'DELETE'})
        .then((response) => response.json())
        .then((result) => DisplayTChange('alert',{code:result.code,message:result.message},null))
    }

    function handleUpdate(id){
        fetch(serverApiUrl+"localities/"+id,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
        .then((response) => response.json())
        .then((result) => {
                    DisplayTChange(
                        'sleep',
                        {code:'green',message:''},
                        id,
                        {Departement:result.dep,Commune:result.com,Locality:result.loc},
                        {str:'Localities',bool:true}
                    )
            })

        .catch((error) => console.error(error))
    }

    return <>
        {/* <Modal bool={bol} entity={'Localities'}/> */}

    <table id="table_id" className="display" style={{}}>
    <thead>
        <tr>
            {/* <th>ID</th> */}
            <th>Departement</th>
            <th>Commune</th>
            <th>Localité</th>
            {/* <th>Actions</th> */}
        </tr>
    </thead>
    <tbody>
        {Array.from(tableData).map((loc,key)=>
            {return <tr key={key}>
                {/* <td>{loc.id}</td> */}
                <td>{loc.dep}</td>
                <td>{loc.com}</td>
                <td>{loc.loc}</td>
                {/* <td><i className="bi bi-trash3" onClick={()=>handleDelete(loc.id)} style={{...iconsStyle,color:'red',paddingRight:'0.2rem',marginRight:'0.6rem',}}></i><i className="bi bi-pencil-square" onClick={()=>handleUpdate(loc.id)} style={{...iconsStyle,color:'blue',}}> éditer</i></td> */}
            </tr>}
        )}
    </tbody>
</table> 
</>
}

function Users({render}){
    const {DisplayTChange}=useContext(DisplayAlertContext)
    const [tableData,setTableData]=useState({})
    // const [bol,setBol]=useState(false);
    
    useLayoutEffect(()=>{ 
        fetch(serverApiUrl+"users",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})//, requestOptions)
        .then((response) => response.json())
        .then((result) => setTableData(result))
        .catch((error) => console.error(error))
    },[]
    )

    useLayoutEffect(() => {
        if (tableData.length > 0) {
            const table = new DataTable('#table_id', {
                responsive: true
            });
            return () => {
                table.destroy();
            };
        }
    }, [tableData]);

    function handleDelete(id){
        fetch(serverApiUrl+"users/delete/"+id,{method: 'DELETE'})
        .then((response) => response.json())
        .then((result) => DisplayTChange('alert',{code:result.code,message:result.message},null))
    }

    function handleUpdate(id){
        fetch(serverApiUrl+"users/"+id,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
        .then((response) => response.json())
        .then((result) => {
                    DisplayTChange(
                        'sleep',
                        {code:'green',message:''},
                        id,
                        {Prénom:result.fName,Nom:result.lName,Téléphone:result.tel,Adresse:result.email},
                        {str:'Users',bool:true}
                    )
            })

        .catch((error) => console.error(error))
        // DisplayTChange('sleep',{code:'green',message:''},id)
        // setBol(true);
    }
   

    return <>
    {/* <Modal bool={bol} entity={'Users'}/> */}

    <table id="table_id" className="display" style={{}}>
    <thead>
        <tr>
            {/* <th>ID</th> */}
            <th>Prenom</th>
            <th>Nom</th>
            {/* <th>Telephone</th> */}
            <th>Email</th>
            {/* <th>Actions</th> */}
        </tr>
    </thead>
    <tbody>
        {Array.from(tableData).map((user,key)=>
            {return <tr key={key}>
                {/* <td>{user.id}</td> */}
                <td>{user.fName}</td>
                <td>{user.lName}</td>
                {/* <td>{user.tel}</td> */}
                <td>{user.email}</td>
                {/* <td><i className="bi bi-trash3" onClick={()=>handleDelete(user.id)} style={{...iconsStyle,color:'red',paddingRight:'0.2rem',marginRight:'0.6rem',}}></i><i className="bi bi-pencil-square" onClick={()=>handleUpdate(user.id)}  style={{...iconsStyle,color:'blue',}}> éditer</i></td> */}
            </tr>}
        )}
    </tbody>
</table> 
</>
}

function Dons({render}){

    const [tableData,setTableData]=useState({})
    const {DisplayTChange}=useContext(DisplayAlertContext)
    // const [bol,setBol]=useState(false);

    useLayoutEffect(()=>{ 
        fetch(serverApiUrl+"dons",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})//, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if(result.code && result.code==='red'){
                render(result.code)
            }else{
                setTableData(result)
            }
        })
        .catch((error) => console.log(error))
    },[]
    )
    
    useLayoutEffect(() => {
        if (tableData.length > 0) {
            const table = new DataTable('#table_id', {
                responsive: true
            });
            return () => {
                table.destroy();
            };
        }
    }, [tableData]);

    function handleDelete(id){
        fetch(serverApiUrl+"dons/delete/"+id,{method: 'DELETE'})
        .then((response) => response.json())
        .then((result) => DisplayTChange('alert',{code:result.code,message:result.message},null))
    }

    function handleUpdate(id){
        fetch(serverApiUrl+"dons/"+id,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
        .then((response) => response.json())
        .then((result) => {
                    DisplayTChange(
                        'sleep',
                        {code:'green',message:''},
                        id,
                        {
                            Prénom:result.respoName,
                            Téléphone:result.respoContact,
                            Nombre:result.nberOfKit,
                            Impactes:result.nberOfImpacted,
                            Donateur:result.userId,
                            Localite:result.localityId
                        },
                        {str:'Dons',bool:true}
                    )}
        )

        .catch((error) => console.error(error))
        // DisplayTChange('sleep',{code:'green',message:''},id)
        // setBol(true);
    }
    

    return <>
    {/* <Modal bool={bol} entity={'Dons'}/> */}

    <table id="table_id" className="display" style={{}}>
    <thead>
        <tr>
            {/* <th>ID</th> */}
            <th>Localité</th>
            <th>Recepteur</th>
            <th>Téléphone</th>
            <th>Nbre Kits</th>
            <th>Impactés</th>
            <th>Donateur</th>
            {/* <th>Actions</th> */}
        </tr>
    </thead>
    <tbody>
        {Array.from(tableData).map((don,key)=>
            {return <tr key={key}>
                {/* <td>{don.id}</td> */}
                <td>{don.Locality.loc+' ( '+don.Locality.dep+' )'}</td>
                <td>{don.respoName}</td>
                <td>{don.respoContact}</td>
                <td>{don.nberOfKit}</td>
                <td>{don.nberOfImpacted}</td>
                <td>{don.User.fName+' '+don.User.lName}</td>
                {/* <td ><i className="bi bi-trash3" onClick={()=>handleDelete(don.id)} style={{...iconsStyle,color:'red',paddingRight:'0.2rem',marginRight:'0.6rem',}}></i><i className="bi bi-pencil-square" onClick={()=>handleUpdate(don.id)} style={{...iconsStyle,color:'blue',paddingLeft:'0.2rem',}}></i></td> */}
            </tr>}
        )}
    </tbody>
</table> 
</>
}

const SVG=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
</svg>

function Entities({render}){
    const {DisplayTChange}=useContext(DisplayAlertContext);

    function andleClick(str){
        DisplayTChange(
            'sleep',
            {code:'green',message:''},
            0,
            {},
            {str:str,bool:true}
        )
    }
    
    return <div id="ul-rub">
            <span className='div-span'>
                <li style={{cursor:'pointer',}} onClick={()=>render('Dons')}>Dons</li>
                <span style={{cursor:'pointer',display:'inline-block',marginLeft:'1rem',}}>
                <SelectYears annees={annees}/>
                </span>
                <span className="span-svg"  /*onClick={()=>handleClick('Dons')}*/ style={{cursor:'pointer',display:'inline-block',marginLeft:'0.8rem',padding:'0.5rem',}}>
                    {SVG}
                </span>
            </span>
            <span className='div-span'>
                <li style={{cursor:'pointer',}} onClick={()=>render('Localities')}>Localités</li>
                <span  className="span-svg" /*onClick={()=>handleClick('Localities')}*/ style={{cursor:'pointer',display:'inline-block',marginLeft:'2rem',padding:'0.5rem',}}>
                    {SVG}
                </span>
            </span>
            <span className='div-span'>
                <li style={{cursor:'pointer',}} onClick={()=>render('Users')}>Utilisateurs</li>
                <span className="span-svg" /*onClick={()=>handleClick('Users')}*/  style={{cursor:'pointer',display:'inline-block',marginLeft:'2rem',padding:'0.5rem',}}>
                    {SVG}
                </span>
            </span>
            
            {/* <Modal bool={entity.bool} entity={entity.str}/> */}
        </div>

}

function SelectYears({annees}){
    return <Dropdown>
    <Dropdown.Toggle variant="info" id="dropdown-basic">
      2024
    </Dropdown.Toggle>
    <Dropdown.Menu>
        {annees.map(annee=><Dropdown.Item href={"#/action-"+annee}>{annee}</Dropdown.Item>)}
    </Dropdown.Menu>
  </Dropdown>
}

export function Parteners(){
    
    return <ul style={{backgroundColor:'rgba(255,255,255,0.4)',padding:'2rem',listStyle:'none',textDecoration:'none',lineHeight:'1.5rem',}}>
        {Object.values(parteners).map((ptner,key)=>{
                   return <li key={key} style={{height:"2rem",borderBottom:"1px solid rgba(0,0,100,0.3)",}}>
                           <img src={"logos_partenaires/"+ptner.logo} width="40px" height="30px" alt={ptner.nom}/>
                           <a href={'https://www.'+ptner.contacts} style={{textDecoration:'none',}}>{ptner.nom}</a>
                    </li>})}
    </ul>

}


export function Partnaires(){
    return <div style={{backgroundColor:'rgba(255,255,255,0.4)',padding:'2rem',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:'5rem',}}>
        {partenaires.map((ptner,key)=><Partenaires obj={{src:ptner[1],alt:"",name:ptner[0],url:ptner[2],an:ptner[3]}}/>)}
    </div>
}

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
                <li key={key}>
                    <a href={el[2]} style={{display:'flex',textDecoration:'none',flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:'0.5rem',}}>
                        <img src={el[1]} alt={el[0]} width="30px" height="30px"/>
                        {el[0]}
                    </a>
                </li>)
            :jsArray.map((el,key)=><li key={key} style={{marginBottom:'0.5rem',}}><span>{key+1}</span>{el}</li>)
            }
            
        </ul>
    </div>
}

function Alertoped(){return <div></div>}