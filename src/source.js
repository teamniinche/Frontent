//people using the keyboard for navigation or screen readers will still be able to use this app.

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
// import Map from './map.js'
// import Inscription from './inscription.js'
import Forms from './forms.js'
import Connexion from './connexion.js'
// import CompressionImage, {RedimensionnementImage} from './tesImage.js';
// import PresentationEtablissement from './local.js'
// import ImageCompressee from './imageCompressor.js'
// import {ImageUploader} from './traitementImages.js'
import Galerie,{PhotosGrid,NouvelAlbum,ImagesGrid} from './galerie.js'
import Session,{FieldsetCompte} from './session.js';
// import Slider from './slider.js';
// import {images} from './icons.js';
import Pagesceo from "./pagesceo.js";
import NouveauChantier from './nouveauChantier.js';
// import {ConnectedFieldsetCompte} from "./session.js";
// import Actu from './actu.js'
import Contacts from "./contacts.js";

export default function Teamniintche() {
  return (
    // <PersistGate persistor={persistor}>
      <Router>
        <div>
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
                {/* <Route path="/actualites" element=<Actu/>/> */}
                <Route path="/nouscontacter" element=<Contacts/>/>
                <Route path="/connexion" element=<Connexion/>/>
                <Route path="/compte" element=<Session/>>
                    <Route path="/compte/pagesceo" element=<Pagesceo/>/>
                    <Route path="/compte/nouveauChantier" element=<NouveauChantier/>/>
                    <Route path="/compte/" element=<FieldsetCompte/>/> 

                        {/* <ConnectedFieldsetCompte/> */}
                        
                        {/* <Route path="/compte/personnel/confidentiel" element=<Pagesceo/>/>
                        <Route path="/compte/personnel/galerie" element=<Pagesceo/>/>
                        <Route path="/compte/personnel/" element=<FieldsetCompte/>/>
                    </Route> */}
                </Route>
                <Route path="/connexion/inscription" element=<Forms/>/> 
                <Route path="/" element=<Sections />/>
                <Route path="*" element=<Sections />/>
            </Route>
          </Routes>
          <NousSoutenir/>
          <CopyRight/>
        </div>
      </Router>
    // </PersistGate>
  );
}