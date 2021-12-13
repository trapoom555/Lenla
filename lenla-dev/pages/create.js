import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import PreviewButton from "../components/previewButton";
import ShareButton from "../components/shareButton";
import Profile from "../components/profile";
import Workspace from "../components/workspace";
import Inspector from "../components/inspector";
import Selector from "../components/selector";
import Diagram from "../components/Diagram";
import CanvasTest from "../components/CanvasTest";
// import { System } from "../blocks/block";
import * as Block from "../block_system/systemObj";
import { NAME_TYPE } from "../block_system/blockType";
export default function Create({ user, setUser }) {
    const initialElements = [
        {
            id: "1",
            type: NAME_TYPE.IN_CONSTANT,
            position: { x: 100, y: 100 },
            data: { type: "Constant", data: 10, portsOut: ["num"] },
            flag: "node",
        },
        {
            id: "2",
            type: NAME_TYPE.IN_CONSTANT,
            position: { x: 100, y: 200 },
            data: { type: "Constant", data: 5, portsOut: ["num"] },
            flag: "node",
        },
        // {
        //     id: "3",
        //     type: NAME_TYPE.OP_ADD,
        //     position: { x: 100, y: 100 },
        //     data: { portsIn: ["num", "num"], portsOut: ["num"] },
        //     flag: "node",
        // },
        {
            id: "8",
            type: NAME_TYPE.OP_SUM,
            position: { x: 300, y: 200 },
            data: { portsIn: ["+", "+", "-"], portsOut: ["num"] },
            flag: "node",
        },
        {
            id: "4",
            type: NAME_TYPE.OUT_NUMBER_DISPLAY,
            position: { x: 500, y: 200 },
            data: { portsIn: ["num"] },
            flag: "node",
        },
        // {
        //     id: "11",
        //     type: NAME_TYPE.OUT_NUMBER_DISPLAY,
        //     position: { x: 100, y: 100 },
        //     data: { portsIn: ["num"] },
        //     flag: "node",
        // },
        {
            id: "5",
            type: NAME_TYPE.IN_VECTOR_2D,
            position: { x: 100, y: 300 },
            data: { portsIn: [], portsOut: ["x", "y"], valOut: [17, 31] },
            flag: "node",
        },

        // {
        //     id: "5",
        //     type: NAME_TYPE.OP_LOG,
        //     position: { x: 100, y: 100 },
        //     data: { portsIn: ["num"] },
        //     flag: "node",
        // },
    ];
    const [elements, setElements] = useState(initialElements);
    const system = new Block.System();
    function getIntFromString(str) {
        let n = str.length;
        let run = n - 1;
        let val = Number(str.slice(run, n));
        if (!val) return 0;
        while (val) {
            run -= 1;
            val = Number(str.slice(run, n));
        }
        return Number(str.slice(run + 1, n)) - 1;
    }
    function compileAll() {
        console.log(getIntFromString("out1"));
        system = new Block.System();
        elements.forEach((element) => {
            if (element.flag == "node") {
                // console.log("555");
                system.add_element(element);
            }
            if (element.flag == "line") {
                system.set_port(
                    element.source,
                    element.target,
                    getIntFromString(element.sourceHandle),
                    getIntFromString(element.targetHandle)
                );
            }
        });
        system.compile();

        // system.add_elements(elements);
    }
    return (
        <>
            <div className="flexPage">
                <div className="flexNav">
                    <Navbar />
                    <ShareButton />
                    <button className="preview_button" onClick={compileAll}>
                        Preview
                    </button>
                    <Profile name={user.username} url={user.profileImage} />
                </div>

                {/* <div>
                    <CanvasTest
                    // color={color}
                    // selector={selector}
                    // selectCallBack={getOriginalColor}
                    // ref={inspector_ref}
                    />
                </div> */}
                <div className="flexContent">
                    <Diagram elements={elements} setElements={setElements} />

                    <Inspector elements={elements} setElements={setElements} />
                </div>

                <Selector />
            </div>
        </>
    );
}
