import React from 'react';
import { Handle } from 'react-flow-renderer';
import Image from 'next/image'

  const BaseBlockWithoutHeader = ({ data, textLabel, inputId, outputId, bgColor, showInLabel = true, showOutLabel = true, blk_height = 0, blk_width = 90, isImgLabel = false, imgPath = '/../public/ic_gauge.png'}) => {
    let handleInList = [];
    let handleOutList = [];
    let label = [];

    for(let i=0; i < data.port.in.length; i++) {
      if(data.port.inEnable[i] == true){
        handleInList.push(
          <Handle
                type="target"
                position="left"
                id={`${inputId}${i}`}
                isConnectable={true}
                style={{top: `${((i+0.5) / data.port.in.length)  * 100}%`, borderRadius: 0 }}
            />
        )
      }
      if(showInLabel == true) {
        handleInList.push(
            <div style={{position: "absolute", top: `${((i+0.27) / data.port.in.length)  * 100}%`, left: "10%", color: 'black', fontSize:12}}>
                {data.port.in[i]}
            </div>
        )
      }
    }


    for(let i=0; i < data.port.out.length; i++) {
        handleOutList.push(
        <Handle
                type="source"
                position="right"
                id={`${outputId}${i}`}
                isConnectable={true}
                style={{top: `${((i+0.5) / data.port.out.length)  * 100}%`, borderRadius: 0 }}
            />
        )
        if(showOutLabel == true) {
            handleOutList.push(
                <div style={{position: "absolute", top: `${((i+0.27) / data.port.out.length)  * 100}%`, right: "-10%", color: 'black', fontSize:12}}>
                  {data.port.out[i]}
                </div>
            )
        }
      }
    
    if(isImgLabel == false) {
        label = <div style = {{marginTop: "-12.5%", width: "100%", position: "absolute", top: "50%", display:"flex", flexDirection: "column", alignItems: "center", textAlign: "center", fontSize: 20}}>{textLabel}</div>
    } else {
        label = <div style = {{width: "100%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}><Image src={imgPath} alt="No Image Found" width="50" height="50" draggable="false"/></div>
    }

    return (
      <div style={{background: bgColor, color: '#FFF', width: `${blk_width}px`, borderRadius: '10px', height: `${Math.max(data.port.in.length * 30, data.port.out.length * 30, blk_height, 60)}px`}}>
          {label}
          
          {handleInList}
          {handleOutList}
      </div>
    );
  };

export default BaseBlockWithoutHeader