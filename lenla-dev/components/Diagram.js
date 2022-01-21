import ReactFlow, {
    addEdge,
    Background,
    removeElements,
    isEdge,
} from "react-flow-renderer";
import { useRef, useState } from "react";
import ConstantBlock from "../blocks/blk_constant";
import NumberDisplayBlock from "../blocks/blk_number_display";
import SumBlock from "../blocks/blk_sum";
import { TestBlock } from "../blocks/test_block";
import { BLOCK_TYPE } from "../block_system/stringConfig";
import { BasicBlock } from "../blocks/base_block";
import * as Block from "../block_system/systemObj";
import BasicButtonBlock from "../blocks/blk_basic_button";
import StringBlock from "../blocks/blk_string";
import SliderBlock from "../blocks/blk_slider";
import ProductBlock from "../blocks/blk_product";
import Sig2NumBlock from "../blocks/blk_sig2num";
import StringDisplayBlock from "../blocks/blk_string_display";
const nodeTypes = {
    [BLOCK_TYPE.IN_CONSTANT]: ConstantBlock,
    [BLOCK_TYPE.IN_STRING]: StringBlock,
    [BLOCK_TYPE.OP_SUM]: SumBlock,
    [BLOCK_TYPE.OP_PRODUCT]: ProductBlock,
    [BLOCK_TYPE.OUT_NUMBER_DISPLAY]: NumberDisplayBlock,
    [BLOCK_TYPE.Test_OP]: BasicBlock,
    [BLOCK_TYPE.IN_VECTOR_2D]: BasicBlock,
    [BLOCK_TYPE.OUT_BOOLEAN_DISPLAY]: BasicBlock,
    [BLOCK_TYPE.LOG_GREATER]: BasicBlock,
    [BLOCK_TYPE.IN_SLIDER]: SliderBlock,
    [BLOCK_TYPE.IN_BASIC_BUTTON]: BasicButtonBlock,
    [BLOCK_TYPE.CON_SIG2NUM]: Sig2NumBlock,
    [BLOCK_TYPE.OUT_STRING_DISPLAY]: StringDisplayBlock,
};

let currentBlockID = 0;
const getID = () => `${currentBlockID++}`;

const Diagram = (props) => {
    const { width, height, compileAll } = props;
    const { elements, setElements, setSelectedElement, setInspectorState } =
        props;
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds =
            reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");

        const currentID = getID();
        console.log(currentID);
        let data = {};
        if (type == BLOCK_TYPE.IN_CONSTANT) data = { data: 0 };
        const newNode = Block.createElementObj(
            currentID,
            type,

            reactFlowInstance.project(
                {
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                },
                data
            )
        );

        // TO DO:
        // create element in p5.js
        setElements(elements.concat(newNode));
        // system.add_element(newNode);
        console.log(elements);

        console.log("before setup");
        compileAll();
        console.log(elements);
    };

    const onElementClick = (event, element) => {
        console.log("click", element.id);
        setSelectedElement(element.id);
        setInspectorState(1);
        // console.log(element.id);
    };

    const onPaneClick = (event) => {
        setSelectedElement(-1);
        setInspectorState(0);
    };

    const onElementsRemove = (elementsToRemove) => {
        setElements((els) => removeElements(elementsToRemove, els));
        compileAll();
    };

    const onConnect = (params) => {
        var connectedIds = elements
            .filter(function (e) {
                return isEdge(e) && e.target == params.target;
            })
            .map(function (e) {
                return e.targetHandle;
            });
        console.log("target", params.targetHandle);
        if (!connectedIds.includes(params.targetHandle)) {
            if (params.sourceHandle.split[0] == params.targetHandle.split[0]) {
                // console.log("on connect", getIntFromString(params.targetHandle));
                setElements((els) =>
                    addEdge(
                        {
                            ...params,
                            type: "smoothstep",
                            style: { stroke: "#333" },
                            arrowHeadType: "arrowclosed",
                            animated: true,
                            connectionMode: "loose",
                            flag: "line",
                        },
                        els
                    )
                );
                console.log("Successfully Connected !");
                const element = elements[elements.length - 1];
                // system.set_port(
                //     element.source,
                //     element.target,
                //     getIntFromString(element.sourceHandle),
                //     getIntFromString(element.targetHandle)
                // );
                compileAll();
            } else {
                console.log("Wrong Connection");
            }
        } else {
            console.log("Many to one connection case");
        }
    };
    console.log("draw diagram");
    return (
        <div style={{ height: height, width: width }} ref={reactFlowWrapper}>
            <ReactFlow
                snapToGrid={true}
                snapGrid={[10, 10]}
                elements={elements}
                nodeTypes={nodeTypes}
                onLoad={onLoad}
                onElementsRemove={onElementsRemove}
                onElementClick={onElementClick}
                onPaneClick={onPaneClick}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                connectionLineType={"smoothstep"}
                connectionLineStyle={{ stroke: "#333" }}
                // key="edges"
            >
                <Background variant="dots" gap={10} size={0.5} />
            </ReactFlow>

            {/* </ReactFlowProvider> */}
        </div>
    );
};

export default Diagram;
