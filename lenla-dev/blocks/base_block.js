import React from "react";
import { Handle, Position } from "react-flow-renderer";
const PlusBlockStyle = {
    background: "#E0F0F0",
    color: "#000000",
    width: "150px",
    height: "70px",
    borderRadius: "5px",
    // fontSize: "10px",
};

export const BasicBlock = (element) => {
    // console.log("redraw block");
    // console.log(element);
    let inPorts = [];
    let outPorts = [];
    const { data } = element;
    // console.log("fuck");
    // console.log(element);
    let n = 0;
    let i = 0;
    for (i = 0; i < data.port.in.length; i++) {
        if (data.port.inEnable[i] == true) {
            n++;
        }
    }
    let space = 100 / (n + 1);
    for (i = 0; i < n; i++) {
        inPorts.push({
            i: i,
            data: data.port.in[i],
            top: space * (i + 1) - 12,
            top2: space * (i + 1),
        });
    }
    n = data.port.out.length;
    i = 0;
    space = 100 / (n + 1);
    for (i = 0; i < n; i++) {
        outPorts.push({
            i: i,
            data: data.port.out[i],
            top: space * (i + 1) - 12,
            top2: space * (i + 1),
        });
    }

    return (
        <div style={PlusBlockStyle}>
            {inPorts.map((val) => (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: val.top + "%",
                            left: "5%",
                            color: "black",
                            fontSize: 12,
                        }}
                    >
                        {val.data}
                    </div>
                    <Handle
                        type="target"
                        position={Position.Left}
                        id={"number_in" + val.i}
                        isConnectable={true}
                        style={{ top: val.top2 + "%", borderRadius: 0 }}
                    />
                </>
            ))}
            {outPorts.map((val) => (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: val.top + "%",
                            right: "5%",
                            color: "black",
                            fontSize: 12,
                        }}
                    >
                        {val.data}
                    </div>
                    <Handle
                        type="source"
                        position="right"
                        id={"number_out" + val.i}
                        isConnectable={true}
                        style={{ top: val.top2 + "%", borderRadius: 0 }}
                    />
                </>
            ))}
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "25%",
                    textAlign: "center",
                    fontSize: 15,
                }}
            >
                {element.type}
            </div>
        </div>
    );
};
