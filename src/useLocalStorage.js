export const useLocalStorage=(key)=>{
    const byDefault={pseudo:'autrui',profil:'any',images:[]}
    const setIttem=(value)=>{try{window.localStorage.setItem(key,JSON.stringify(value))}catch(error){alert('⚠ erreur ❗: '+ error)}}
    const getIttem=()=>{
        try{
            const Value=window.localStorage.getItem(key)
            if(Value){return JSON.parse(Value)}else{return(byDefault)}
        }catch(error){return byDefault}}
    
    return {setIttem,getIttem}
}