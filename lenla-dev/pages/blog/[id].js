import ThreeCanvas from "../../components/threeCanvas";
import dynamic from "next/dynamic";
import Profile from "../../components/profile";
import { useRouter } from "next/router";
import {
    getUserBySet,
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
    // console.log(data.pages[0]);
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
                console.log(element.value);
                const system = compileAll(element.value);
                console.log(555);
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
                    <div className="blog_three_wrapper">
                        <ThreeCanvas
                        width={Math.floor(0.5 * width)}
                        height={0.5 * width}
                        system={system} // ต้อง Define
                        isRun={1} // stop
                        />
                    </div>
                );
                break;
        }
    });
    return compList;
}

export default function BlogShow(props) {
    const { data,user,setUser } = props;

    const [compList, setCompList] = useState([]);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        const tmp = shit(data, width);
        setCompList(tmp);
    }, []);

    console.log(data.pages[0][2]);
    console.log(data);
    if(!user){
        getUserBySet(setUser)
    }
    // let user = {username:"trapoomlormak", profileImage:"3333"}
    return( 
    <div className="blog_edit_wrapper">
        <div className="nav_bar_blog_edit">
            <img className="img_logo" />
            <div className="blog_profile_wrapper">
                <Profile name={user.username} url={user.profileImage} />
            </div>
        </div>
        <div className="blog_body_wrapper">
            <div className="blog_cover_wrapper"> <img className="blog_cover" src={data.cover_img} /> <div className="blog_name">{data.name}</div> <div className="blog_author_name">{data.autor.name}</div> </div>
            {compList}
        </div>
        
    </div>);
}
