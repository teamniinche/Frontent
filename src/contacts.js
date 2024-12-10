import React from 'react'
import {Numeros,Opinion,NsContacterNsSuivre} from './nousContacter.js'
import Footer from './footer.js'
import './css/contacts.css'
import { Parteners } from './campagnes-tn/items.js'
export default function Contacts() {
    return <>
        <div id="contacts-partenaires">
            <NsContacterNsSuivre/>
            <div id="contacts">
                <Numeros/>
                <Opinion/>
            </div>
            <div id="partenaires">
                <div style={{backgroundColor:'whitesmoke',width:'90%',padding:'2rem',borderRadius:"5px solid grey",boxShadow:"2px 2px 5px grey",}}>
                    <h3>Les Partenaires</h3>
                    <Parteners/>
                </div>
            </div>
        </div>
        <Footer/>
      </>
  }

