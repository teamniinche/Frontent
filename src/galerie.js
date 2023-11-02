import React, {useLayoutEffect,useState} from 'react';
// import {useEffect} from 'react'
import {Link,Outlet,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';  //Le HOOK GETTER POUR LE CAS DE @REDUX/TOOLKIT
import {nameValidator} from './regExpressions.js'
import ReactModal from 'react-modal';
import {Poster} from './requetesFetch.js';
import {setIges,setAlbms,setAlbum} from './stoore.js'
import {ajouter,supprimer} from './icons.js';
import './galerie.css';
import {compressImage,convertToBase64,dataURLtoFile} from './traitementImages.js';
import {serverUrl} from './root.js'

const hostUrl=serverUrl
const cloudinaryBaseUrl = 'https://res.cloudinary.com/dapkl1ien/image/upload/signed_upload_demo_form/galerie';

export function NouvelAlbum(props) {
    // const [albums,setAlbums]=useState([{name:'Aucun album'}])
    const [lastImage,setLastImage]=useState({numeroEnvoi:0,ordreEnvoi:0,imgName:null,album:null})
    // Pour afficher et/ou fermer la fenetre modale et identifiant de l'image selectionnée(=imgKey)
    const [modalDisplaye,setModalDisplaye]=useState({showModal:true,albumName:null,last:false})
    const images=useSelector((state)=>{ return state.userNewCh.images})
    const albums=useSelector((state)=>{ return state.userNewCh.albums})
    useLayoutEffect(() => {
      // const selectElement=document.querySelector('select')
      // const selected=selectElement.value.split('🖼 ')[1]
      let picture=images.length===0?{numeroEnvoi:0,ordreEnvoi:0,album:''}:images[images.length-1];
      setLastImage(picture)
      // if(!selected.includes("Album.s")){
      //   const inputElement=document.querySelector("#listAlbums")
      //   inputElement.value=selected
      // }
        //if(document.querySelector('#overlay-div')){
            //const overlay=document.querySelector('#overlay-div')
            //overlay.style.display="inline-block"
        //}
        // fetch(hostUrl+'api/images/albums/getAll')//'api/images/albums/getAll')
        //   .then(response => response.json())
        //   .then(albums => setAlbums(albums))
        //   .catch(error => alert(error.message)); // Stocke uniquement le message de l'erreur
          // fetch(hostUrl+'api/images/getAll')
          // .then(response => response.json())
          // .then(images => {
          // let picture=images.length===0?{numeroEnvoi:0,ordreEnvoi:0,album:''}:images[images.length-1];
          // setLastImage(picture)
          //       })
          // .catch(error => alert(error.message));
        // setModalDisplaye({showModal:true,albumName:'Aucun album',last:false})
         },[images]);
        
        const handleCloudinaryModalClick=async () => {
          const nomAlbum=modalDisplaye.albumName
          if(nameValidator.test(nomAlbum) && nomAlbum!==null){
            let input=document.querySelector('#filesInput')
            const formData = new FormData();
            const files=input.files
            let j=modalDisplaye.last===true?lastImage.numeroEnvoi:lastImage.numeroEnvoi+1;
            let k=modalDisplaye.last===true?lastImage.ordreEnvoi+1:0
            let nouvel_album=modalDisplaye.last
            // Append parameters to the form data. The parameters that are signed using 
            // the signing function (signuploadform) need to match these.
                for (let i = 0; i < files.length && i<10; i++) {
                    let fileName='galerie_'+j+'_'+k
                    const signResponse = await fetch(hostUrl+'api/mycloudinary/signuploadAlbum/'+fileName);
                    const signData = await signResponse.json();
                    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
                    let file = files[i];
                    const base64Image = await convertToBase64(file);
                    const compressedImage = await compressImage(base64Image,1,300);
                    const compressedFile= await dataURLtoFile(compressedImage,file.name)
                    formData.append("file", compressedFile);
                    formData.append("api_key", signData.apikey);
                    formData.append("timestamp", signData.timestamp);
                    formData.append("signature", signData.signature);
                    formData.append("eager", "c_pad,h_200,w_200|c_crop,h_200,w_200");
                    formData.append("public_id", fileName);
                    formData.append("folder", "signed_upload_demo_form/galerie");
                    fetch(url, {
                        method: "POST",
                        body: formData
                    })
                    .then((response) => {
                        return response.text();
                    })
                const Url=hostUrl+'api/images/post/'+fileName+'.jpg'
                Poster(Url,{numeroEnvoi:j,ordreEnvoi:k,imgName:fileName+'.jpg',album:nomAlbum});
                if (nouvel_album!==true){
                    const Url=hostUrl+'api/images/add/album'
                    Poster(Url,{name:nomAlbum}); 
                }
                k=k+1
        }}else{alert("VEUILLEZ RENSEIGNER LE NOM VALIDE DE L'ALBUM")}}
        const inputAlbum=(e)=>{const valeur=e.target.value
                                if(valeur!==''){ setModalDisplaye({...modalDisplaye,albumName:valeur})}
                              }
  return (
    <div style={{display:"flex",flexDirection:"column",paddingTop:"1.5em",width:"100%",margin:"0px",height:"fit-content"}} >
        <div style={{display:"flex",flexDirection:"row",width:"100%",padding:"0.5em 0px",justifyContent:"center",alignItems:"center",margin:".5em 0px"}}>
            <h6 style={{margin:"0px"}}>Nom album</h6>
            <input type="text" list="albums" id="listAlbums" value={modalDisplaye.albumName} placeholder="Nom de l'album ici ..." style={{width:"60%",height:"2em",padding:"0.4em 1em",marginLeft:".5em"}} onChange={(e)=>inputAlbum(e)}/>
            <datalist id="albums">
                {
                  Array.from(albums).map((album,index)=><option key={index} value={album.name}></option>)
                }
            </datalist>
        </div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",lineHeight:"2em",padding:"1em",backgroundColor:"rgba(0,0,0,0.1)"}}>
            <input type="file" multiple style={{width:"70%",height:"2em",backgroundColor:"rgb(253,253,253)"}} id="filesInput" />
            <button onClick={(e) =>handleCloudinaryModalClick(e)} style={{borderRadius:"10px",width:"30%",backgroundColor:"rgb(0,0,200)",fontWeight:"bold",color:"white",padding:"1em",border:"1px dotted rgb(0,0,200)"}}>Uploader les images</button>
        </div>
    <ReactModal
              isOpen={modalDisplaye.showModal}
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
                      top: '15vh',
                      right: '8vw',
                      bottom: '40vh',
                      border: '1px solid #ccc',
                      background: 'white',
                      width:'80vw',
                      maxWidth:'300px',
                      height:'fit-content',
                      maxHeight:'500px',
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '4px',
                      outline: 'none',
                      padding: '2vw',
                      paddingTop:"0px",
                    zIndex:30000,
                    }}}
              >
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",padding:"2%",margin:"0px",lineHeight:"2em"}} >
                <h3 style={{width:"100%",textAlign:"center",margin:"0.5em 0px",marginBottom:"0.5px",padding:"0px",paddingLeft:"5px",textDecoration:"none"}} > Dans quel album ❓</h3>
                {albums.map((album)=><li key={album.index} onClick={()=>setModalDisplaye({showModal:false,albumName:album.name,last:true})} style={{mouse:"pointer"}}>{'⭐ ' + album.name}</li>)}
                <button onClick={()=>setModalDisplaye({showModal:false,albumName:null,last:false})} style={{mouse:"pointer",borderRadius:"10px",textDecoration:"none",width:"fit-content",backgroundColor:"rgb(0,0,150)",fontWeight:"bold",color:"white",padding:".5em 2em",border:"1px dotted rgb(0,0,200)",margin:"2em 25%"}}>Nouvel album</button>
            </ul>
                    </ReactModal>

    </div>
  )
}

export default function Galerie() {
    const [images,setImages]=useState([])
    const [albums,setAlbums]=useState([])
    const dispatch=useDispatch()

    useLayoutEffect(() => {
        fetch(hostUrl+'api/images/albums/getAll')
          .then(response => response.json())
          .then(albums => {dispatch(setAlbms(albums));setAlbums(albums)})
        fetch(hostUrl+'api/images/getAll')
          .then(response => response.json())
          .then(images => {dispatch(setIges(images));setImages(images)})
          .catch(error => alert(error.message));
        },[dispatch]);
        // const deleteImg=async (apiKey,apiSecret,filename) =>{
        //     const url = hostUrl+'api/mycloudinary/delete/'+filename;
    
        //     fetch(url, {
        //             method: "POST",
        //             headers: {
        //                 "Authorization": `Basic ${btoa(`${apiKey}:${apiSecret}`)}`
        //             }
        //         })
        //     .then(response => {
        //         if (response.status === 200) {
        //         console.log(`L'image ${filename} a été supprimée avec succès.`);
        //         } else {
        //         console.error(`Échec de la suppression de l'image ${filename}.`);
        //         }
        //     })
        //     .catch(error => {
        //         console.error("Une erreur s'est produite lors de la demande de suppression.", error);
        //     });
        // }

    //   const handleInputChange=async (e)=>{
    //       const input =e.target;
    //       if (input.files && input.files[0]) {
    //           let file=input.files[0]
    //           const base64Image = await convertToBase64(file);
    //           const compressedImage = await compressImage(base64Image,1,300);
    //           const compressedFile= await dataURLtoFile(compressedImage,file.name)
    //           setCompressedFile(compressedFile)
            //   const reader = new FileReader();
            //     reader.onload = function (e) {
            //       const image = document.getElementById('inputChangeImg');
            //       image.src = compressedImage //compressedImage ;
            //     };
            //   reader.readAsDataURL(input.files[0]);
        //   }
    //   }
    const Navigate=useNavigate()
    const selectionChange=(e)=>{
      const selected=e.target.value.split('🖼 ')[1]
      if(selected.includes("Album.s")){
          Navigate("/quisommesnous/galerie/")
      }else{ 
          const Images=Array.from(images).filter(image=>image.album===selected)
          dispatch(setAlbum(Images))
          Navigate("/quisommesnous/galerie/displayPhotos")
      }
    }
  return <>
       <div style={{margin:"0px",padding:"1.5em 0px",marginTop:"110px",width:"100vw",height:"fit-content",display:"flex",flexDirection:"row",justifyContent:"space-around",borderBottom:"3px solid rgb(240,240,240)"}}>
       <select onChange={(e)=>selectionChange(e)} style={{maxWidth:"44vw",overflow:"hidden",border:"none",fontWeight:"bold",color:"rgb(30,30,30)",backgroundColor:"white",width:"fit-content",marginTop:"10px",textDecoration:"none",borderBottom:"3px solid rgb(0,0,150",cursor:"pointer"}}>
            <option>{'🖼 '+ albums.length + ' Album.s ( ' + images.length + ' photo.s)' }</option>
                {albums.map((album,index)=><option key={index} style={{cursor:"pointer"}}>{'🖼 '+ album.name}</option>)}
          </select>
            <Link to="/quisommesnous/galerie/addPictures" style={{borderRadius:"10px",textDecoration:"none",width:"fit-content",backgroundColor:"rgb(0,0,150)",fontWeight:"bold",color:"white",padding:".5em",border:"1px dotted rgb(0,0,200)",cursor:"pointer"}}>Ajouter photos</Link>
        </div>
    <Outlet/>
    </>
}

 function Album(props) {
   const photos=props.photos //photos.length===0?{name:'avatar.webp'}:photos;
   const dispatch=useDispatch()
   const Navigate=useNavigate()
   const alb0=photos.filter((photo,index)=>index<2)
   const alb1=photos.filter((photo,index)=>index<3 && index>1)
   const alb2=photos.filter((photo,index)=>index<5 && index>2)
   const alb3=photos.filter((photo,index)=>index<7 && index>4)
   const imgClicked=(album)=>{
    dispatch(setAlbum(photos))
    Navigate("/quisommesnous/galerie/displayPhotos")
    const selectElement=document.querySelector('select')
    selectElement.value='🖼 '+ album
   }
  return (
    <>
    <div style={{position:"relative",border:"1px double rgb(0,100,0)",width:"300px",height:"300px",margin:"5vw",padding:"0px"}}>
              {alb0.map(photo=><img src={cloudinaryBaseUrl+'/'+ photo.imgName} style={{position:'absolute',zIndex:"1",top:"0px",left:"0px"}} alt="imageSlider" className="imageSlider"/>)}
              {alb1.map(photo=><img src={cloudinaryBaseUrl+'/'+ photo.imgName} style={{position:'absolute',zIndex:"2",top:"4px",left:"4px"}} alt="imageSlider" className="imageSlider"/>)}
              {alb2.map(photo=><img src={cloudinaryBaseUrl+'/'+ photo.imgName} style={{position:'absolute',zIndex:"3",top:"8px",left:"8px"}} alt="imageSlider" className="imageSlider"/>)}
              {alb3.map(photo=><img src={cloudinaryBaseUrl+'/'+ photo.imgName} onClick={()=>imgClicked(photo.album)} style={{position:'absolute',zIndex:"4",top:"12px",left:"12px"}} alt="imageSlider" className="imageSlider"/>)}
    </div>
    <h4 style={{textAlign:"center",color:"grey",padding:"0.5rem",margin:"0.5em 0px",minWidth:"50vw",width:"80vw",border:"none",borderTop:"2px dotted grey",borderBottom:"2px dotted grey"}}>{props.album.name + ' (' + photos.length + ' photos)'}</h4>
    </>
  )
}
export function PhotosGrid() {
    const images=useSelector((state)=>{ return state.userNewCh.images})
    const albums=useSelector((state)=>{ return state.userNewCh.albums})
  return (
    <div style={{paddingTop:"20px",display:"flex",flexFlow:"row wrap",alignItems:"start",justifyContent:"space-around"}}>
    {
      Array.from(albums).map(album=>{
        const pictures=Array.from(images).filter(lmage=>lmage.album===album.name)
        return <Album album={album} photos={pictures}/>})
    }
    </div>
  )
}

export function ImagesGrid() {
  // const [statusUserConnected,setStatusUserConnected]=useState(null)
  const loggedInUser=useSelector((state)=>{return state.userNewCh.loggedInUser})
  const images=useSelector((state)=>{return state.userNewCh.album})

  // useEffect(()=>{if(loggedInUser!==null){console.log(loggedInUser);setStatusUserConnected(true)
  //                 }else{
  //                   setStatusUserConnected(false)
  //                 }
  //   },[loggedInUser])
  const handleAdd=(image)=>{
    if(loggedInUser!==null){
        
    }
}
// const handleRetirer=(image)=>alert(image.numeroEnvoi) 
const handleDelete=(image)=>alert(image.numeroEnvoi)
// const divIconsDisplay=statusUserConnected===true?"flex":"none"
  return <>
    <h3 style={{width:"100%",margin:"0.8em 0px",color:"grey",padding:"0px",textAlign:"center",}}>{images[0].album + ' ('+images.length+ ')'}</h3>
    <div style={{paddingTop:"0px",display:"flex",flexFlow:"row wrap",alignItems:"start",justifyContent:"space-around"}}>

      {
        images.map((image)=>{
                const publicName=image.imgName.split('.')[0]
                return <div key={publicName} style={{position:"relative",width:"44vw",height:"50vw",padding:"0.5vw",paddingTop:"0px",margin:"0.4vw",borderRadius:"4px",border:"1px solid rgba(0,0,0,0.4)"}}>
                    <img src={cloudinaryBaseUrl+'/'+ image.imgName} alt='Delagalerie' style={{position:"absolute",zIndex:"0",bottom:"0.5vw",width:"44vw",height:"45.5vw",margin:"0px",padding:"0px"}}/>
                    <div className="publicName_icons" style={{position:"absolute",display:"flex",flexFlow:"row wrap",justifyContent:"space-between",
                        alignItems:"center",float:"right",width:"44vw",paddingBottom:"0.25vw",height:"5.75vw"}}>
                        {/* <button style={{display:"none",backgroundColor:"rgba(0,0,0,0)",border:"none",color:"red",padding:"0px",width:"40px",margin:"0px 1em"}} id={publicName+'Ret'} onClick={()=>handleRetirer(image)}>{ajouter}</button> */}
                        <button style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"blue",padding:"0px",width:"40px",margin:"0px 1em"}} id={publicName+'Add'} onClick={()=>handleAdd(image)}>{ajouter}</button>
                        <button style={{backgroundColor:"rgba(0,0,0,0)",border:"none",color:"red",padding:"0px",width:"40px",margin:"0px 1em"}} id={publicName+'Sup'} onClick={()=>handleDelete(image)}>{supprimer}</button>
                    </div>
                </div>
          })
    }</div>
    </>
  }


