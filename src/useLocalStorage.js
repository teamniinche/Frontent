export const useLocalStorage=(key)=>{
    const setIttem=(value)=>{try{window.localStorage.setItem(key,JSON.stringify(value))}catch(error){alert('⚠ erreur ❗: '+ error)}}
    const getIttem=()=>{
        try{
            const Value=window.localStorage.getItem(key)
            if(Value){return JSON.parse(Value)}else{alert('⚠ Pas de données❗')}
        }catch(error){alert('⚠ erreur ❗: '+ error)}}
    
    return {setIttem,getIttem}
}