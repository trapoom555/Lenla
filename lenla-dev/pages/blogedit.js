import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
import { compileAll } from "../block_system/systemObj";
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

function editSection() {}

function QillObj(props) {
    // const [quillContent, setQuillContent] = useState("");
    const { page, setPage, id } = props;

    return (
        <>
            {" "}
            <QuillNoSSRWrapper
                modules={modules}
                formats={formats}
                value={page[id].value}
                onChange={(p) => {
                    console.log(page);
                    page[id].value = p;
                    setPage(page);
                }}
                theme="snow"
            />
        </>
    );
}
export default function BlogEdit({ user, setUser }) {
    const [sectionList, setSectionList] = useState([]);
    const [diagramCompList, setDiagramCompList] = useState([]);
    const [diagramList, setDiagramList] = useState([]);
    const [page, setPage] = useState([]);
    const [loadIndex, setLoadIndex] = useState(-1);
    const { height, width } = useWindowDimensions();
    const [blogName, setBlogName] = useState("untitle");
    const [blogId, setBlogId] = useState("");
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
    if (!user._id) {
        getUserBySet(setUser);
    }
    async function insertQill() {
        // setPage([...page, { type: "qill", value: quillContent }]);
        page = [...page, { type: "qill", value: {} }];
        setPage(page);
        // console.log([...page, { type: "qill", value: {} }]);
        console.log(page);
        setSectionList((prevSectionList) => [
            ...prevSectionList,
            <QillObj id={page.length - 1} setPage={setPage} page={page} />,
        ]);
    }
    async function insertComponent() {
        const tmp = await loadDiagram(
            user.email,
            user.password,
            diagramList[loadIndex].id
        );
        // elements = tmp.elements;
        const system = compileAll(tmp.elements);
        setPage([
            ...page,
            { type: "elements", value: diagramList[loadIndex].id },
        ]);
        setSectionList((prevSectionList) => [
            ...prevSectionList,
            <ThreeCanvas
                width={Math.floor(0.5 * width)}
                height={0.5 * width}
                system={system}
                isRun={1}
            />,
        ]);
    }
    // useEffect(() => {
    //     console.log("wawa");
    //     let tmp = [];
    //     page.forEach((obj) => {
    //         if (obj.type == "qill") {
    //             tmp.push(<QillObj></QillObj>);
    //         }
    //     });
    //     setSectionList(tmp);
    // }),
    //     [page];
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
                            console.log("create");
                            const id = await createBlog(
                                user.email,
                                user.password,
                                blogName,
                                [page],
                                true, //add public
                                "11/02/2022" //add date
                            );
                            setBlogId(id);
                        } else {
                            console.log("save");
                            saveBlog(
                                user.email,
                                user.password,
                                blogId,
                                blogName,
                                [page],
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

            {sectionList}
            <div className="blog_edit_section_break">
                <Popup
                    trigger={
                        <button className="blog_edit_insert_btn">
                            + Interactive Media
                        </button>
                    }
                    position="right center"
                    modal={true}
                    onOpen={() => {
                        setDiagramNameList(user);
                    }}
                >
                    <div className="modal_wrapper">
                        <div className="save_diagram_header">Load Diagram</div>
                        <div className="all_diagram_wrapper">
                            {diagramCompList}
                        </div>
                        <button
                            className="load_diagram_button"
                            onClick={insertComponent}
                        >
                            Load
                        </button>
                    </div>
                </Popup>
                <button className="blog_edit_insert_btn_2" onClick={insertQill}>
                    + Text Editor
                </button>
            </div>

            {/* <div className="blog_edit_section_break">
                
            </div> */}
        </div>
    );
}
