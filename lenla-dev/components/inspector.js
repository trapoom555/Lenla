import ConstantInspector from "../inspectors/insp_constant"
export default function Inspector(props) {
  const {elements, setElements} = props;
    return (
      <>
        <div className = "inspector">
          <div className = "inspector_nav">
            <div>Object</div>
            <div>Inspector</div>
          </div>
          <ConstantInspector elements = {elements} setElements = {setElements}/>
        </div>
      </>
    )
  }