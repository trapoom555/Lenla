import dynamic from 'next/dynamic'
import { useState } from 'react'
import Popup from "reactjs-popup";
import Profile from "../components/profile";
import useWindowDimensions from "../hook/useWindowDimensions";
import ThreeCanvas from "../components/threeCanvas";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', {'color' : []}],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'color',
]

function BlogComponent(props) {
  const [quillContent, setQuillContent] = useState('');

  const {sectionList, setSectionList, width} = props

  function insertComponent() {
    setSectionList((prevSectionList) => 
      [...prevSectionList,
        <ThreeCanvas
            width={Math.floor(0.5 * width)}
            height={
                0.5*width
            }
            system={system} // ต้อง Define
            setSystem={setSystem} // ต้อง Define
            callBack={() => {
                setElements([...elements]);
            }} // ต้อง Define
            isRun={0} // stop
        />,
       <BlogComponent sectionList={sectionList} setSectionList={setSectionList} />])
    console.log(sectionList)
}

  return(
    <>
      <QuillNoSSRWrapper modules={modules} formats={formats} value={quillContent} onChange={setQuillContent} theme="snow" />
              
      <Popup
          trigger={
            <div className="blog_edit_section_break"><button className="blog_edit_insert_btn">+ Interactive Media</button></div>
          }
          position="right center"
          modal={true}>
          <div className="modal_wrapper">
              <div className="save_diagram_header">
                  Load Diagram
              </div>
              <div className="all_diagram_wrapper">
                  {/* {diagramList} */}
              </div>
              <button
                  className="load_diagram_button"
                  onClick={insertComponent}
              >
                  Load
              </button>
          </div>
      </Popup>
    </>
  )
}


export default function BlogEdit({ user, setUser }) {
    const [sectionList, setSectionList] = useState([]);
    const { height, width } = useWindowDimensions();
    return (
        <div className="blog_edit_wrapper">
            <div className="nav_bar_blog_edit">
                <img className="img_logo" />
                <input className="blog_edit_name" placeholder='My Blog Name'/>
                <button className='blog_edit_button'>Save</button>
                <Profile name={user.username} url={user.profileImage} />
            </div>
            
            {/* <QuillNoSSRWrapper
                modules={{"toolbar": false}}
                value={quillContent}
                readOnly={true}
                theme={"snow"}
            /> */}
            <BlogComponent sectionList={sectionList} setSectionList={setSectionList} width={width}/>
            {sectionList}
        </div>
    
    )

}