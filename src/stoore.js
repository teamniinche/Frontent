import { configureStore,createSlice } from '@reduxjs/toolkit';
// import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';




const persistConfig = {
  key: 'root',
  storage: storage, // Utilisez storage pour localStorage par défaut
};

const counterSlice = createSlice({
    name: 'userNewChant',
    initialState:{loggedInUser: null,
                  chantierToModifyName:null,
                  nbreDeChantiers:null,
                  membres:[],
                  newMembres:[],
                  blockedMembres:[],
                  local:{pos:[14.698230, -17.437130],index:0},
                  index:0,
                  chantier:null,
                  images:null,
                  albums:{imgName:"galerie_0_0.jpg",album:"Flyers"},
                  album:{name:"Flyers"}
                },
    reducers: {
      loggedAccess:(state, action) => {
        return {loggedInUser: action.payload,chantierToModifyName:null,local: {pos:[14.698230, -17.437130],index:0},}
        // return stat
    },
      modifyChantier: (state, action) => {
        return {...state, chantierToModifyName: action.payload}
        // return stat
    },
      chantiersCounter: (state, action) => {
        return {...state, nbreDeChantiers: action.payload}
        // return stat
    },
      localisation: (state, action) => {
        return {...state, local: action.payload}
        // return stat
    },
      setChantier: (state, action) => {
        return {...state, chantier: action.payload}
        // return stat
      },
      setIndex: (state, action) => {
        return {...state, index: action.payload}
        // return stat
      },
      setIges:(state, action) => {
        return {...state, images: action.payload}
        // return stat
      },
      setAlbms:(state, action) => {
        return {...state, albums: action.payload}
        // return stat
      },
      setAlbum:(state, action) => {
        return {...state, album: action.payload}
        // return stat
      },
      setMembres:(state, action) => {
        return {...state, membres: action.payload}
        // return stat
      },
      setNewMembres:(state, action) => {
        return {...state, membres: action.payload}
        // return stat
      },
      setBlockedMembres:(state, action) => {
        return {...state, membres: action.payload}
        // return stat
      }
    },
  });

  // Exporter les actions générées automatiquement
export const { loggedAccess,modifyChantier,chantiersCounter,mapOpened,setMembres,setNewMembres,setBlockedMembres,localisation,setChantier,setIndex,setIges,setAlbms,setAlbum} = counterSlice.actions;

//mon reduer
const reducer=counterSlice.reducer;
const persistedReducer=persistReducer(persistConfig,reducer)
export const store=configureStore({
    reducer:{
        userNewCh:persistedReducer
    }
})
export const persistor=persistStore(store)

// Exporter le réducteur
export default counterSlice.reducer;