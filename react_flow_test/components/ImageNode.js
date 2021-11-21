import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';

const ImageNodeStyle = {
    background: '#497CFF',
    color: '#FFF',
    width: "170px",
    height: "100px",
    borderRadius: '15px',
  };
  
  const ImageNode = ({ data }) => {
    return (
      <div style={ImageNodeStyle}>
        
        <div style = {{ borderStyle : "none none solid none", textAlign:"center", padding:"10px 0px"}}>{data.type}</div>
          <Handle type="target" position="left" id = "image" style={{ borderRadius: 0, top:'65%' }} isConnectable={true}/>
          <div style = {{margin: "10px 0px", textAlign: "center"}}>{data.text}</div>
          <div style={{position: "absolute", top: "55%", left: "5%", fontSize:12}}>{data.portsIn[0]}</div>
      </div>
    );
  };

export default ImageNode