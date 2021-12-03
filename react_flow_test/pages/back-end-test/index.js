import DnDFlow from "./Diagram";
import Sidebar from "./Sidebar";
import P5 from "./P5";
import React, { useRef, useState } from "react";

export default function Home() {
    const diagramref = useRef();
    const p5ref = useRef();
    const [showDiagram, setShowDiagram] = useState(true);
    const [p5DrawData, setP5DrawData] = useState({});
    const [name, setname] = useState("");
    const [noti, setnoti] = useState();

    const onPrintEl = () => {
        diagramref.current.consoleState();
    };
    const onPost = () => {
        diagramref.current.post(name);
    };
    const load = () => {
        setnoti(diagramref.current.load(name));
    };
    const onCompile = () => {
        let numCircle, numRectangle, numTriangle;
        numCircle = numRectangle = numTriangle = 0;
        const listOfNodeObjects = diagramref.current.returnState();
        for (let idx in listOfNodeObjects) {
            let label = listOfNodeObjects[idx].data.label;
            if (label == "circle node") {
                numCircle++;
            } else if (label == "rectangle node") {
                numRectangle++;
            }
        }
        setP5DrawData({ cir: numCircle, rect: numRectangle });
        setShowDiagram(false);
    };
    function changeName(dname) {
        setname(dname.target.value);
        // console.log(name);
    }
    return (
        <div>
            {showDiagram ? <DnDFlow ref={diagramref} /> : null}
            {showDiagram ? null : <P5 drawData={p5DrawData} />}
            <Sidebar />
            <button onClick={onPrintEl}>Log Element</button>
            <button onClick={onCompile}>Compile !</button>
            <button onClick={onPost}>save to {name}</button>
            <button onClick={load}>load {name}</button>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={changeName}
                />
            </label>
            <p>{name}</p>
        </div>
    );
}
