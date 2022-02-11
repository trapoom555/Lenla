
import ThreeCanvas from "../components/threeCanvas";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  })

export default function BlogShow() {
    return (
        <>
        <QuillNoSSRWrapper
                modules={{"toolbar": false}}
                value={quillContent}
                readOnly={true}
                theme={"snow"}
            /> // อันนี้คือแสดง blog เดียว แต่ถ้ามี interactive ก็ for loop ตาม data structure ที่วาวเก็บเอา

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
        />
        </>
    )
}