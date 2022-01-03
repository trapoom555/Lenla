import React, {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import dynamic from "next/dynamic";
import { isDisplayable } from "../block_system/block_behavior";
import { CANVAS_DISPLAY_TYPE } from "../block_system/stringConfig";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
});
let font,
    fontsize = 32;

function preload() {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
}
preload();
export default forwardRef((props, ref) => {
    const { width, height, systemObj } = props;
    let displayObj = [];
    const setup = (p5, canvasParentRef) => {
        font = p5.loadFont("assets/SourceSansPro-Regular.otf");
        p5.createCanvas(width, height).parent(canvasParentRef);
        // textFont(font);
        p5.textSize(fontsize);
        // textAlign(CENTER, CENTER);
    };
    // useImperativeHandle(ref, () => ({
    //     setX() {
    //         x = 100;
    //         console.log(x);
    //     },
    // }));
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
        //
        systemObj.childNode.forEach((node) => {
            // console.log(systemObj.childNode);
            if (isDisplayable(node)) {
                node.update();
                const tmp = node.getDisplayData();
                // console.log(tmp);
                try {
                    switch (tmp.type) {
                        case CANVAS_DISPLAY_TYPE.OUT_STR:
                            //
                            p5.fill(tmp.color);
                            // p5.text(tmp.value, 100, 100);
                            p5.text(
                                tmp.value + "",
                                tmp.position.x,
                                tmp.position.y
                            );
                            break;

                        // case CANVAS_DISPLAY_TYPE.IN_SLIDE:
                    }
                } catch {}
                // console.log(node.type + " is displayable");
            }
        });
        // elements.forEach((element) => {
        //     if (element.display) {
        //         // console.log(element.display);
        //     }
        // });
    };

    // Will only render on client-side
    return <Sketch setup={setup} draw={draw} />;
});
