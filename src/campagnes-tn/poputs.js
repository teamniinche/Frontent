import React ,{useState,useEffect,useContext} from 'react'
import { DisplayAlertContext } from './items';

export function AlertPoped(){
    const [width,setWidth]=useState('0px');
    const {str,DisplayTChange}=useContext(DisplayAlertContext);
    const data=str.data;

    useEffect(()=>setWidth('300px'),[])
    setTimeout(()=>{
        //setDisply('none');
        DisplayTChange('sleep',{code:'green',message:''},null)},
        10000,
        [width]
    )
    return <div
        style={{
        display:'inline-block',//disply,
        backgroundColor:data.code,
        color:'white',
        fontWeight:'bold',
        zIndex:'9',
        borderTopLeftRadius:'8px',
        borderBottomLeftRadius:'8px',
        position:'absolute',
        flaot:'right',
        maxHeigh:'2rem',
        maxWidth:'400px',
        height:'2rem',
        overflow:'hidden',
        textWrap:'nowarap',
        width:width,
        padding:'1rem',
        textAlign:'left',
        paddingRight:'4rem',
        right:'-1rem',
        top:'10rem',
        transition:'width 1.5s ease-in',
        }}
        >

        {data.message}

    </div>
}