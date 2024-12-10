import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './store';
// import Loader from './loaderHtml.js'
import Heade from "./heade.js";
// import NewChantier from "./newChantier.js";
import Sections from './sections.js';
import {Nous,SecondeBar} from './nous.js';
import LaTeam from './lateam.js';
// import Discussion from './discussion.js';
import {NousSoutenir,CopyRight} from './nousContacter.js';
import Forms from './forms.js'
import Connexion from './connexion.js'
import Galerie,{PhotosGrid,NouvelAlbum,ImagesGrid} from './galerie.js'
import Session,{FieldsetCompte} from './session.js';
import Pagesceo from "./pagesceo.js";
import NouveauChantier from './nouveauChantier.js';
import Actu from './actu.js'
import Contacts from "./contacts.js";
import Accueil from "./accueil.js";
import Items from "./campagnes-tn/items.js";
import Partenaires from "./nos_partenaires.js";


export default function Teamniintche() {
  return (
      <Router>
        <div >
          <Heade/>
          <Routes>
            <Route>
                <Route path="/quisommesnous" element= <SecondeBar />>
                      <Route path="/quisommesnous/lesmembres" element=<Nous />/>
                      <Route path="/quisommesnous/galerie" element= <Galerie/>>
                          <Route path="/quisommesnous/galerie/addPictures" element=<NouvelAlbum/>/>
                          <Route path="/quisommesnous/galerie/displayPhotos" element=<ImagesGrid/>/>
                          <Route path="/quisommesnous/galerie/" element=<PhotosGrid/>/>
                      </Route>
                      <Route path="/quisommesnous/" element=<LaTeam/>/>
                </Route>
                <Route path="/actualites" element=<Actu/>/>
                <Route path="/nouscontacter" element=<Contacts/>/>
                <Route path="/connexion" element=<Connexion/>/>
                <Route path="/compte" element=<Session/>>
                    <Route path="/compte/pagesceo" element=<Pagesceo/>/>
                    <Route path="/compte/nouveauChantier" element=<NouveauChantier/>/>
                    <Route path="/compte/" element=<FieldsetCompte/>/>
                </Route>
                <Route path="/connexion/inscription" element=<Forms/>/>
                <Route path="/connexion/inscription" element=<Items/>/> 
                <Route path="/campagnes" element=<Items/>/> 
                {/* Forms */}
                <Route path="/nos_realisations" element=<Sections />/>
                <Route path="/nos_partenaires" element=<Partenaires />/>
                <Route path="/" element=<Accueil/>/>
                <Route path="*" element=<Accueil/>/>
            </Route>
          </Routes>
          <NousSoutenir/>
          <CopyRight/>
        </div>
      </Router>
  );
}
