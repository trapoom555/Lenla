import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import PreviewButton from "../components/previewButton";
import ShareButton from "../components/shareButton";
import Profile from "../components/profile";
import Workspace from "../components/workspace";
import useWindowDimensions from "../hook/useWindowDimensions";
import Inspector from "../components/inspector";
import Selector from "../components/selector";
import Diagram from "../components/Diagram";
import CanvasTest from "../components/CanvasTest";
// import { System } from "../blocks/block";
import * as Block from "../block_system/systemObj";
import { BLOCK_TYPE } from "../block_system/stringConfig";
import { ReactFlowProvider } from "react-flow-renderer";

export default function Create({ user, setUser }) {
    const [displayState, setDisplayState] = useState(0);
    const [inspectorState, setInspectorState] = useState(0);
    const initialElements = [];
    // initialElements.push(
    //     Block.createElementObj(
    //         getID(),
    //         BLOCK_TYPE.IN_CONSTANT,
    //         { x: 100, y: 100 },
    //         { value: 7 }
    //     )
    // );
    // initialElements.push(
    //     Block.createElementObj(
    //         getID(),
    //         BLOCK_TYPE.IN_CONSTANT,
    //         { x: 100, y: 200 },
    //         { value: 9 }
    //     )
    // );
    // initialElements.push(
    //     Block.createElementObj(
    //         getID(), 
    //         BLOCK_TYPE.OP_SUM, {
    //         x: 300,
    //         y: 150,
    //     })
    // );
    // initialElements.push(
    //     Block.createElementObj(getID(), BLOCK_TYPE.OUT_NUMBER_DISPLAY, {
    //         x: 500,
    //         y: 150,
    //     })
    // );
    // initialElements.push(
    //     Block.createElementObj(
    //         getID(),
    //         BLOCK_TYPE.IN_CONSTANT,
    //         { x: 100, y: 300 },
    //         { value: 7 }
    //     )
    // );
    const { height, width } = useWindowDimensions();
    const [elements, setElements] = useState(initialElements);
    const [selectedElementId, setSelectedElementId] = useState(-1);
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
    
    if(typeof window !== 'undefined') {
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

                
                    
                    <div className="flexContent">
                        <div>
                            <Diagram
                                elements={elements}
                                setElements={setElements}
                                setSelectedElement={(x) => {
                                    setSelectedElementId(x);
                                }}
                                setInspectorState={setInspectorState}
                                width = {Math.floor(0.7*width)}
                                height = {displayState == 0 ? Math.floor(0.78*height) : (displayState == 2 ? Math.floor(0.39*height) : 0)}
                            />
                            
                            <CanvasTest
                                width = {Math.floor(0.7*width)}
                                height = {displayState == 1 ? Math.floor(0.78*height) : (displayState == 2 ? Math.floor(0.39*height) : 0)}
                            />
                        </div>
                            
                        <Inspector
                            elements={elements}
                            setElements={setElements}
                            selectedElementId={selectedElementId}
                            inspectorState={inspectorState}
                            setInspectorState={setInspectorState}
                        />
                    </div>

                    <Selector
                        displayState = {displayState}
                        setDisplayState={setDisplayState}
                    />
                </div>
            </>
        );
    }
    else {
        return (<></>)
    }
}

