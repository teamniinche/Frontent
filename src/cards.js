import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export function Cards({mission}) {
  return (
    <Card style={{minWidth:'200px',width: '25%',backgroundColor:'whitesmoke',border:'3px solid white',}}>
      <Card.Img variant="top" src={"img-illustratives/"+mission.img} style={{filter:'brightness(1) saturate(1.2) contrast(80%)',}}/>
      <Card.Body>
        <Card.Title><h3 style={{color:'rgba(200,0,0,0.7)',fontFamily:'serif',}}>{mission.libelle}</h3></Card.Title>
        <Card.Text>
        <span style={{fontFamily:'cursive',fontSize:'0.7rem',}}>{mission.text}</span>
        </Card.Text>
      </Card.Body>
      {mission.add && <ListGroup className="list-group-flush" >
        <ListGroup.Item style={{backgroundColor:'whitesmoke',}}>Etape 1 - SINE-SALOUM</ListGroup.Item>
        <ListGroup.Item style={{backgroundColor:'whitesmoke',}}>Etape 2 - PODOR</ListGroup.Item>
        <ListGroup.Item style={{backgroundColor:'whitesmoke',}}>Etape 3 - CASAMANCE</ListGroup.Item>
      </ListGroup>}
    </Card>
  );
}

export function CardsMembre({membre}){
  const url=membre.img!==''?membre.img:'img-mbresBAT/no-photo.jpg';
  return <div className="cardText" style={{position:'relative',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'1rem',width:'fit-content',margin:'1rem',marginRight:'0.4rem',boxShadow:'1px 1px 2px grey',}}>
    <img className='cards-img' src={url} alt={membre.poste} style={{width:'135px',height:'135px',padding:'15px',border:'1px solid rgba(0,0,90,0.1)',}} width='135px' height='135px'/>
    <div style={{dispaly:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',paddingLeft:'1rem',maxWidth:'210px',maxHeight:'210px',width:'210px',}}>
      <h4 style={{margin:'0.4rem 0px',fontFamily:'reverse',}}>{membre.nom}</h4>
      <span style={{display:'block',marginBottom:'0.8rem',fontSize:'0.7rem',color:'rgba(0,0,100,0.6)',lineHeight:'1rem',}}>{membre.travail}</span>
      <span style={{display:'block',fontSize:'0.8rem',color:'grey',}}>Alias {membre.alias}</span>
      <span style={{display:'block',marginBottom:'1rem',fontWeight:'bold',color:'rgba(0,0,80,0.8)',}}>{membre.poste}</span>
      
      <div className='cards-div-icons' style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap:'1.5rem',color:'grey',}}><i class="bi bi-twitter-x"></i><i class="bi bi-facebook"></i><i class="bi bi-linkedin"></i></div>
    </div>
    
  </div>
}