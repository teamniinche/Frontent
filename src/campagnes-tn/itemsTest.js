import React,{useLayoutEffect,useState} from 'react';
import {serverApiUrl} from '../root.js';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'bootstrap/dist/css/bootstrap.min.css';
// import language from 'datatables.net-plugins/i18n/fr-FR.mjs';
 
// var table = new DataTable('#myTable', {
//     language,
// });

DataTable.use(DT);
// let table = new DataTable('.table');
export default function Items(){
    const [tableData,setTableData]=useState([])
    

    const columns = [
        { data: 'dep' },
        { data: 'com' },
        { data: 'loc' },
      ];

    useLayoutEffect(()=>{ 
        fetch(serverApiUrl+"localities",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})//, requestOptions)
        .then((response) => response.json())
        .then((result) => setTableData(result))
        .catch((error) => console.error(error))
    },[] )

return <div  style={{padding:"5rem",paddingTop:"80px",maxWidth:"1300px",maxHeight:"80vh",minHeight:"80vh",height:"fit-content",overflowY:"scroll",width:"90vw",margin:"auto",border:"none",}}> 
    <DataTable 
        columns={columns}
        data={tableData}
        className="table table-striped"
        options={{ responsive: true }}
    > 
       <thead >
            <tr>
                <th >Departement</th>
                <th >Commune</th>
                <th >Localité</th>
            </tr>
        </thead>
        
    </DataTable>

    </div>
}