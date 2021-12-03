import React, {useRef, forwardRef, useImperativeHandle } from "react";
import dynamic from 'next/dynamic'
// Will only import `react-p5` on client-side



const hi = forwardRef((props, ref) => {

    const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
        ssr: false,
      })

    const {drawData} = props
    
    const circleSetup = [];
    const rectSetup = [];
    const triSetup = [];


    var domElement = useRef();

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        // Setup
        for(let i = 0; i < drawData.cir; i++){
            circleSetup.push({pos : [p5.random(50, window.innerWidth - 50), p5.random(50, window.innerHeight - 50), p5.random(60, 200)],
            color : [p5.random(10,255),p5.random(10,255),p5.random(10,255)]} );
        }
        for(let i = 0; i < drawData.rect; i++){
            rectSetup.push({pos : [p5.random(50, window.innerWidth - 50), p5.random(50, window.innerHeight - 50), p5.random(60, 200)],
            color : [p5.random(10,255),p5.random(10,255),p5.random(10,255)], angle : p5.random(2*p5.PI), rotateSpeed : p5.random(0.005, 0.05)} );
        }
    };
    
    const draw = (p5) => {
        p5.background(0)
        for(let i = 0; i < drawData.cir; i++){
            let pos = circleSetup[i].pos
            let color = circleSetup[i].color
            p5.noStroke()
            p5.fill(color[0], color[1], color[2])
            p5.circle(pos[0], pos[1], pos[2])
        }

        for(let i = 0; i < drawData.rect; i++){
            p5.push();
            let pos = rectSetup[i].pos
            let color = rectSetup[i].color
            let angle = rectSetup[i].angle
            let rotateSpeed = rectSetup[i].rotateSpeed
            p5.rectMode(p5.CENTER)
            p5.noStroke()
            p5.fill(color[0], color[1], color[2])
            p5.translate(pos[0], pos[1])
            p5.rotate(angle)
            p5.square(0, 0, pos[2])
            rectSetup[i].angle += rotateSpeed;
            p5.pop();
        }
    };

// Will only render on client-side

return <Sketch setup={setup} draw={draw} ref={domElement} />;

})

export default hi