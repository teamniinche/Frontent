import { SousTitre, Titre } from "./titres"
import { membresBureauAdministration,membresBureauTechnique } from "../iterables"
import { CardsMembre } from "../cards"
export function Bureau(){
    return  <div style={{width:'100%',background:'linear-gradient(to right bottom,white, rgba(0,100,0,0.1))',}}>
    <Titre text="Du bureau administratif & technique"/>
    {/* <SousTitre text='Membres du bureau administratif'/> */}
    <div className='bureau-cards' style={{display:'flex',flexDirection:'row',justifyContent:'center',width:'100%',alignItems:'center',flexWrap:'wrap',}}>
        {Object.values(membresBureauAdministration).map(membre=><CardsMembre membre={membre} />)}
        {/* <SousTitre text='Chefs techniques des corps de métiers'/>*/}
        {Object.values(membresBureauTechnique).map(membre=><CardsMembre membre={membre} />)}
    </div>
  </div>
}