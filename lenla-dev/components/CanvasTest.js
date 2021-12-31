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

let isRun = false;
class eSus {
    constructor(x, y, r, count) {
        // this.p5 = p5
        this.x = x;
        this.y = y;
        this.r = r;
        this.count = count;
        this.color = "#FFFF00";
    }

    mouseOver(p5) {
        let xDiff = p5.mouseX - this.x;
        let yDiff = p5.mouseY - this.y;
        let distance = p5.sqrt(xDiff * xDiff + yDiff * yDiff);
        // print(distance);
        return distance <= this.r;
    }

    draw(p5) {
        p5.fill(this.color);
        p5.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}
let a = new eSus(50, 50, 35, 0);
let eSusList = [a];
let count = 1;
export default forwardRef((props, ref) => {
    const {width, height} = props;
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(width, height).parent(canvasParentRef);
    };
    

    useImperativeHandle(ref, () => ({
        setX(val) {
            eSusList.forEach((element) => {
                element.x = val;
            });
        },

        run(state) {
            isRun = state;
        },

        create() {
            eSusList.push(new eSus(50, 50 + count * 70, 35, count));
            count++;
        },
        clear() {
            eSusList = [];
            count = 0;
            props.selectCallBack(-1, "#FFFFFF");
        },
    }));

    function mouseOver(p5, mx, my, radius) {
        let xDiff = p5.mouseX - mx;
        let yDiff = p5.mouseY - my;
        let distance = p5.sqrt(xDiff * xDiff + yDiff * yDiff);
        // print(distance);
        return distance <= radius;
    }

    const draw = (p5) => {
        p5.resizeCanvas(width, height);
        p5.background(225);

        // a.draw(p5)
        eSusList.forEach((element) => {
            element.draw(p5);
            if (isRun) {
                element.x++;
            }
            if (element.mouseOver(p5)) {
                if (p5.mouseIsPressed) {
                    props.selectCallBack(element.count, element.color);
                }
            }
            if (props.selector == element.count) {
                element.color = props.color;
            }
        });

        // x++;
        // x++;
    };

    // Will only render on client-side
    return <Sketch setup={setup} draw={draw} />;
});
