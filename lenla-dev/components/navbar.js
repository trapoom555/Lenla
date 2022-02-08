import { useState } from "react";
import Popup from "reactjs-popup";
import { loadDiagram, loadDiagramName, saveDiagram, test } from "./API";
export default function Navbar({ user, elements, setElements }) {
    let diagramName = ["tes", "fuck"];
    let loadIndex = 0;
    // load from Database
    let diagramList = [];
    for (let i = 0; i < diagramName.length; i++) {
        diagramList.push(
            <button className="load_diagram_items">
                {diagramName[i].name}
            </button>
        );
    }
    async function setDiagramNameList() {
        diagramList = [];
        diagramName = await loadDiagramName(user.email, user.password);
        console.log(diagramName);
        for (let i = 0; i < diagramName.length; i++) {
            diagramList.push(
                <button
                    className="load_diagram_items"
                    onClick={() => {
                        // setLoadItemIdx(i)
                        loadIndex = i;
                        console.log("done select");
                    }}
                >
                    {diagramName[i].name}
                </button>
            );
        }
        console.log("load done");
    }
    setDiagramNameList();

    const [saveName, setSaveName] = useState("");
    // const [loadItemIdx, setLoadItemIdx] = useState(0);

    return (
        // <div className = "nav_bar">
        //   <div className = "left_nav_bar">
        //       <img className = "img_logo" />
        //       <ul className = "nav_bar_list">
        //           <li> File </li>
        //           <li> Edit </li>
        //           <li> View </li>
        //           <li> Help </li>
        //       </ul>
        //   </div>
        // </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light nav_bar">
            <img className="img_logo" />
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            File
                        </a>
                        <div
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <Popup
                                trigger={
                                    <button class="dropdown-item"> Save</button>
                                }
                                position="right center"
                                modal={true}
                            >
                                <div className="modal_wrapper">
                                    <div className="save_diagram_header">
                                        Save Diagram
                                    </div>
                                    <input
                                        className="save_diagram_input"
                                        value={saveName}
                                        placeholder="Name"
                                        onChange={(e) => {
                                            setSaveName(e.currentTarget.value);
                                        }}
                                    />
                                    <button
                                        className="save_diagram_button"
                                        onClick={() => {
                                            console.log(user);
                                            createDiagramcreateDiagram(
                                                user.email,
                                                user.password,
                                                saveName,
                                                elements,
                                                true
                                            ); //change public value
                                            setDiagramNameList();
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </Popup>

                            <Popup
                                trigger={
                                    <button class="dropdown-item"> Load</button>
                                }
                                position="right center"
                                modal={true}
                                onClick={() => {
                                    console.log("fuck");
                                    diagramList = loadDiagramName(
                                        user.email,
                                        user.password
                                    );
                                }}
                            >
                                <div className="modal_wrapper">
                                    <div className="save_diagram_header">
                                        Load Diagram
                                    </div>
                                    <div className="all_diagram_wrapper">
                                        {diagramList}
                                    </div>
                                    <button
                                        className="load_diagram_button"
                                        onClick={async () => {
                                            // console.log()
                                            const tmp = await loadDiagram(
                                                user.email,
                                                user.password,
                                                diagramName[loadIndex].id
                                            );
                                            console.log(tmp);
                                            setElements(tmp.elements);
                                        }}
                                    >
                                        Load
                                    </button>
                                </div>
                            </Popup>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                                Trapoom
                            </a>
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a
                            class="nav-link"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Edit
                        </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a
                            class="nav-link"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            View
                        </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a
                            class="nav-link"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Help
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
