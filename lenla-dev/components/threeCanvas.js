import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { isDisplayable } from "../block_system/block_behavior";
import { CANVAS_DISPLAY_TYPE } from "../block_system/stringConfig";
function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01));
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
    );
}

export default function ThreeCanvas(props) {
    const { width, height, system, setSystem } = props;
    const tmp = [
        <Box position={[-1.2, 0, 0]} />,
        <Box position={[-1.2, 1, 0]} />,
    ];
    let displayObj = [];
    system.childNode.forEach((node) => {
        if (isDisplayable(node)) {
            // node.update();
            const tmp = node.getDisplayData();

            try {
                switch (tmp.type) {
                    case CANVAS_DISPLAY_TYPE.OUT_STR:
                        console.log("Hey:" + tmp.color);
                        displayObj.push(
                            <Text
                                scale={[5, 5, 10]}
                                color={tmp.color} // default
                                anchorX={-tmp.position.x / 10}
                                anchorY={tmp.position.y / 10}
                                position={(-1.2, 1, 0)}
                            >
                                {tmp.value}
                            </Text>
                        );
                        break;

                    case CANVAS_DISPLAY_TYPE.IN_SLIDE:
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
    return (
        <div style={{ width: width, height: height }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                {/* {tmp} */}
                {displayObj}
            </Canvas>
        </div>
    );
}
