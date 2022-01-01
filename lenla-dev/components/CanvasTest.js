import React, {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
});

export default forwardRef((props, ref) => {
    const {width, height} = props;
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(width, height).parent(canvasParentRef);
    };
    
    function mouseOver(p5, mx, my, radius) {
        let xDiff = p5.mouseX - mx;
        let yDiff = p5.mouseY - my;
        let distance = p5.sqrt(xDiff * xDiff + yDiff * yDiff);
        // print(distance);
        return distance <= radius;
    }

    const draw = (p5) => {
        p5.resizeCanvas(width, height);
        p5.background(0);
    };

    // Will only render on client-side
    return <Sketch setup={setup} draw={draw} />;
});
