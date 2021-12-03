import React, {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
} from "react-flow-renderer";
import { useRouter } from "next/router";

// import axios from "axios";
// import './dnd.css';
// import fetch from "isomorphic-unfetch";
// const Domain = "http://lenla-back-end.vercel.app";
// const Domain = "";
const Domain = "https://lenla-backend.herokuapp.com";
const initialElements = [
    {
        id: "1",
        type: "input",
        data: { label: "circle node" },
        position: { x: 250, y: 5 },
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const hi = forwardRef((props, ref) => {
    var domElement = useRef();
    const router = useRouter();
    useImperativeHandle(ref, () => ({
        consoleState() {
            console.log(elements);
        },

        returnState() {
            return elements;
        },

        async post(name) {
            // axios
            //     .post(Domain + "/api/diagram?name=" + name, {
            //         id: name,
            //         name,
            //         elements,
            //     })
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
            try {
                const res = await fetch(Domain + "/diagram?name=" + name, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });
                // router.push("/");
            } catch (error) {
                console.log(error);
            }
            try {
                const res = await fetch(Domain + "/diagram/", {
                    // mode: "no-cors",
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: name, name, elements }),
                });
                router.push("/back-end-test");
                console.log("post");
                // console.log(res);
            } catch (error) {
                // console.log(res);
                console.log(error);
            }
            // elements.forEach(async (element) => {

            // });
        },
        async load(name) {
            const res = await fetch(Domain + "/diagram?name=" + name);
            const data = await res.json();
            // console.log(await res.json());
            try {
                setElements(data[0].elements);
            } catch (error) {
                console.log(
                    `load ${data} error at ${Domain + "/diagram?name=" + name}`
                );
                return "not have diagram name " + name;
            }
            console.log("load");
            router.push("/back-end-test");
            // id = data[0].elements.length;
            // console.log(`load ${name}`);
        },
    }));

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds =
            reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
            id: getId(),

            type,
            position,
            data: {
                label: `${type} node`
                    .replace("input", "circle")
                    .replace("default", "rectangle")
                    .replace("output", "triangle"),
            },
        };

        setElements((es) => es.concat(newNode));
    };

    return (
        <div className="dndflow" ref={domElement}>
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        style={{ height: 500 }}
                    >
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
});

export default hi;
export async function getStaticProps(context) {
    const res = await fetch(`https://.../data`);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { data }, // will be passed to the page component as props
    };
}
