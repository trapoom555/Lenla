import React, {useState} from 'react';
import ReactFlow, {addEdge, Background} from 'react-flow-renderer';
import FunctionNode from './FunctionNode';
import Graph2DNode from './Graph2DNode';
import ImageNode from './ImageNode'


const initialElements = [
  {
    id: "1",
    type: 'function_node',
    position: { x: 100, y: 100 },
    data: { type : 'Function', text: 'y = 5x + 4', portsOut : ['forA', 'forB']},
  },
  {
    id: "2",
    type: 'graph2D_node',
    position: { x: 500, y: 100 },
    data: { type : 'Graph2D', text: 'Graph1', portsIn : ['fn']},
  },
  {
    id: "3",
    type: 'image_node',
    position: { x: 500, y: 400 },
    data: { type : 'Image', text: 'TPImage', portsIn : ['img']},
  },
];


const nodeTypes = {
  function_node: FunctionNode,
  graph2D_node: Graph2DNode,
  image_node: ImageNode,
};

const CustomNodeExample = () => {
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) => {
      console.log('on connect', params);
      if(params.sourceHandle == params.targetHandle){
        setElements((els) => addEdge({ ...params, type: 'smoothstep', style : {stroke: '#333'}, arrowHeadType: 'arrowclosed', animated: true}, els));
        console.log("Successfully Connected !")
      }
      else {
        console.log("Wrong Connection")
      }
    };

  return (
    <div style={{ height: 1000}}>
      <ReactFlow
      snapToGrid={true}
      snapGrid={[10,10]}
      elements={elements} 
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      connectionLineType={'smoothstep'}
      connectionLineStyle={{stroke: '#333'}}>

        <Background
          variant="dots"
          gap={10}
          size={0.5}
        />
      </ReactFlow>
    </div>
  );
};

export default CustomNodeExample;