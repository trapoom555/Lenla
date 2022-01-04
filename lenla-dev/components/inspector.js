import ConstantInspector from "../inspectors/insp_constant";
import * as Block from "../block_system/systemObj";
import { Children, useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import {
    CANVAS_DISPLAY_TYPE,
    INS_DISPLAY_TYPE,
} from "../block_system/stringConfig";
import { BLOCK_TYPE } from "../block_system/stringConfig";
import InputColor from "react-input-color";
function DiatailInspect(props) {
    // console.log("drawDetail");
    const elements = props.elements;
    const setElements = props.setElements;
    function updateElementById(id, newElementVal) {
        let items = [...elements];
        const index = elements.findIndex((x) => x.id === id);
        items[index] = newElementVal;
        setElements(items);
    }
    function pushComplist(each, compList, element, head = -1) {
        if (each.type == INS_DISPLAY_TYPE.INPUT_NUM) {
            let tmp = each.value;
            compList.push(
                <>
                    <>{each.name} </>
                    <input
                        type={CANVAS_DISPLAY_TYPE.OUT_STR}
                        value={tmp}
                        onChange={(inputVal) => {
                            const val = parseInt(inputVal.target.value);
                            val = isNaN(val) ? 0 : val;
                            if (head == -1) {
                                element.data.info[each.index].value = val;
                            } else {
                                element.data.info[head].value[each.index] = val;
                            }
                            updateElementById(element.id, element);
                        }}
                    ></input>
                </>
            );
        }
        if (each.type == INS_DISPLAY_TYPE.IN_VECTOR_2D) {
            let tmp = each.value;
            // console.log(element);
            compList.push(
                <div>
                    <>{each.name} </>
                    <br></br>
                    <>x </>
                    <input
                        type="number"
                        value={tmp.x}
                        onChange={(inputVal) => {
                            const val = inputVal.target.value;
                            if (head != -1) {
                                element.data.info[head].value[
                                    each.index
                                ].value.x = parseInt(val);
                            } else
                                element.data.info[index].value.x =
                                    parseInt(val);
                            updateElementById(element.id, element);
                        }}
                    ></input>
                    <br></br>
                    <>y </>
                    <input
                        type="number"
                        value={tmp.y}
                        onChange={(inputVal) => {
                            const val = inputVal.target.value;
                            if (head != -1) {
                                element.data.info[head].value[
                                    each.index
                                ].value.y = parseInt(val);
                            } else
                                element.data.info[index].value.y =
                                    parseInt(val);
                            updateElementById(element.id, element);
                        }}
                    ></input>
                </div>
            );
        }

        if (each.type == INS_DISPLAY_TYPE.IN_COLOR) {
            let color;
            if (head != -1) {
                color = element.data.info[head].value[each.index].value;
            } else color = element.data.info[index].value;
            if (color == null) color = "#FFFFFF";
            compList.push(
                <div>
                    <>{each.name}</>
                    <InputColor
                        initialValue={color}
                        onChange={(color) => {
                            // setColor(color);
                            if (head != -1) {
                                element.data.info[head].value[
                                    each.index
                                ].value = color.hex;
                            } else element.data.info[index].value = color.hex;
                            updateElementById(element.id, element);
                        }}
                        placement="right"
                    />
                </div>
            );
        }
    }
    if (props.id != -1) {
        try {
            const [portIn, setportIn] = useState(
                elements[elements.findIndex((x) => x.id === props.id)].data.port
                    .in
            );
            let element =
                elements[elements.findIndex((x) => x.id === props.id)];
            const config = Block.blockConfig(element.type);

            if (config.choice) {
                const options = config.choice;
                const defaultOption = options[0];
            }
            const [portChoice, setportChoice] = useState(defaultOption);
            let compList = [];
            let i = 0;
            for (i = 0; i < element.data.info.length; i++) {
                let each = element.data.info[i];
                pushComplist(each, compList, element);
                if (each.type == INS_DISPLAY_TYPE.LAYOUT_GROUP) {
                    let tmp = [];
                    each.value.forEach((subEach) => {
                        // console.log(subEach.name);
                        pushComplist(subEach, tmp, element, each.index);
                    });
                    compList.push(
                        <div style={{ border: "1px solid rgb(0, 0, 0)" }}>
                            <div style={{}}>{each.name}</div>
                            {tmp}
                        </div>
                    );
                }
            }
            let a = element.data.port.in;
            // console.log("a" + a);
            return (
                <div
                    style={{
                        fontSize: 20,
                    }}
                >
                    <p>id: {element.id}</p>
                    <p>type: {element.type}</p>
                    <p>port: {element.type}</p>
                    {compList}

                    {config.limitIn[0] < element.data.port.in.length && (
                        <button>delete</button>
                    )}
                    {/* {a} */}
                    {(config.limitIn[1] > element.data.port.in.length ||
                        config.limitIn[1] == "inf") && (
                        <>
                            <Dropdown
                                options={options}
                                onChange={(value) => {
                                    // console.log(value);
                                    setportChoice(value.value);
                                }}
                                value={defaultOption}
                                placeholder="Select an option"
                                arrowClosed={<span className="arrow-closed" />}
                                arrowOpen={<span className="arrow-open" />}
                            />
                            <button
                                onClick={() => {
                                    // setshowPortOption(true)element;
                                    let newElement = {
                                        ...element,
                                    };
                                    newElement.data.port.in.push(portChoice);
                                    newElement.data.port.inEnable.push(true);
                                    // console.log(portIn);
                                    setportIn(newElement.data.port.in);

                                    updateElementById(element.id, {
                                        id: element.id,
                                        type: element.type,
                                        ...newElement,
                                    });
                                }}
                            >
                                add port
                            </button>
                        </>
                    )}

                    {/* {showPortOption && <></>} */}
                </div>
            );
        } catch {
            // [Ignore] Error from non Sync life cycle
        }
    }
    return (
        <>
            <p>non of block is selected</p>
        </>
    );
}

function BlockShow(props) {
    // const {allBlocks} = props;
    let allBlocks = [
        {
            groupName: "Inputs",
            blocksData: [{ name: "Constant", type: BLOCK_TYPE.IN_CONSTANT }],
        },

        {
            groupName: "Operations",
            blocksData: [{ name: "Sum", type: BLOCK_TYPE.OP_SUM }],
        },

        {
            groupName: "Outputs",
            blocksData: [
                { name: "Number Display", type: BLOCK_TYPE.OUT_NUMBER_DISPLAY },
            ],
        },
    ];

    let divAllBlocks = [];

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    allBlocks.forEach((item) =>
        divAllBlocks.push(
            <div>
                <div
                    style={{
                        textAlign: "left",
                        marginBottom: "15px",
                        marginTop: "15px",
                        color: "#5c7ef5",
                        fontSize: 23,
                    }}
                >
                    {item.groupName}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "flex-start",
                    }}
                >
                    {item.blocksData.map(function (i) {
                        return (
                            <div
                                style={{
                                    border: "solid #555",
                                    borderWidth: "1px",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    margin: "4px",
                                }}
                                onDragStart={(event) =>
                                    onDragStart(event, i.type)
                                }
                                draggable
                            >
                                {i.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    );
    return (
        <div
            style={{
                marginLeft: "30px",
                marginRight: "30px",
                marginTop: "20px",
            }}
        >
            {divAllBlocks}
        </div>
    );
}

export default function Inspector(props) {
    const {
        elements,
        setElements,
        selectedElementId,
        inspectorState,
        setInspectorState,
    } = props;

    return (
        <>
            <div className="inspector">
                <div className="inspector_nav">
                    <div
                        className={
                            inspectorState == 0
                                ? "inspector_selector inspector_selected"
                                : "inspector_selector"
                        }
                        onClick={() => {
                            setInspectorState(0);
                        }}
                    >
                        Object
                    </div>
                    <div
                        className={
                            inspectorState == 1
                                ? "inspector_selector inspector_selected"
                                : "inspector_selector"
                        }
                        onClick={() => {
                            setInspectorState(1);
                        }}
                    >
                        Inspector
                    </div>
                </div>

                <div style={{ display: inspectorState ? "" : "none" }}>
                    <DiatailInspect
                        id={selectedElementId}
                        elements={elements}
                        setElements={setElements}
                    />
                </div>

                <div style={{ display: inspectorState ? "none" : "" }}>
                    <BlockShow />
                </div>

                {/* <ConstantInspector
                    elements={elements}
                    setElements={setElements}
                /> */}
            </div>
        </>
    );
}
