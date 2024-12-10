import React,{useState,useLayoutEffect}from 'react'
import {serverApiUrl} from './root.js';
// const hostUrl='http://localhost:8080/tn-api-campagne/';

export function DataListEquipes(){
    return <datalist id="Equipes">
                <option value="Maçonnerie"></option>
                <option value="Carrelage"></option>
                <option value="Menuiserie metalique"></option>
                <option value="Menuiserie bois"></option>
                <option value="Electricité"></option>
                <option value="Plomberie"></option>
                <option value="Cuisine"></option>
                <option value="Peinture"></option>
                <option value="Autre"></option>
            </datalist>
}

export function DataListDepartements(){
    return <datalist id="departements">
                <option value="Bakel"></option>
                <option value="Bambey"></option>
                <option value="Bignona"></option>
                <option value="Birkelane "></option>
                <option value="Bounkiling"></option>
                <option value="Dagana"></option>
                <option value="Dakar"></option>
                <option value="Diourbel"></option>
                <option value="Fatick"></option>
                <option value="Foundiougne"></option>
                <option value="Gossas"></option>
                <option value="Goudiry"></option>
                <option value="Goudomp"></option>
                <option value="Guédiawaye"></option>
                <option value="Guinguinéo"></option>
                <option value="Kaffrine"></option>
                <option value="Kanel"></option>
                <option value="Kaolack"></option>
                <option value="Kébémer"></option>
                <option value="Kédougou"></option>
                <option value="Keur Massar"></option>
                <option value="Kolda"></option>
                <option value="Koumpentoum"></option>
                <option value="Koungheul"></option>
                <option value="Linguère"></option>
                <option value="Louga"></option>
                <option value="Mbour"></option>
                <option value="Malem-Hodar"></option>
                <option value="Matam"></option>
                <option value="Mbacké"></option>
                <option value="Médina Yoro Foulah"></option>
                <option value="Nioro du Rip"></option>
                <option value="Oussouye"></option>
                <option value="Pikine"></option>
                <option value="Podor"></option>
                <option value="Ranérou"></option>
                <option value="Rufisque"></option>
                <option value="Saint-Louis"></option>
                <option value="Salemata"></option>
                <option value="Saraya"></option>
                <option value="Sédhiou"></option>
                <option value="Tambacounda"></option>
                <option value="Thiès"></option>
                <option value="Tivaouane"></option>
                <option value="Vélingara"></option>
                <option value="Ziguinchor"></option> 
            </datalist>
}

function letParams(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // const urlencoded = new URLSearchParams();
    // urlencoded.append("email", val);
    
    const requestOptions = {
        method: "get",
        headers: myHeaders
    };
    return requestOptions;
}

export function DataListLocalites(){
    const [locs,setLocs]=useState([])
    
    useLayoutEffect(()=>{fetch(serverApiUrl+'localities/', letParams)
        .then(response => response.json())
        .then(data=>setLocs(data))
    },[])
    return <datalist id="Localites" >
                {locs && locs.map((loc,key)=>{
                    const local=loc.loc+' - '+loc.dep;
                    return <option key={key} value={loc.id+'_'+local}>{local}</option>})}
            </datalist>
}

export function DataListDonateurs(){
    const [donateurs,setDonateurs]=useState([])
    
    useLayoutEffect(()=>{fetch(serverApiUrl+'users/', letParams)
        .then(response => response.json())
        .then(data=>setDonateurs(data))
    },[])
    return <datalist id="Donateurs">
                {donateurs && donateurs.map((donateur,key)=>{
                    const nom=donateur.fName+' '+donateur.lName;
                    return <option key={key} value={donateur.id+'_'+nom}>{nom}</option>
                    })}
            </datalist>
}
// REGION DAKAR
export const Dakar=['NGOR','BISCUITERIE','CA.MERMOZ/ SACRE -COEUR','CAMBERENE','COLOBANE/FASS/GUEULE TAPEE','DIEUPPEUL DERKLE','FANN/POINT E/ AMITIE','GOREE','GRAND DAKAR','GRAND YOFF','HANN/ BEL AIR','HLM','MEDINA','OUAKAM','PARCELLES ASSAINIES','PATTE D’OIE','PLATEAU','SICAP LIBERTE','YOFF']
export const Guediawaye=['NDIAREME LIMAMOULAYE','GOLF SUD','MEDINA GOUNASS','SAM NOTAIRE','WAKHINANE NIMZATT']
export const Pikine=['DALIFORD','DIACK SAO','DIAMAGUENE/SICAP MBAO','DJIDAH THIAROYE KAO','GUINAW RAIL NORD','GUINAW RAIL SUD','KEUR MASSAR','M’BAO','MALIKA','PIKINE EST','PIKINE OUEST','PIKINE SUD','THIAROYE /MER','THIAROYE GARE','YEUMBEUL NORD','YEUMBEUL SUD']
export const Rufisque=['BAMBYLOR','COM. BARGNY','COM. DIAMNIADIO','COM. JAXAAY PARCELLE NIAKOUL RAP','COM. SANGALKAM','COM. SEBIKOTANE','COM. SENDOU','RUFISQUE EST','RUFISQUE CENTRE (NORD)','RUFISQUE OUEST','TIVAOUANE PEULH-NIAGHA','YENE']
// REGION THIES
export const Mbour=['NDIAGANIAO','NGUENIENE','COM. NGAPAROU','COM. GUEKOKH','COM. JOAL- FADIOUTH','COM. MBOUR','COM. POPOGUINE','COM. SALY PORTUDAL','COM. SOMONE','COM. THIADIAYE','DIASS','FISSEL','MALICOUNDA','SANDIARA','SESSENE','SINDIA']
export const Thiès=['NDIEYENE SIRAKH','NGOUNDIANE','COM. CAYAR','COM. KHOMBOLE','COM. POUT','DIENDER GUEDJI','FANDENE','KEUR MOUSSA','NOTTO','TASSETTE','THIENABA','THIES EST','THIES NORD','THIES OUEST','TOUBA TOUL']
export const Tivaouane=['NGANDIOUF','CHERIF LÖ','COM. MBORO','COM. MEKHE','COM. TIVAOUANE','DAROU KHOUDOSS','KOUL','MBAYENE','MEOUANE','MERINA DAKHAR','MONT- ROLLAND','NIAKHENE','NOTTO GOUYE DIAMA','PAMBAL','PEKESSE','PIRE GOUREYE','TAIBA NDIAYE','THILMAKHA']
// REGION SSAINT LOUIS
export const Dagana=['BOKHOL','COM. DAGANA','COM. GAE','COM. NDOMBO SANDJIRY','COM. RICHARD-TOLL','COM. ROSS-BETHIO','COM. ROSSO-SENEGAL','DIAMA','MBANE','NGNITH','RONKH']
export const Podor=['BOKE DIALLOUBE','COM. AERE LAO','COM. BODE LAO','COM. DEMETTE','COM. GALOYA TOUCOULEUR','COM. GOLLERE','COM. GUEDE CHANTIER','COM. MBOUMBA','COM. NDIANDANE','COM. NDIOUM','COM. PETE','COM. PODOR','COM. WALALDE','DODEL','DOUNGA-LAO','FANAYE','GAMADJI SARE','GUEDE VILLAGE','MBOLO BIRANE','MEDINA NDIATHBE','MERY','NDIAYENE PENDAO']
export const Saint_louis=['DIEBENE GANDIOLE','COM. MPAL','COM. SAINT LOUIS','FASS NGOM','GANDON']
// REGION MATAM
export const Kanel=['AOURE','BOKILADJI','COM. DEMBANCANE','COM. HAMADY OUNARE','COM. KANEL','COM. ODOBERE','COM. SEMME','COM. SINTHIOU BAMANBE-BANADJI','COM. WAOUNDE','NDENDORY','ORKADIERE','OURO SIDY']
export const Matam=['AGNAM-CIVOL','BOKIDIAWE','COM .MATAM','COM. NGUIDILOGNE','COM. OUROSSOGUI','COM. THILOGNE','DABIA','NABADJI-CIVOL','OGO']
export const Ranérou=['OREFONDE RANEROU','COM. RANEROU','LOUGRE-THIOLY','OUDALAYE','VELINGARA']
// REGION ZIGUINCHOR
export const Bignona=['BALINGORE','COM. BIGNONA','COM. DIOULOULOU','COM. THIONCK-ESSYL','COUBALAN','DIEGOUNE','DJIBIDIONE','DJINAKI','KAFOUNTINE','KARTHIACK','KATABA I','MANGAGOULACK','MLOMP','NIAMONE','OULAMPANE','OUONCK','SINDIAN','SUELLE','TENGHORY']
export const Oussouye=['COM. OUSSOUYE','DJEMBERING','MLOMP','OUKOUT','SANTHIABA MANJACQUE']
export const Ziguinchor=['ADEANE','BOUTOUPA CAMAR','COM. ZIGUINCHOR','ENAMPORE','NIAGUIS','NYASSIA']

export function ComByDep({dep}){
    return <datalist id="Communes">
            {dep && dep.map((d,key)=>{
                return <option key={key} value={d}>{d}</option>
                })}
        </datalist>
}