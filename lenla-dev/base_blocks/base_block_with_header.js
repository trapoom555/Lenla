import React from "react";
import { Handle } from "react-flow-renderer";

const ConstantBlockStyle = {
    background: "#f7955c",
    color: "#FFF",
    width: "100px",
    height: "100px",
    borderRadius: "15px",
};

const BaseBlockWithHeader = ({ data, headerLabel, textLabel, inputId, outputId, bgColor, showInLabel = true, showOutLabel = true, blk_height = 0, blk_width = 90, isImgLabel = false, imgPath = '/../public/ic_gauge.png'}) => {
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
                style={{top: `${((i+0.5) / data.port.in.length)  * 100 + 20}%`, borderRadius: 0 }}
            />
        )
      }
      if(showInLabel == true) {
        handleInList.push(
            <div style={{position: "absolute", top: `${((i+0.27) / data.port.in.length)  * 100 + 20}%`, left: "10%", color: 'black', fontSize:12}}>
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
                style={{top: `${((i+0.5) / data.port.out.length)  * 100 + 20}%`, borderRadius: 0 }}
            />
        )
        if(showOutLabel == true) {
            handleOutList.push(
                <div style={{position: "absolute", top: `${((i+0.27) / data.port.out.length)  * 100 + 20}%`, right: "-40%", color: 'black', fontSize:12}}>
                  {data.port.out[i]}
                </div>
            )
        }
      }
    
    if(isImgLabel == false) {
        label = <div style = {{width: "100%", position: "absolute", top: "50%", display:"flex", flexDirection: "column", alignItems: "center", textAlign: "center", fontSize: 20}}>{textLabel}</div>
    } else {
        label = <div style = {{width: "100%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}><Image src={imgPath} alt="No Image Found" width="50" height="50" draggable="false"/></div>
    }
    return (
        <div style={{background: bgColor, color: '#FFF', width: `${blk_width}px`, borderRadius: '10px', height: `${Math.max(data.port.in.length * 30, data.port.out.length * 30, blk_height, 60)}px`}}>
            <div
                style={{
                    borderStyle: "none none solid none",
                    textAlign: "center",
                    padding: "10px 0px",
                    }}
                >
                {headerLabel}
            </div>
            {label}
        
            {handleInList}
            {handleOutList}
          
        </div>
        // <div style={ConstantBlockStyle}>
        //     <div
        //         style={{
        //             borderStyle: "none none solid none",
        //             textAlign: "center",
        //             padding: "10px 0px",
        //         }}
        //     >
        //         Constant
        //     </div>
        //     <div
        //         style={{
        //             width: "100%",
        //             top: "50%",
        //             position: "absolute",
        //             textAlign: "center",
        //             alignItems: "center",
        //             fontSize: 30,
        //         }}
        //     >
        //         {element.data.info[0].value}
        //     </div>
        //     <div
        //         style={{
        //             position: "absolute",
        //             top: "47%",
        //             right: "-35%",
        //             color: "black",
        //             fontSize: 12,
        //         }}
        //     >
        //         {element.data.port.out[0]}
        //     </div>
        //     <Handle
        //         type="source"
        //         position="right"
        //         id="number_out"
        //         isConnectable={true}
        //         style={{ top: "65%", borderRadius: 0 }}
        //     />
        // </div>
    );
};

export default BaseBlockWithHeader;
