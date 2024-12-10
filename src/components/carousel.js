import {Carousel } from 'react-bootstrap';
export default function Caroussel({propStyle,titre,roof,images}){
    return <>
    {titre && <h3 style={{textAlign:"center",color:"grey",}}>{titre}</h3>}
    <div className={propStyle.cl} style={{position:"relative",width:"100%",margin:"0px",zIndex:'0', }}>
            <Carousel fade>
            {Object.values(images).map((image,key)=>
            <Carousel.Item interval={8000}>
            <img
              className="d-block w-100"
              src={roof+image.url}
              alt={"slide"+key}
              style={{height:"500px",filter: image.brightness,...propStyle.style}}
            />
            <Carousel.Caption>
              <h3>{image.title}</h3>
              <p>{image.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
    
    
          )}
          
    
        </Carousel>
        </div>
        </>
}