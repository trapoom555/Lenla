import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import { isDisplayable } from "../block_system/block_behavior";
import { CANVAS_DISPLAY_TYPE } from "../block_system/stringConfig";
import { Signal } from "../block_system/object";
// import ReactSlider from "react-slider";
function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01));

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
    return (
        <Text
            scale={[5, 5, 10]}
            color={tmp.color}
            // color={"#16fa62"}
            anchorX={-tmp.position.x / 10}
            anchorY={tmp.position.y / 10}
            position={(-1.2, 1, 0)}
        >
            {val.toString()}
        </Text>
    );
}
function Slider(props) {
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
    const { node, tmp, isRun, setCount, count } = props;
    const [state, setState] = useState(node.state);
    return (
        <mesh
            {...props}
            onClick={(event) => {
                if (isRun == 1) {
                    // console.log("JJJ");
                    node.setState(!node.state);
                    setState(node.state);
                    console.log(node.state);
                    setCount(count + 1);
                }
            }}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={state ? tmp.on_color : tmp.off_color}
                // color={node.state ? "green" : "gray"}
            />
        </mesh>
    );
}
const Switch = () => {
    return (
        <>
            <input
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
            />
            <label className="react-switch-label" htmlFor={`react-switch-new`}>
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};
export default function ThreeCanvas(props) {
    const { width, height, system, isRun, callBack } = props;
    const tmp = [
        <Box position={[-1.2, 0, 0]} />,
        <Box position={[-1.2, 1, 0]} />,
    ];
    const [re, setRe] = useState(0);
    // for (let i = 0; i < 100; i++) {
    //     tmp.push(<Box position={[0, i / 20, 0]} />);
    // }
    let displayObj = [];
    // useFrame((state, delta) => {
    //     let x = 4;
    // });
    // useFrame((state, delta) =>
    function createObj() {
        system.childNode.forEach((node) => {
            console.log("system update");
            if (isDisplayable(node)) {
                // node.update();
                const tmp = node.getDisplayData();
                // const [state, setstate] = useState(initialState);
                try {
                    switch (tmp.type) {
                        case CANVAS_DISPLAY_TYPE.OUT_STR:
                            console.log(tmp);
                            let val = node.value;
                            if (tmp.digit) {
                                val = val.toFixed(tmp.digit);
                            }
                            displayObj.push(
                                <Text
                                    scale={[5, 5, 10]}
                                    color={tmp.color}
                                    // color={"#16fa62"}
                                    anchorX={-tmp.position.x / 10}
                                    anchorY={tmp.position.y / 10}
                                    position={(-1.2, 1, 0)}
                                >
                                    {val.toString()}
                                </Text>
                            );
                            break;

                        case CANVAS_DISPLAY_TYPE.IN_BASIC_BUTTON:
                            console.log("Hey:" + tmp);
                            console.log(tmp);
                            displayObj.push(
                                <Button
                                    tmp={tmp}
                                    node={node}
                                    position={[
                                        tmp.position.x,
                                        tmp.position.y,
                                        0,
                                    ]}
                                    setCount={setRe}
                                    count={re}
                                    isRun={isRun}
                                ></Button>
                            );
                            break;
                    }
                } catch (error) {
                    //console.log(error);
                }
            }
        });
    }
    createObj();

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
