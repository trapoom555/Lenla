import ThreeCanvas from "../../components/threeCanvas";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
    loadBlog,
    loadDiagram,
    loadDiagram_public,
} from "../../components/API";
import { useEffect, useState } from "react";
import { compileAll } from "../../block_system/systemObj";
import useWindowDimensions from "../../hook/useWindowDimensions";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

export async function getServerSideProps({ query }) {
    // Fetch data from external API
    // const res = await fetch(`https://.../data`);
    const data = await loadBlog(query.id);
    return { props: { data } };
}

function shit(data, width) {
    let compList = [];
    data.pages[0].forEach((element) => {
        switch (element.type) {
            case "qill":
                compList.push(
                    <QuillNoSSRWrapper
                        modules={{ toolbar: false }}
                        value={element.value}
                        readOnly={true}
                        theme={"snow"}
                    />
                );
                // setCompList([...compList]);
                break;
            case "elements":
                // const elements = await loadDiagram_public(element.value)
                //     .elements;
                const system = compileAll(element.value);
                console.log(element.value);
                // setCompList((pre) => [
                //     ...pre,
                //     <ThreeCanvas
                //         width={Math.floor(0.5 * width)}
                //         height={0.5 * width}
                //         system={system} // ต้อง Define
                //         isRun={1} // stop
                //     />,
                // ]);
                compList.push(
                    <ThreeCanvas
                        width={Math.floor(0.5 * width)}
                        height={0.5 * width}
                        system={system} // ต้อง Define
                        isRun={1} // stop
                    />
                );
                break;
        }
    });
    return compList;
}

export default function BlogShow(props) {
    const { data } = props;

    const [compList, setCompList] = useState([]);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        const tmp = shit(data, width);
        setCompList(tmp);
    }, []);

    console.log(data.pages[0][2]);

    return <>{compList}</>;
}
