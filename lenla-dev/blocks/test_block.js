import React from "react";
import { Handle } from "react-flow-renderer";

const PlusBlockStyle = {
    background: "#E0F0F0",
    color: "#000000",
    width: "120px",
    height: "70px",
    borderRadius: "5px",
    // fontSize: "10px",
};
let array = [];

export const TestBlock = (element) => {
    // console.log(element);
    const { data } = element;
    const n = data.portsIn.length;
    let i = 0;
    let space = 100 / (n + 1);
    for (i = 0; i < n; i++) {
        array.push({
            i: i + 1,
            data: data.portsIn[i],
            top: space * (i + 1) - 12,
            top2: space * (i + 1),
        });
    }

    return (
        <div style={PlusBlockStyle}>
            {array.map((val) => (
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
                        position="left"
                        id={"number_in" + val.i}
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
            {/* <Handle
                type="target"
                position="r"
                id={"number_in" + val.i}
                isConnectable={true}
                style={{ top: val.top2 + "%", borderRadius: 0 }}
            /> */}
        </div>
    );
};
