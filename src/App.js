import React, { useState, useEffect } from 'react';
import { ReactExcel} from './Excelcomp';
import "./style.css";

const App = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [rowlength, setRowlength] = useState(4);
  const [collength, setcollength] = useState(7)
 
 


  function makeStructure(collength, rowlength) {
    let arr=[]
    let finalarr = []
    //cols unit
    let x=0
    let y=0
    while(y<collength){

      while(x<rowlength){
  
        arr.push("def value")
        x++
      }
      finalarr.push(arr)
      y++

    }

  
    // console.log(finalarr)
    setInitialData( finalarr)
    
  }

  useEffect(() => {
    if(undefined??collength){

      makeStructure(collength, rowlength)
    }
   
  }, [collength, rowlength])

  

  return (
    <div className='App'>
      
      <input defaultValue={rowlength} className='custom-button' onChange={(e)=>{setRowlength(e.target.value)}}/>
      <input defaultValue={collength} className='custom-button'  onChange={(e)=>{setcollength(e.target.value)}}/>
      {collength?
      <ReactExcel
      initialData={initialData}
      reactExcelClassName='react-excel'
      />:null
    }

    </div>
  );
};

export default App;
