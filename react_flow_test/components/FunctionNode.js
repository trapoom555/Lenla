import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';

const FunctionNodeStyle = {
    background: '#CF4297',
    color: '#FFF',
    width: "200px",
    height: "120px",
    borderRadius: '15px',
  };
  
  const FunctionNode = ({ data }) => {
    return (
      <div style={FunctionNodeStyle}>
        
        <div style = {{ borderStyle : "none none solid none", textAlign:"center", padding:"10px 0px"}}>{data.type}</div>
          <Handle type="target" position="left" style={{ borderRadius: 0, top:'65%' }} />
          <div style = {{margin: "25px 0px", textAlign: "center"}}>{data.text}</div>
          <div style={{position: "absolute", top: "45%", right: "5%", fontSize:12}}>{data.portsOut[0]}</div>
          <div style={{position: "absolute", top: "70%", right: "5%", fontSize:12}}>{data.portsOut[1]}</div>
          <Handle
              type="source"
              position="right"
              id="fn"
              isConnectable={true}
              style={{ top: '50%', borderRadius: 0 }}
          />
          <Handle
              type="source"
              position="right"
              id="fn2"
              isConnectable={true}
              style={{ top: '80%', borderRadius: 0 }}
          />
      </div>
    );
  };

export default FunctionNode