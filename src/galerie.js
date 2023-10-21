import React, {useEffect,useLayoutEffect,useState} from 'react';
import {Link,Outlet} from 'react-router-dom';
import ReactModal from 'react-modal';
import {Poster} from './requetesFetch.js';
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
    const Albums=[{name:'Aucun album'}]

    useLayoutEffect(() => {
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
                    const signResponse = await fetch(hostUrl+'api/mycloudinary/signuploadform/galerie/'+fileName);
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
                const Url=hostUrl+'/api/images/post/'+fileName+'.jpg'
                Poster(Url,{numeroEnvoi:j,ordreEnvoi:k,imgName:fileName+'.jpg',album:nomAlbum});
                if (modalDisplaye.last===false){
                    const Url=hostUrl+'/api/images/album/'+fileName+'.jpg'
                    Poster(Url,{album:nomAlbum}); 
                }
        }}  
            
  return (

    <div style={{display:"flex",flexDirection:"column",paddingTop:"50px",margin:"0px",height:"fit-content"}} >
        <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
            <h6>Nom album</h6>
            <input type="text" value={modalDisplaye.albumName} onChange={(e)=>setModalDisplaye({...modalDisplaye,albumName:e.target.value})}  style={{width:"30%",}}/>
        </div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
            <input type="file" multiple style={{width:"70%",}} id="filesInput"/>
            <button onClick={(e) =>handleCloudinaryModalClick(e)} style={{width:"30%",}}>Uploader les images</button>
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
                          backgroundColor: 'rgba(0, 0, 0, 0.7)'
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
                    zIndex:10000,
                    }}}
              >
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",padding:"2%",margin:"0px"}} >
                <h4 style={{margin:"0px",padding:"0px",paddingLeft:"5px",textDecoration:"underline"}} > Albums existants</h4>
                {Albums.map((album,key)=><li key={album.index} onClick={(album)=>setModalDisplaye({showModal:false,albumName:album.name,last:true})} style={{mouse:"pointer"}}>{'⭐ ' + album.name}</li>)}
                <li key="last" onClick={()=>setModalDisplaye({showModal:false,albumName:null,last:false})} style:{{mouse:"pointer"}}>⭐ Nouvel album</li>
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

    useEffect(() => {
        fetch(hostUrl+'api/images/getAll')
          .then(response => response.json())
          .then(images => {
                  setImages(images)
                })
          .catch(error => setError(error.message));
        fetch(hostUrl+'api/images/albums/getAll')
          .then(response => response.json())
          .then(albums => {
                  setAlbums(albums)
                })
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
    <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",width:"95vw",marginTop:"100px"}}>
        <Link to="/quisommesnous/galerie/" style={{width:"70%",}}>{'🖼 '+ albums.length + ' Albums ( ' + images.length + ' photos)' }</Link>
        <Link to="/quisommesnous/galerie/addPictures" style={{width:"20%",}}>Ajouter photos</Link>
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

export function PhotosGrid({images}) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dapkl1ien/image/upload/signed_upload_demo_form/membres';
    //const vue=images.length===0?<h6>Any pictures to display.</h6>:images.map(image=>
        //<div>
           // <img src={cloudinaryBaseUrl+'/avatar1.png'} alt=''/>
        //</div>)
  return (
    <div>
       <h6>Vue</h6> 
    </div>
  )
}

