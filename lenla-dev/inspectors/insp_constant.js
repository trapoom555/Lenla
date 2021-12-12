import React, {useState, useEffect} from 'react';
export default function ConstantInspector(props) {
    const {elements, setElements} = props;
    const [stateInput, setStateInput] = useState(10);

    useEffect(() => { 
        setElements(prevState => {
            prevState[0].data.data = stateInput;
            console.log(prevState);
            return prevState
      })}, [stateInput, setElements]);

    return (
      <div className = "insp_constant">
        <div className = "insp_constant_label">Value</div>
        <input className = "insp_constant_value" type = "number" placeholder={elements[0].data.data} onChange={(e) => setStateInput(e.target.value)}/>
      </div>
    )
  }