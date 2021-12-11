import React from 'react';
import { Handle } from 'react-flow-renderer';
import Image from 'next/image'

const GaugeBlockStyle = {
    background: '#9b92fc',
    color: '#FFF',
    width: "70px",
    height: "70px",
    borderRadius: "15px",
    paddingLeft: "20px",
    paddingTop: "15px"
  };
  
  const GaugeBlock = ({ data }) => {
    return (
      <div style={GaugeBlockStyle}>
          <Image src="/../public/ic_gauge.png" alt="me" width="50" height="50" draggable="false" />
          <div style={{position: "absolute", top: "30%", left: "-35%", color: 'black', fontSize:12}}>{data.portsIn[0]}</div>
          <Handle
              type="target"
              position="left"
              id="number_in"
              isConnectable={true}
              style={{top: "50%", borderRadius: 0 }}
          />
      </div>
    );
  };

export default GaugeBlock