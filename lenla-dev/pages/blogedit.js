import dynamic from "next/dynamic";
import { useState } from "react";
import Popup from "reactjs-popup";
import Profile from "../components/profile";
import useWindowDimensions from "../hook/useWindowDimensions";
import ThreeCanvas from "../components/threeCanvas";
import {
    createBlog,
    getUserBySet,
    loadDiagram,
    loadDiagramName,
    saveBlog,
} from "../components/API";
import * as Block from "../block_system/systemObj";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote", { color: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
];
function getIntFromString(str) {
    let n = str.length;
    let run = n - 1;
    let val = Number(str.slice(run, n));
    if (!val) return 0;
    while (val) {
        run -= 1;
        val = Number(str.slice(run, n));
    }
    return Number(str.slice(run + 1, n));
}
function compileAll(elements) {
    let system = new Block.System();
    elements.forEach((element) => {
        if (element.flag == "node") {
            system.add_element(element);
        }
        if (element.flag == "line") {
            system.set_port(
                element.source,
                element.target,
                getIntFromString(element.sourceHandle),
                getIntFromString(element.targetHandle)
            );
        }
    });

    // setSystem(system);
    system.compile();
    return system;
}
function BlogComponent(props) {
    const [quillContent, setQuillContent] = useState("");
    const [diagramCompList, setDiagramCompList] = useState([]);
    const [diagramList, setDiagramList] = useState([]);
    const { sectionList, setSectionList, width, user } = props;
    const [loadIndex, setLoadIndex] = useState(-1);
    const [elements, setElements] = useState([]);
    const [system, setSystem] = useState(null);
    const [page, setPage] = useState([]);
    async function setDiagramNameList(user) {
        diagramCompList = [];
        console.log(user);
        diagramList = await loadDiagramName(user.email, user.password);
        // setDiagramName();
        console.log(diagramList);
        for (let i = 0; i < diagramList.length; i++) {
            diagramCompList.push(
                <button
                    className="load_diagram_items"
                    onClick={() => {
                        // setLoadItemIdx(i)
                        setLoadIndex(i);
                        // loadIndex = i;
                        console.log("done select " + i);
                    }}
                >
                    {diagramList[i].name}
                </button>
            );
        }
        setDiagramCompList(diagramCompList);
        setDiagramList(diagramList);
    }
    async function insertComponent() {
        const tmp = await loadDiagram(
            user.email,
            user.password,
            diagramList[loadIndex].id
        );
        elements = tmp.elements;
        setElements(tmp.elements);
        console.log("ele");
        console.log(tmp.elements);
        system = compileAll(elements);
        setSystem(system);
        setPage([...page, { type: "elements", value: elements }]);
        setSectionList((prevSectionList) => [
            ...prevSectionList,
            <ThreeCanvas
                width={Math.floor(0.5 * width)}
                height={0.5 * width}
                system={system} // ต้อง Define
                setSystem={setSystem} // ต้อง Define
                isRun={1}
            />,
            <BlogComponent
                sectionList={sectionList}
                setSectionList={setSectionList}
                user={user}
                width={width}
            />,
        ]);
        console.log("sectionList");
        console.log(sectionList);
    }

    return (
        <>
            <QuillNoSSRWrapper
                modules={modules}
                formats={formats}
                value={quillContent}
                onChange={(p) => {
                    console.log(p);
                    setQuillContent(p);
                }}
                theme="snow"
            />

            <Popup
                trigger={
                    <div className="blog_edit_section_break">
                        <button className="blog_edit_insert_btn">
                            + Interactive Media
                        </button>
                    </div>
                }
                position="right center"
                modal={true}
                onOpen={() => {
                    setDiagramNameList(user);
                }}
            >
                <div className="modal_wrapper">
                    <div className="save_diagram_header">Load Diagram</div>
                    <div className="all_diagram_wrapper">{diagramCompList}</div>
                    <button
                        className="load_diagram_button"
                        onClick={insertComponent}
                    >
                        Load
                    </button>
                </div>
            </Popup>
        </>
    );
}

export default function BlogEdit({ user, setUser }) {
    const [sectionList, setSectionList] = useState([]);

    const { height, width } = useWindowDimensions();
    const [blogName, setBlogName] = useState("untitle");
    const [blogId, setBlogId] = useState("");
    console.log(user);
    if (!user._id) {
        getUserBySet(setUser);
    }
    return (
        <div className="blog_edit_wrapper">
            <div className="nav_bar_blog_edit">
                <img className="img_logo" />
                <input
                    className="blog_edit_name"
                    placeholder="My Blog Name"
                    value={blogName}
                    onChange={(event) => {
                        setBlogName(event.target.value);
                    }}
                />
                <button
                    className="blog_edit_button"
                    onClick={async () => {
                        if (blogId == "") {
                            const id = await createBlog(
                                user.email,
                                user.password,
                                blogName,
                                [sectionList],
                                true, //add public
                                "11/02/2022" //add date
                            );
                            setBlogId(id);
                        } else {
                            saveBlog(
                                user.email,
                                user.password,
                                blogId,
                                blogName,
                                [sectionList],
                                true, //add public
                                "11/02/2022"
                            );
                        }
                    }}
                >
                    Save
                </button>
                <Profile name={user.username} url={user.profileImage} />
            </div>

            {/* <QuillNoSSRWrapper
                modules={{"toolbar": false}}
                value={quillContent}
                readOnly={true}
                theme={"snow"}
            /> */}
            {/* {sectionList} */}
            <BlogComponent
                sectionList={sectionList}
                setSectionList={setSectionList}
                width={width}
                user={user}
            />
            {sectionList}
        </div>
    );
}
