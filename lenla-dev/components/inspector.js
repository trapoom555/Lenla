import ConstantInspector from "../inspectors/insp_constant";
import * as Block from "../block_system/systemObj";
import { Children, useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import { INS_DISPLAY_TYPE } from "../block_system/stringConfig";
import { BLOCK_TYPE } from "../block_system/stringConfig";

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
        const [portIn, setportIn] = useState(
            elements[elements.findIndex((x) => x.id === props.id)].data.port.in
        );
        let element = elements[elements.findIndex((x) => x.id === props.id)];
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
            if (each.type == INS_DISPLAY_TYPE.INPUT_NUM) {
                let tmp = each.value;
                compList.push(
                    <>
                        <>{each.name} </>
                        <input
                            type="number"
                            value={tmp}
                            onChange={(inputVal) => {
                                const val = inputVal.target.value;
                                console.log(each.index);
                                element.data.info[each.index].value =
                                    parseInt(val);
                                updateElementById(element.id, element);
                            }}
                        ></input>
                    </>
                );
            }
        }
        let a = element.data.port.in;
        console.log("a" + a);

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
                {a}
                {(config.limitIn[1] > element.data.port.in.length ||
                    config.limitIn[1] == "inf") && (
                    <>
                        <Dropdown
                            options={options}
                            onChange={(value) => {
                                console.log(value);
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
                                console.log(portIn);
                                setportIn(newElement.data.port.in);

                                // let tmp = {
                                //     ...element,
                                //     data: {
                                //         ...element.data,
                                //         port:,
                                //     },
                                // };
                                // console.log(tmp);
                                updateElementById(element.id, {
                                    id: element.id,
                                    type: element.type,
                                    ...newElement,
                                });
                                // console.log(elements);
                                // updateElementById(element.id, tmp);
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



function BlockShow(props) {
    // const {allBlocks} = props;
    let allBlocks = [
        {
            groupName : "Inputs",
            blocksData : [{name:"Constant", type:BLOCK_TYPE.IN_CONSTANT}],
        },

        {
            groupName : "Operations",
            blocksData : [{name:"Sum", type:BLOCK_TYPE.OP_SUM}],
        },

        {
            groupName : "Outputs",
            blocksData : [{name:"Number Display", type: BLOCK_TYPE.OUT_NUMBER_DISPLAY}],
        },

    ];

    let divAllBlocks = [];

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };

    allBlocks.forEach(item => divAllBlocks.push(
        <div>
            <div style = {{textAlign: "left", marginBottom: "15px", marginTop: "15px", color: "#5c7ef5", fontSize: 23}}>{item.groupName}</div> 
            <div style = {{display: "flex", flexFlow: "row wrap", justifyContent: "flex-start"}}>
                {item.blocksData.map(function(i) {return(<div style = {{border: "solid #555", borderWidth: "1px", padding: "10px", borderRadius: "5px", margin: "4px"}} onDragStart={(event) => onDragStart(event, i.type)} draggable>{i.name}</div>)})}
            </div>
        </div>))
    return (
        <div style = {{marginLeft: "30px", marginRight: "30px", marginTop: "20px"}}>
            {divAllBlocks}
        </div>
    )
}







export default function Inspector(props) {
    console.log("draw inspector");
    const { elements, setElements, selectedElementId, inspectorState, setInspectorState } = props;

    return (
        <>
            <div className="inspector">
                <div className="inspector_nav">
                    <div className={inspectorState == 0? "inspector_selector inspector_selected" : "inspector_selector"} onClick={() => {setInspectorState(0)}}>Object</div>
                    <div className={inspectorState == 1? "inspector_selector inspector_selected" : "inspector_selector"} onClick={() => {setInspectorState(1)}}>Inspector</div>
                </div>

                <div style= {{display: inspectorState ? '' : 'none'}}>
                    <DiatailInspect
                        id={selectedElementId}
                        elements={elements}
                        setElements={setElements}
                    />
                </div>

                <div style= {{display: inspectorState ? 'none' : ''}}>
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
