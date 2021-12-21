export default function Selector(props) {
  const {displayState, setDisplayState} = props;
    return (
      <div className = "selectorWrapper">
        <button className = {displayState == 0 ? 'selector selected' : 'selector'} onClick={() => setDisplayState(0)}>Diagram</button>
        <button className = {displayState == 1 ? 'selector selected' : 'selector'} onClick={() => setDisplayState(1)}>Component</button>
        <button className = {displayState == 2 ? 'selector selected' : 'selector'} onClick={() => setDisplayState(2)}>Split</button>
      </div>
    )
  }