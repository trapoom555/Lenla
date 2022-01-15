import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { isDisplayable } from "../block_system/block_behavior";
import { CANVAS_DISPLAY_TYPE } from "../block_system/stringConfig";
import { Signal } from "../block_system/object";
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
function TextDisplay(props) {
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
function Button(props) {
    const { node, tmp, isRun, callBack } = props;
    // if (!isRun) {
    //     node.setState(tmp.init);
    //     callBack();
    // }
    return (
        <mesh
            {...props}
            onClick={(event) => {
                if (isRun == 1) {
                    node.setState(!node.state);
                    callBack();
                }
            }}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={node.state ? tmp.on_color : tmp.off_color}
                // color={node.state ? "green" : "gray"}
            />
        </mesh>
    );
}

export default function ThreeCanvas(props) {
    const { width, height, system, isRun, callBack } = props;
    const tmp = [
        <Box position={[-1.2, 0, 0]} />,
        <Box position={[-1.2, 1, 0]} />,
    ];
    // for (let i = 0; i < 100; i++) {
    //     tmp.push(<Box position={[0, i / 20, 0]} />);
    // }
    let displayObj = [];
    // useFrame((state, delta) => (ref.current.rotation.x += 0.01));
    system.childNode.forEach((node) => {
        if (isDisplayable(node)) {
            // node.update();
            const tmp = node.getDisplayData();
            // const [state, setstate] = useState(initialState);
            try {
                switch (tmp.type) {
                    case CANVAS_DISPLAY_TYPE.OUT_STR:
                        console.log("Hey:" + tmp);
                        console.log(node.value);
                        displayObj.push(
                            <Text
                                scale={[5, 5, 10]}
                                color={tmp.color} // default
                                anchorX={-tmp.position.x / 10}
                                anchorY={tmp.position.y / 10}
                                position={(-1.2, 1, 0)}
                            >
                                {node.value.toString()}
                            </Text>
                        );
                        break;

                    case CANVAS_DISPLAY_TYPE.IN_BASIC_BUTTON:
                        displayObj.push(
                            <Button
                                tmp={tmp}
                                node={node}
                                position={[tmp.position.x, tmp.position.y, 0]}
                                callBack={callBack}
                                isRun={isRun}
                            ></Button>
                            // <mesh
                            //     {...props}
                            //     // ref={ref}
                            //     scale={node.state ? 1.5 : 1}
                            //     onClick={(event) => {
                            //         node.setState(!node.state);
                            //         console.log("button click");
                            //         console.log(node.state);
                            //         setSystem(system);
                            //     }}
                            //     // onPointerOver={(event) => hover(true)}
                            //     // onPointerOut={(event) => hover(false)}
                            // >
                            //     <boxGeometry args={[1, 1, 1]} />
                            //     <meshStandardMaterial
                            //         color={
                            //             node.state
                            //                 ? tmp.on_color
                            //                 : tmp.off_color
                            //         }
                            //     />
                            // </mesh>
                        );
                        break;
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
    return (
        <div style={{ width: width, height: height }}>
            <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
                <ambientLight intensity={1} />
                {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} /> */}
                {/* {tmp} */}
                {displayObj}
            </Canvas>
        </div>
    );
}
