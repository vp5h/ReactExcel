import React, { useState, useEffect } from 'react';



export const ReactExcel = (props) => {
  const {
    initialData,
    reactExcelClassName,
   
  } = props;
  const [currentSheet, setCurrentSheet] = useState(undefined);
  
function keyhandler(e,y,x){
   
     const LEFT_KEY = 37;
     const UP_KEY = 38;
     const RIGHT_KEY = 39;
     const DOWN_KEY = 40;
   
     let ele
       

     
     if(x>=0){
      

            if(x<currentSheet[0].length-1){
                if(e.keyCode===RIGHT_KEY){

                             ele = document.getElementById("row"+Number(y)+"col"+Number(x+1))
                            ele.contentEditable = true
                            ele.focus()
            
                }

            }

            if(y< currentSheet.length-1){

             if(e.keyCode===DOWN_KEY){

                        ele = document.getElementById("row"+Number(y+1)+"col"+Number(x))
                        ele.contentEditable = true
                        ele.focus()
        
                    }

            }
        }
        if(y<= currentSheet.length-1){


          
        
            if( y>=0 && x>0){
                if(e.keyCode===LEFT_KEY){

                 ele =  document.getElementById("row"+Number(y)+"col"+Number(x-1))
                ele.contentEditable = true
                ele.focus()
            
                }

            }

            if(x<=currentSheet[0].length-1 && y>0){

             if(e.keyCode===UP_KEY){

                        ele = document.getElementById("row"+Number(y-1)+"col"+Number(x))
                        ele.contentEditable = true
                        ele.focus()
        
                    }

            }





        }
    
      

}
  


  const createTableHeader = (firstRow) => {
    return (
      <thead>
        <tr>
          {Object.values(firstRow).map((cell, idx) => (
            <th
              key={idx}
             onDoubleClick={(e)=>{e.target.contentEditable = true}} 
             contentEditable={false}
              suppressContentEditableWarning={true}
              onKeyUp={(e)=>{keyhandler(e,0,idx)}}
              id={"row"+0+"col"+idx}
              onBlur={(e) => {
                updateSheet(e.currentTarget.textContent, 0, idx);
                e.target.contentEditable = false
              }}
            >
              {cell}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const createTableBody = (rowArray) => {
    const rows = rowArray.slice(1);
    return (
      <tbody>
        {rows.map((row, id) => (
          <tr key={id}>
            {row.map((cell, idx) => (
              <td
                key={idx}
                contentEditable={false}
                onDoubleClick={(e)=>{e.target.contentEditable = true}} 
                id={"row"+Number(id+1)+"col"+idx}
                suppressContentEditableWarning={true}
                onKeyUp={(e)=>{keyhandler(e,id+1,idx)}}
                onBlur={(e) => {
                  updateSheet(e.currentTarget.textContent, id + 1, idx);
                  e.target.contentEditable = false
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const updateSheet = (newValue, row, col) => {
  
   
    let arr= []
    let subarr = []
     currentSheet.map((rolw, rowindex)=>{

       
        if(rowindex === row ){
            
            rolw.map((cell, index)=>{
                if(index===col){
    
                    subarr.push(newValue)
                }else{
                    subarr.push(cell)
                }
                return null
            
            })
            arr.push(subarr)
        }else{
            arr.push(rolw)
        }
        return null
    })
    
    setCurrentSheet(arr)
    
    
  };

  

  useEffect(() => {
    const setData = () => {
   
  
      setCurrentSheet(initialData);
      
    };

    initialData && setData();
  }, [initialData]);

  return (
    <div className={reactExcelClassName}>
      {currentSheet && (
        <table>
          {createTableHeader(Object.values(currentSheet)[0])}
          {createTableBody(Object.values(currentSheet))}
        </table>
      )}
    </div>
  );
};
