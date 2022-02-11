import React, { useState, useEffect, useRef } from "react";
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
import { isDisplayable } from "../block_system/block_behavior";
import ThreeCanvas from "../components/threeCanvas";
import { getUserBySet } from "../components/API";

// import { HexColorPicker, HexColorInput } from "react-colorful";
let tempSys = new Block.System();
export default function Create({ user, setUser }) {
    // State
    // test(setUser);
    if (!user._id) {
        getUserBySet(setUser);
    }

    const [displayState, setDisplayState] = useState(0);
    const [inspectorState, setInspectorState] = useState(0);
    const [elements, setElements] = useState([]);
    const [selectedElementId, setSelectedElementId] = useState("-1");
    const [system, setSystem] = useState(tempSys);
    const [animeState, setAnimeState] = useState(0); // 0 : Stop, 1 : Play, 2 : Pause
    // const [systemReady, setsystemReady] = useState(false);
    const [diagramName, setDiagramName] = useState("untitle");
    const [diagramId, setDiagramId] = useState("");

    const { height, width } = useWindowDimensions();
    const canvasRef = useRef(null);

    // const system = new Block.System();
    function getIntFromString(str) {
        let n = str.length;
        let run = n - 1;
        let val = Number(str.slice(run, n));
        if (!val) return 0;
        while (val) {
            run -= 1;
            val = Number(str.slice(run, n));
        }
        return Number(str.slice(run + 1, n));
    }
    function compileAll() {
        system = new Block.System();
        elements.forEach((element) => {
            if (element.flag == "node") {
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

        setSystem(system);
        system.compile();
    }

    if (typeof window !== "undefined") {
        return (
            <>
                <div className="flexPage">
                    <div className="flexNav">
                        <Navbar
                            user={user}
                            elements={elements}
                            setElements={setElements}
                            setDiagramName={setDiagramName}
                            setDiagramId={setDiagramId}
                            diagramId={diagramId}
                        />
                        <div className="diagram_name">Diagram : {diagramName}</div>
                        <ShareButton />
                        <div className="preview_wrapper">
                            <button
                                className="preview_button"
                                onClick={() => {
                                    compileAll();
                                    setAnimeState(1);
                                }}
                                style={{
                                    display: animeState == 0 ? "" : "none",
                                }}
                            >
                                Preview
                            </button>
                            <div
                                className="play_pause_wrapper"
                                onClick={() => {
                                    setAnimeState(2);
                                }}
                                style={{
                                    display: animeState == 1 ? "" : "none",
                                }}
                            >
                                <div className="pause_button" />
                            </div>
                            <div
                                className="play_pause_wrapper"
                                onClick={() => {
                                    setAnimeState(1);
                                }}
                                style={{
                                    display: animeState == 2 ? "" : "none",
                                }}
                            >
                                <div className="play_button" />
                            </div>
                            <div
                                className="stop_wrapper"
                                style={{
                                    display: animeState != 0 ? "" : "none",
                                }}
                            >
                                <div
                                    className="stop_button"
                                    onClick={() => {
                                        setAnimeState(0);
                                        compileAll();
                                        // setElements([...elements]);
                                    }}
                                />
                            </div>
                        </div>
                        <Profile name={user.username} url={user.profileImage} />
                    </div>

                    <div className="flexContent">
                        <div>
                            <Diagram
                                elements={elements}
                                setElements={setElements}
                                compileAll={compileAll}
                                setSelectedElement={(x) => {
                                    setSelectedElementId(x);
                                }}
                                setInspectorState={setInspectorState}
                                width={Math.floor(0.7 * width)}
                                height={
                                    displayState == 0
                                        ? Math.floor(0.78 * height)
                                        : displayState == 2
                                        ? Math.floor(0.39 * height)
                                        : 0
                                }
                            />
                            {/* <CanvasTest
                                systemObj={system}
                                width={Math.floor(0.7 * width)}
                                height={
                                    displayState == 1
                                        ? Math.floor(0.78 * height)
                                        : displayState == 2
                                        ? Math.floor(0.39 * height)
                                        : 0
                                }
                                animeState={animeState}
                            /> */}
                            <ThreeCanvas
                                width={Math.floor(0.7 * width)}
                                height={
                                    displayState == 1
                                        ? Math.floor(0.78 * height)
                                        : displayState == 2
                                        ? Math.floor(0.39 * height)
                                        : 0
                                }
                                system={system}
                                setSystem={setSystem}
                                isRun={animeState}
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
                        displayState={displayState}
                        setDisplayState={setDisplayState}
                        diagramName={diagramName}
                    />
                    
                </div>
            </>
        );
    } else {
        return <></>;
    }
}
