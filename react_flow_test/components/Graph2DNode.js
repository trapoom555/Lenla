import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';

const Graph2DNodeStyle = {
    background: '#BC2F2F',
    color: '#FFF',
    width: "170px",
    height: "100px",
    borderRadius: '15px',
  };
  
  const Graph2DNode = ({ data }) => {
    return (
      <div style={Graph2DNodeStyle}>
        
        <div style = {{ borderStyle : "none none solid none", textAlign:"center", padding:"10px 0px"}}>{data.type}</div>
          <Handle type="target" position="left" id = "fn" style={{ borderRadius: 0, top:'65%' }} isConnectable={true} />
          <div style = {{margin: "10px 0px", textAlign: "center"}}>{data.text}</div>
          <div style={{position: "absolute", top: "55%", left: "5%", fontSize:12}}>{data.portsIn[0]}</div>
      </div>
    );
  };

export default Graph2DNode