import ConstantInspector from "../inspectors/insp_constant";
import * as Block from "../block_system/systemObj";
import { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import { INS_DISPLAY_TYPE } from "../block_system/stringConfig";

function DiatailInspect(props) {
    console.log("drawDetail");
    const elements = props.elements;
    const setElements = props.setElements;
    // var index = array.findIndex((x) => x.id === id);
    function updateElementById(id, newElementVal) {
        let items = [...elements];
        const index = elements.findIndex((x) => x.id === id);
        items[index] = newElementVal;
        setElements(items);
    }
    if (props.id != -1) {
        const element = elements[elements.findIndex((x) => x.id === props.id)];
        const config = Block.blockConfig(element.type);
        const [portOption, setportOption] = useState("");

        if (config.choice) {
            const options = config.choice;
            const defaultOption = options[0];
        }
        // console.log(element.data.info);
        let compList = [];
        let i = 0;
        for (i = 0; i < element.data.info.length; i++) {
            let each = element.data.info[i];
            // console.log(i);
            if (each.type == INS_DISPLAY_TYPE.INPUT_NUM) {
                let tmp = each.value;
                compList.push(
                    <>
                        <>{each.name} </>
                        {/* {Form(each, element)} */}
                        <input
                            type="number"
                            value={tmp}
                            // onChange={(val) => {
                            //     each.val = val.target.value;
                            //     console.log(111);
                            // }}
                            // onBlur={(inputVal) => {
                            //     console.log(555);
                            //     const val = inputVal.target.value;
                            //     console.log(each.index);
                            //     element.data.info[each.index].value = val;
                            //     let tmp = {
                            //         ...element,
                            //         info: {
                            //             ...element.info,
                            //             data: element.data.info,
                            //         },
                            //     };
                            //     updateElementById(element.id, tmp);
                            // }}
                            onChange={(inputVal) => {
                                const val = inputVal.target.value;
                                console.log(each.index);
                                element.data.info[each.index].value = val;
                                let tmp = {
                                    ...element,
                                    info: {
                                        ...element.info,
                                        data: element.data.info,
                                    },
                                };
                                updateElementById(element.id, tmp);
                            }}
                        ></input>
                    </>
                );
            }
        }
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
                {(config.limitIn[1] > element.data.port.in.length ||
                    config.limitIn[1] == "inf") && (
                    <>
                        <Dropdown
                            options={options}
                            onChange={(value) => {
                                console.log(value);
                            }}
                            value={defaultOption}
                            placeholder="Select an option"
                            arrowClosed={<span className="arrow-closed" />}
                            arrowOpen={<span className="arrow-open" />}
                        />
                        <button
                            onClick={() => {
                                // setshowPortOption(true);
                                console.log("show option");
                            }}
                        >
                            add port
                        </button>
                    </>
                )}

                {/* {showPortOption && <></>} */}
            </div>
        );
    }

    return (
        <>
            <p>non of block is selected</p>
        </>
    );
}
export default function Inspector(props) {
    console.log("draw inspector");
    const { elements, setElements, selectedElementId } = props;

    return (
        <>
            <div className="inspector">
                <div className="inspector_nav">
                    <div>Object</div>
                    <div>Inspector</div>
                </div>
                <DiatailInspect
                    id={selectedElementId}
                    elements={elements}
                    setElements={setElements}
                />

                {/* <ConstantInspector
                    elements={elements}
                    setElements={setElements}
                /> */}
            </div>
        </>
    );
}
