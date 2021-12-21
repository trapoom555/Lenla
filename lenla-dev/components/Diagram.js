import ReactFlow, {
    addEdge,
    Background,
    removeElements,
} from "react-flow-renderer";
import ConstantBlock from "../blocks/blk_constant";
import GaugeBlock from "../blocks/blk_gauge";
import PlusBlock from "../blocks/blk_plus";
import { TestBlock } from "../blocks/test_block";
import { BLOCK_TYPE } from "../block_system/stringConfig";
import { BasicBlock } from "../blocks/base_block";
const nodeTypes = {
    [BLOCK_TYPE.IN_CONSTANT]: BasicBlock,
    [BLOCK_TYPE.OP_SUM]: BasicBlock,
    [BLOCK_TYPE.OP_ADD]: BasicBlock,
    [BLOCK_TYPE.OUT_NUMBER_DISPLAY]: BasicBlock,
    [BLOCK_TYPE.Test_OP]: BasicBlock,
    [BLOCK_TYPE.IN_VECTOR_2D]: BasicBlock,
    [BLOCK_TYPE.OUT_BOOLEAN_DISPLAY]: BasicBlock,
    [BLOCK_TYPE.CON_GREATER]: BasicBlock,
};

const Diagram = (props) => {
    const { elements, setElements, setSelectedElement } = props;

    const onElementClick = (event, element) => {
        // console.log("click", element.id);
        setSelectedElement(element.id);
    };
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onConnect = (params) => {
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
        } else {
            console.log("Wrong Connection");
        }
    };
    console.log("draw diagram");
    return (
        <div style={{ height: 650, width: 1000 }}>
            {/* <ReactFlowProvider> */}
            <ReactFlow
                snapToGrid={true}
                snapGrid={[10, 10]}
                elements={elements}
                nodeTypes={nodeTypes}
                onElementsRemove={onElementsRemove}
                onElementClick={onElementClick}
                onConnect={onConnect}
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
