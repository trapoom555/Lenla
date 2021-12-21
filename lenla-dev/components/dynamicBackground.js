import React from "react";
import dynamic from 'next/dynamic'

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

export default function DynamicBackground(props) {
	const setup = (p5, canvasParentRef) => {
		let width = window.innerWidth;
		let height = window.innerHeight;
		let canvas = p5.createCanvas(width, height);
        canvas.parent(canvasParentRef);
		
	};

	const draw = (p5) => {
		let width = window.innerWidth;
		let height = window.innerHeight;
		p5.noFill();
		p5.clear();
		p5.stroke(255)
		p5.strokeWeight(2)
		p5.circle(Math.floor(width*0.2 + 0.02*(p5.mouseX - width/2)), Math.floor(height*0.8 + 0.02*(p5.mouseY - height/2)), width*0.1);
		p5.strokeWeight(1.5)
		p5.circle(Math.floor(width*0.07 + 0.04*(p5.mouseX - width/2)), Math.floor(height*0.65 + 0.04*(p5.mouseY - height/2)), width*0.06);
		p5.strokeWeight(0.5)
		p5.circle(Math.floor(width*0.15 + 0.06*(p5.mouseX - width/2)), Math.floor(height*0.45 + 0.06*(p5.mouseY - height/2)), width*0.035);

		p5.strokeWeight(3)
		p5.circle(Math.floor(width*0.8 + 0.02*(p5.mouseX - width/2)), Math.floor(height*0.3 + 0.02*(p5.mouseY - height/2)), width*0.11);
		p5.strokeWeight(1.5)
		p5.circle(Math.floor(width*0.9 + 0.045*(p5.mouseX - width/2)), Math.floor(height*0.55 + 0.045*(p5.mouseY - height/2)), width*0.04);
		p5.strokeWeight(0.5)
		p5.circle(Math.floor(width*0.8 + 0.07*(p5.mouseX - width/2)), Math.floor(height*0.65 + 0.07*(p5.mouseY - height/2)), width*0.023);
		
	};

	return <Sketch style={{position: "absolute", left: "0px", top: "0px", zIndex: "-1"}} setup={setup} draw={draw} />;
};