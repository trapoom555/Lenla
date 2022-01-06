import React from 'react';
import { Handle } from 'react-flow-renderer';

  const SumBlock = ({ data }) => {
    let handleInList = [];
    for(let i=0; i < data.port.in.length; i++) {
      if(data.port.inEnable[i] == true){
        handleInList.push(
          <Handle
                type="target"
                position="left"
                id={`number_in${i}`}
                isConnectable={true}
                style={{top: `${((i+0.5) / data.port.in.length)  * 100}%`, borderRadius: 0 }}
            />
        )
      }
      handleInList.push(
          <div style={{position: "absolute", top: `${((i+0.27) / data.port.in.length)  * 100}%`, left: "10%", color: 'black', fontSize:12}}>
            {data.port.in[i]}
          </div>
      )
    }
    return (
      <div style={{background: '#86C4D9', color: '#FFF', width: '90px', borderRadius: '10px', height: `${data.port.in.length * 30}px`}}>
          <div style = {{marginTop: "-12.5%", width: "100%", position: "absolute", top: "50%", display:"flex", flexDirection: "column", alignItems: "center", textAlign: "center", fontSize: 20}}>Sum</div>
          {handleInList}
          <Handle
              type="source"
              position="right"
              id="number_out"
              isConnectable={true}
              style={{top: "50%", borderRadius: 0 }}
          />
      </div>
    );
  };

export default SumBlock