import { useState } from "react";
import Popup from "reactjs-popup";
import {
    loadDiagram,
    loadDiagramName,
    saveDiagram,
    test,
    createDiagram,
} from "./API";
export default function Navbar({
    user,
    elements,
    setElements,
    setDiagramName,
    setDiagramId,
    diagramId,
}) {
    // let loadIndex = 0;
    const [diagramCompList, setDiagramCompList] = useState([]);
    const [saveName, setSaveName] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [diagramList, setDiagramList] = useState([]);
    const [loadIndex, setLoadIndex] = useState(-1);
    async function setDiagramNameList() {
        diagramCompList = [];
        const diagramList = await loadDiagramName(user.email, user.password);
        // setDiagramName();
        console.log(diagramList);
        for (let i = 0; i < diagramList.length; i++) {
            diagramCompList.push(
                <button
                    className="load_diagram_items"
                    onClick={() => {
                        // setLoadItemIdx(i)
                        setLoadIndex(i);
                        console.log("done select " + i);
                    }}
                >
                    {diagramList[i].name}
                </button>
            );
        }
        setDiagramCompList(diagramCompList);
        setDiagramList(diagramList);
    }
    // setDiagramNameList();

    // const [loadItemIdx, setLoadItemIdx] = useState(0);

    function handleIsPublic(event) {
        // console.log(event.target.value);
        setIsPublic((prev) => !prev);
    }

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
                            <button
                                class="dropdown-item"
                                href="#"
                                onClick={() => {
                                    setElements([]);
                                    setDiagramId("");
                                    setDiagramName("untitle");
                                }}
                            >
                                New
                            </button>

                            <Popup
                                trigger={
                                    <button class="dropdown-item"> Load</button>
                                }
                                position="right center"
                                modal={true}
                                onOpen={async () => {
                                    await setDiagramNameList();
                                }}
                            >
                                <div className="modal_wrapper">
                                    <div className="save_diagram_header">
                                        Load Diagram
                                    </div>
                                    <div className="all_diagram_wrapper">
                                        {diagramCompList}
                                    </div>
                                    <button
                                        className="load_diagram_button"
                                        onClick={async () => {
                                            console.log(
                                                diagramList[loadIndex].id +
                                                    " " +
                                                    loadIndex
                                            );
                                            const tmp = await loadDiagram(
                                                user.email,
                                                user.password,
                                                diagramList[loadIndex].id
                                            );
                                            console.log(tmp);
                                            setDiagramId(
                                                diagramList[loadIndex].id
                                            );
                                            console.log(
                                                "set diagram id " + diagramId
                                            );
                                            console.log(diagramId);
                                            console.log(diagramList);
                                            setElements(tmp.elements);
                                            setDiagramName(tmp.name);
                                        }}
                                    >
                                        Load
                                    </button>
                                </div>
                            </Popup>
                            {/* <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                                Trapoom
                            </a> */}
                            <Popup
                                trigger={
                                    <button class="dropdown-item"> Save</button>
                                }
                                position="right center"
                                modal={true}
                                disabled={false} //ใส่ condition ตรงนี้
                                onOpen={() => {
                                    console.log("save");
                                }}
                            >
                                {/* if diagramId != "" save else create */}
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
                                    <div className="is_public_wrapper">
                                        <input
                                            className="is_public_checkbox"
                                            type="checkbox"
                                            // value={isPublic}
                                            checked={isPublic}
                                            onChange={handleIsPublic}
                                        />{" "}
                                        <div className="is_public_text">
                                            Public
                                        </div>
                                    </div>
                                    <div className="description_wrapper">
                                        <div className="description_header">
                                            {" "}
                                            Description{" "}
                                        </div>
                                        <textarea
                                            placeholder="Description"
                                            className="description_input"
                                        />
                                    </div>

                                    <button
                                        className="save_diagram_button"
                                        onClick={() => {
                                            console.log(user);
                                            createDiagram(
                                                user.email,
                                                user.password,
                                                saveName,
                                                elements,
                                                true
                                            ); //change public value
                                            setDiagramName(saveName);
                                            close();
                                            console.log("close");
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </Popup>

                            <Popup
                                trigger={
                                    <button class="dropdown-item">
                                        {" "}
                                        Save As
                                    </button>
                                }
                                position="right center"
                                modal={true}
                                disabled={false} //ใส่ condition ตรงนี้
                            >
                                {/* if diagramId != "" save else create */}
                                <div className="modal_wrapper">
                                    <div className="save_diagram_header">
                                        Save Diagram As
                                    </div>
                                    <input
                                        className="save_diagram_input"
                                        value={saveName}
                                        placeholder="Name"
                                        onChange={(e) => {
                                            setSaveName(e.currentTarget.value);
                                        }}
                                    />
                                    <div className="is_public_wrapper">
                                        <input
                                            className="is_public_checkbox"
                                            type="checkbox"
                                        />{" "}
                                        <div className="is_public_text">
                                            Public
                                        </div>
                                    </div>
                                    <div className="description_wrapper">
                                        <div className="description_header">
                                            {" "}
                                            Description{" "}
                                        </div>
                                        <textarea
                                            placeholder="Description"
                                            className="description_input"
                                        />
                                    </div>

                                    <button
                                        className="save_diagram_button"
                                        onClick={() => {
                                            console.log(user);
                                            createDiagram(
                                                user.email,
                                                user.password,
                                                saveName,
                                                elements,
                                                true
                                            ); //change public value
                                            setDiagramName(saveName);
                                        }}
                                    >
                                        Save As
                                    </button>
                                </div>
                            </Popup>
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
                        <div
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <Popup
                                trigger={
                                    <button class="dropdown-item"> Edit</button>
                                }
                                position="right center"
                                modal={true}
                                disabled={false} //ใส่ condition ตรงนี้
                            >
                                {/* if diagramId != "" save else create */}
                                <div className="modal_wrapper">
                                    <div className="save_diagram_header">
                                        Edit Diagram
                                    </div>
                                    <input
                                        className="save_diagram_input"
                                        value={saveName}
                                        placeholder="Name"
                                        onChange={(e) => {
                                            setSaveName(e.currentTarget.value);
                                        }}
                                    />
                                    <div className="is_public_wrapper">
                                        <input
                                            className="is_public_checkbox"
                                            type="checkbox"
                                            checked={isPublic}
                                            // value={isPublic}
                                            onClick={handleIsPublic}
                                        />{" "}
                                        <div className="is_public_text">
                                            Public
                                        </div>
                                    </div>
                                    <div className="description_wrapper">
                                        <div className="description_header">
                                            {" "}
                                            Description{" "}
                                        </div>
                                        <textarea
                                            placeholder="Description"
                                            className="description_input"
                                        />
                                    </div>

                                    <button
                                        className="save_diagram_button"
                                        onClick={() => {
                                            console.log(isPublic);
                                            saveDiagram(
                                                user.email,
                                                user.password,
                                                diagramId,
                                                saveName,
                                                elements,
                                                isPublic
                                            ); //change public value

                                            setDiagramName(saveName);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </Popup>
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
