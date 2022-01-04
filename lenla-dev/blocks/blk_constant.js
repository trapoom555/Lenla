import React from "react";
import { Handle } from "react-flow-renderer";

const ConstantBlockStyle = {
    background: "#f7955c",
    color: "#FFF",
    width: "100px",
    height: "100px",
    borderRadius: "15px",
};

const ConstantBlock = (element) => {
    const { data } = element;
    // console.log(data)
    return (
        <div style={ConstantBlockStyle}>
            <div
                style={{
                    borderStyle: "none none solid none",
                    textAlign: "center",
                    padding: "10px 0px",
                }}
            >
                Constant
            </div>
            <div
                style={{
                    width: "100%",
                    top: "50%",
                    position: "absolute",
                    textAlign: "center",
                    alignItems: "center",
                    fontSize: 30,
                }}
            >
                {element.data.info[0].value}
            </div>
            <div
                style={{
                    position: "absolute",
                    top: "47%",
                    right: "-35%",
                    color: "black",
                    fontSize: 12,
                }}
            >
                {element.data.port.out[0]}
            </div>
            <Handle
                type="source"
                position="right"
                id="number_out"
                isConnectable={true}
                style={{ top: "65%", borderRadius: 0 }}
            />
        </div>
    );
};

export default ConstantBlock;
