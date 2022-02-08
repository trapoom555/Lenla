import dynamic from 'next/dynamic'
import { useState } from 'react'

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



export default function BlogEdit() {
    
    const [quillContent, setQuillContent] = useState('');
    let sectionList = [];
    function insertComponent() {
        sectionList.push(<QuillNoSSRWrapper modules={modules} formats={formats} value={quillContent} onChange={setQuillContent} theme="snow" />)
        console.log(sectionList)
    }
    return (
        <div className="blog_edit_wrapper">
            <div className="nav_bar_blog_edit">
                <img className="img_logo" />
                <input className="blog_edit_name" placeholder='My Blog Name'/>
                <button className='blog_edit_button'>Save</button>
            </div>
            
            {/* <QuillNoSSRWrapper
                modules={{"toolbar": false}}
                value={quillContent}
                readOnly={true}
                theme={"snow"}
            /> */}
            <QuillNoSSRWrapper modules={modules} formats={formats} value={quillContent} onChange={setQuillContent} theme="snow" />
            <div className="blog_edit_section_break"><button className="blog_edit_insert_btn" onClick={insertComponent}>+ Interactive Media</button></div>
            {sectionList}
        </div>
    
    )

}