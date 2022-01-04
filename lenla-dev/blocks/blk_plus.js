import React from 'react';
import { Handle } from 'react-flow-renderer';

const PlusBlockStyle = {
    background: '#86C4D9',
    color: '#FFF',
    width: "50px",
    height: "60px",
    borderRadius: "10px",
  };
  
  const PlusBlock = ({ data }) => {
    return (
      <div style={PlusBlockStyle}>
          <div style = {{width: "100%", height: "100%", position: "absolute", top: "10%", textAlign: "center", fontSize: 40}}>+</div>
          {/* <div style={{position: "absolute", top: "5%", left: "-65%", color: 'black', fontSize:12}}>{data.port.out[0]}</div>
          <div style={{position: "absolute", top: "70%", left: "-65%", color: 'black', fontSize:12}}>{data.port.in[0]}</div>
          <div style={{position: "absolute", top: "20%", right: "-65%", color: 'black', fontSize:12}}>{data.port.in[1]}</div> */}
          <Handle
              type="target"
              position="left"
              id="number_in1"
              isConnectable={true}
              style={{top: "35%", borderRadius: 0 }}
          />
          <Handle
              type="target"
              position="left"
              id="number_in2"
              isConnectable={true}
              style={{top: "65%", borderRadius: 0 }}
          />
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

export default PlusBlock