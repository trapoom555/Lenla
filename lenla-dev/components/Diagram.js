import React, {useState} from 'react';
import ReactFlow, {addEdge, Background} from 'react-flow-renderer';
import ConstantBlock from '../blocks/blk_constant';
import GaugeBlock from '../blocks/blk_gauge';
import PlusBlock from '../blocks/blk_plus';


const initialElements = [
    {
        id: "1",
        type: 'blk_constant',
        position: { x: 100, y: 100 },
        data: { type : 'Constant', data: 10, portsOut : ['num']},
    },
    {
        id: "2",
        type: 'blk_constant',
        position: { x: 100, y: 100 },
        data: { type : 'Constant', data: 5, portsOut : ['num']},
    },
    {
        id: "3",
        type: 'blk_plus',
        position: { x: 100, y: 100 },
        data: {portsIn : ['num', 'num'], portsOut : ['num']},
    },
    {
        id: "4",
        type: 'blk_gauge',
        position: { x: 100, y: 100 },
        data: {portsIn : ['num']},
    },

];


const nodeTypes = {
    blk_constant: ConstantBlock,
    blk_plus: PlusBlock,
    blk_gauge: GaugeBlock,
};

const Diagram = () => {
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) => {
      console.log('on connect', params);
      if(params.sourceHandle.split[0] == params.targetHandle.split[0]){
        setElements((els) => addEdge({ ...params, type: 'smoothstep', style : {stroke: '#333'}, arrowHeadType: 'arrowclosed', animated: true}, els));
        console.log("Successfully Connected !")
      }
      else {
        console.log("Wrong Connection")
      }
    };

  return (
    <div style={{height: 650, width: 1000}}>
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

export default Diagram;