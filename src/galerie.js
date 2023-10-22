import React, {useEffect,useLayoutEffect,useState} from 'react';
import {Link,Outlet} from 'react-router-dom';
import ReactModal from 'react-modal';
import {Poster} from './requetesFetch.js';
import {ajouter,supprimer} from './icons.js';
import {compressImage,convertToBase64,dataURLtoFile} from './traitementImages.js';
const hostUrl='https://tnserver.onrender.com/'
const cloudinaryBaseUrl = 'https://res.cloudinary.com/dapkl1ien/image/upload/signed_upload_demo_form/galerie';

export function NouvelAlbum(props) {
    const [albums,setAlbums]=useState([{name:'Aucun album'}])
    const [lastImage,setLastImage]=useState({numeroEnvoi:0,ordreEnvoi:0,imgName:null,album:null})
    // Pour afficher et/ou fermer la fenetre modale et identifiant de l'image selectionnée(=imgKey)
    const [modalDisplaye,setModalDisplaye]=useState({showModal:false,albumName:null,last:false})
    const [error,setError]=useState(null)
    //const Albums=albums.length===0?{name:"Aucun album"}:albums
    //const Albums=[{name:'Aucun album'}]

    useLayoutEffect(() => {
        //if(document.querySelector('#overlay-div')){
            //const overlay=document.querySelector('#overlay-div')
            //overlay.style.display="inline-block"
        //}
        fetch(hostUrl+'api/images/albums/getAll')
          .then(response => response.json())
          .then(albums => {
                  setAlbums(albums)
                })
          .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
          fetch(hostUrl+'api/images/getAll')
          .then(response => response.json())
          .then(images => {
                    let picture=images.length===0?{numeroEnvoi:0,ordreEnvoi:0,album:''}:images[images.length-1];
                    setLastImage(picture)
                })
          .catch(error => setError(error.message));
        setModalDisplaye({showModal:true,albumName:'Aucun album',last:false})
        },[]);
        const handleCloudinaryModalClick=async () => {
            let input=document.querySelector('#filesInput')
            // const file =compressedFile 
            const formData = new FormData();
            const files=input.files
            const nomAlbum=modalDisplaye.albumName
            let j=modalDisplaye.last===true?lastImage.numeroEnvoi:lastImage.numeroEnvoi+1;
            let k=modalDisplaye.last===true?lastImage.ordreEnvoi+1:0
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
                    // deleteImg(signData.apikey,signData.apiSecret,fileName.nameToSave)
                    fetch(url, {
                        method: "POST",
                        body: formData
                    })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        const object=JSON.parse(data)
                        console.log(object.public_id)
                        // var str = JSON.stringify(JSON.parse(data), null, 4);
                        // document.getElementById("formdata").innerHTML += str;
                    });
                // };
                const Url=hostUrl+'api/images/post/'+fileName+'.jpg'
                Poster(Url,{numeroEnvoi:j,ordreEnvoi:k,imgName:fileName+'.jpg',album:nomAlbum});
                if (modalDisplaye.last===false){
                    const Url=hostUrl+'api/images/add/album'
                    Poster(Url,{album:nomAlbum}); 
                }
        }}  
            
  return (

    <div style={{display:"flex",flexDirection:"column",paddingTop:"1.5em",width:"100%",margin:"0px",height:"fit-content"}} >
        <div style={{display:"flex",flexDirection:"row",width:"100%",padding:"0.5em 0px",justifyContent:"center",alignItems:"center",margin:".5em 0px"}}>
            <h6 style={{margin:"0px"}}>Nom album</h6>
            <input type="text" value={modalDisplaye.albumName} style={{width:"60%",height:"2em",padding:"0.4em 1em",marginLeft:".5em"}} onChange={(e)=>setModalDisplaye({...modalDisplaye,albumName:e.target.value})}/>
        </div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",lineHeight:"2em",padding:"1em",backgroundColor:"rgba(0,0,0,0.1)"}}>
            <input type="file" multiple style={{width:"70%",height:"2em",backgroundColor:"rgb(253,253,253)"}} id="filesInput" style={{padding:"1em"}}/>
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
                      height:'100vw',
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
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",padding:"2%",margin:"0px"}} >
                <h4 style={{margin:"0px",padding:"0px",paddingLeft:"5px",textDecoration:"underline"}} > Albums existants</h4>
                {albums.map((album,key)=><li key={album.index} onClick={(album)=>setModalDisplaye({showModal:false,albumName:album.name,last:true})} style={{mouse:"pointer"}}>{'⭐ ' + album.name}</li>)}
                <li key="last" onClick={()=>setModalDisplaye({showModal:false,albumName:null,last:false})} style={{mouse:"pointer",listStyle:"none"}}>⭐ Nouvel album</li>
            </ul>
                    </ReactModal>

    </div>
  )
}


export default function Galerie() {
    const [images,setImages]=useState([])
    const [albums,setAlbums]=useState([])
    // {images} pour dire le fichier image(j'eprouve une peine de pouvoir l'exprimer dans un format objet avec prop: ça ne satifait pas mes besoins )
    //  const [last,setLast]=useState(null)
    const [error,setError]=useState(null)

    useLayoutEffect(() => {
        fetch(hostUrl+'api/images/getAll')
          .then(response => response.json())
          .then(images => setImages(images))
          .catch(error => setError(error.message));
        fetch(hostUrl+'api/images/albums/getAll')
          .then(response => response.json())
          .then(albums => setAlbums(albums))
          .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
        },[]);
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

  return <>
    <div style={{position:"relative",width:"100%",marginTop:"80px",padding:"1em 0px",borderBottom:"3px solid rgb(240,240,240)"}}>
       <div style={{position:"absolute",margin:"0px",padding:"0px 2.5%",width:"95%",height:"100%",zIndex:"1",display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
            <Link to="/quisommesnous/galerie/" style={{width:"fit-content",marginTop:"10px"}}>{'🖼 '+ albums.length + ' Albums ( ' + images.length + ' photos)' }</Link>
            <Link to="/quisommesnous/galerie/addPictures" style={{borderRadius:"10px",textDecoration:"none",width:"fit-content",backgroundColor:"rgb(0,0,150)",fontWeight:"bold",color:"white",padding:".5em",border:"1px dotted rgb(0,0,200)"}}>Ajouter photos</Link>
        </div>
        <div id="overlay-div" style={{position:"absolute",display:"inline-block",margin:"0px",padding:"0px",width:"100%",height:"100%",float:"left",zIndex:"0",backgroundColor:"rgba(0,0,0,0.1)"}}>'</div>
    </div>
    <Outlet/>
    <div>

        {() =>{
            let imges=Array.from(albums).forEach((album)=>images.filter(image=>image.album===album.name))
            return <Album images={imges}/>
        }}
    </div>
    </>
}

 function Album({photos}) {
    const Photos=photos.length===0?{name:'avatar.webp'}:photos;
  return (
    <div style={{position:"relative",border:"1px double rgb(0,100,0)",width:"90vw",height:"90vw",margin:"5vw",padding:"0px"}}>
        <div style={{position:"absolute",width:"100%",height:"100%",border:"1px double grey",margin:"0px",top:"1.5px",left:"1.5px"}}>
            <div style={{display:"flex",flexDirection:"row",overflow:"hidden",position:"absolute",width:"100%",height:"100%",border:"1px double rgb(80,0,0)",top:"1.5px",left:"1.5px"}}>
            {Photos.map(photo=><img src={cloudinaryBaseUrl+'/'+photo.name} alt="imageSlider" className="imageSlider"/>)}
            </div>
        </div>
    </div>
  )
}

export function PhotosGrid() {
    const [images,setImages]=useState([{imgName:"Aucun"}])
    const [error,setError]=useState(null)
    useLayoutEffect(()=>{
        //if(document.querySelector('#overlay-div')){
            //const overlay=document.querySelector('#overlay-div')
            //overlay.style.display="none"
        //}
        fetch(hostUrl+'api/images/getAll')
          .then(response => response.json())
          .then(pictures => setImages(pictures))
          .catch(error => setError(error.message))}
     ,[])
    const handleAdd=()=>{}
    const handleDelete=()=>{}
    
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dapkl1ien/image/upload/signed_upload_demo_form/galerie'
  return (
    <div style={{paddingTop:"20px",display:"flex",flexFlow:"row wrap",alignItems:"start",justifyContent:"space-around"}}>
      {
        images.map(image=>
        <div style={{position:"relative",width:"44vw",height:"50vw",padding:"0.5vw",paddingTop:"2vw",margin:"0.40vw",borderRadius:"4px",border:"1px solid grey"}}>
            <img src={cloudinaryBaseUrl+'/'+ image.imgName} alt='Delagalerie' style={{position:"absolute",zIndex:"0",bottom:"0.5vw",width:"47vw",height:"45.5vw",margin:"0px",padding:"0px"}}/>
            <div style={{position:"absolute",float:"right",zIndex:"1",display:"flex",flexFlow:"row wrap",justifyContent:"center",width:"44vw",height:"4vw"}}>
                <button style={{backgroundColor:"rgba(0,0,0,0)",border:"1px solid black",color:"red",width:"fit-content",margin:"0px 1em"}} onClick={handleAdd}>{ajouter}</button>
                <button style={{backgroundColor:"rgba(0,0,0,0)",border:"1px solid black",color:"blue",width:"fit-content",margin:"0px 1em"}} onClick={handleAdd}>{ajouter}</button>
                <button style={{backgroundColor:"rgba(0,0,0,0)",border:"1px solid black",color:"red",width:"fit-content",margin:"0px 1em"}} onClick={handleDelete}>{supprimer}</button>
            </div>
        </div>)
         }
    </div>
  )
}

