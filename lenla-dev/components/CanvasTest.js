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
// export let ObjInCanvas = [];
export default forwardRef((props, ref) => {
    const { width, height, systemObj, animeState } = props;
    let displayObj = {};

    const setup = (p5, canvasParentRef) => {
        font = p5.loadFont("assets/SourceSansPro-Regular.otf");
        p5.createCanvas(width, height).parent(canvasParentRef);
        // textFont(font);
        p5.textSize(fontsize);
        // slider = new p5.Slider(1, 10, 5, 3);
        const slider = p5.createSlider(0, 100, 50);
        // textAlign(CENTER, CENTER);
    };
    useImperativeHandle(ref, () => ({
        createSliderObj(id, min, max, def, step = 1) {
            displayObj[id] = p5.createSlider(min, max, def, step);
        },
    }));
    function createSliderObj(p5, id, min, max, def, step = 1) {
        displayObj[id] = p5.createSlider(min, max, def, step);
    }
    function mouseOver(p5, mx, my, radius) {
        let xDiff = p5.mouseX - mx;
        let yDiff = p5.mouseY - my;
        let distance = p5.sqrt(xDiff * xDiff + yDiff * yDiff);
        // print(distance);
        return distance <= radius;
    }
    let c = 0;
    const draw = (p5) => {
        p5.resizeCanvas(width, height);
        p5.background(0);

        if (animeState == 1) {
        }
        // slider.render();
        systemObj.childNode.forEach((node) => {
            if (isDisplayable(node)) {
                // node.update();
                const tmp = node.getDisplayData();

                try {
                    switch (tmp.type) {
                        case CANVAS_DISPLAY_TYPE.OUT_STR:
                            // console.log("Wow");
                            // console.log(tmp.position);
                            p5.fill(tmp.color);
                            // p5.text(tmp.value, 100, 100);
                            p5.text(
                                tmp.value + "",
                                tmp.position.x,
                                tmp.position.y
                            );
                            // console.log("Wow " + tmp.value);
                            break;

                        case CANVAS_DISPLAY_TYPE.IN_SLIDE:
                            displayObj[id].position(
                                tmp.position.x,
                                tmp.position.y
                            );
                            node.setValue(displayObj[id].val);
                    }
                } catch (error) {
                    console.log(error);
                }
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
