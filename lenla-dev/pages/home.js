import Profile from "../components/profile";
import CourseOverviewWrapper from "../components/courseOverviewWrapper";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    getAllBlog,
    getAllDiagram,
    getUser,
    getUserBySet,
    loadBlog,
    loadDiagramName,
    loadMyBlogs,
} from "../components/API";

// export async function getServerSideProps() {
//     const user = await getUser();
//     console.log(user);
//     const data = await loadMyBlogs(user.email, user.password);
//     console.log("-----------------");
//     console.log(data);
//     return { props: { data } };
// }

function ContentWrapper(props) {
    const { isDisplay, title, contentList } = props;
    let contentElement = [];
    for (let i = 0; i < contentList.length; i++) {
        contentElement.push(
            <CourseOverviewWrapper courseData={contentList[i]} />
        );
    }
    return (
        <div style={{ display: isDisplay ? "" : "none" }}>
            <div class="home_my_blog">{title}</div>
            <div class="home_list_wrapper">{contentElement}</div>
        </div>
    );
}

export default function Home({ user, setUser }) {
    if (!user) {
        getUserBySet(setUser);
    } else {
        if (!user._id) getUserBySet(setUser);
    }

    const [isDisplayMyList, setIsDisplayMyList] = useState(true);
    let username = user.first;
    const [myBlogs, setMyBlogs] = useState([]);
    const [myInteractives, setMyInteractives] = useState([]);
    const [publicBlogs, setPublicBlogs] = useState([]);
    const [publicInteractive, setPublicInteractive] = useState([]);
    // let myBlogList = [];
    let InteractiveList = [];
    useEffect(async () => {
        if (user) {
            if (user.email) {
                setMyBlogs(await loadMyBlogs(user.email, user.password));
                setMyInteractives(
                    await loadDiagramName(user.email, user.password)
                );
                setPublicBlogs(await getAllBlog());
                setPublicInteractive(await getAllDiagram());
            }
        }

        //   }
    }, [user]);

    return (
        <div class="home_wrapper">
            <div class="home_nav_wrapper">
                <img class="img_logo" />
                <div class="home_create_button">
                    <Link href="/create">
                        <button class="home_create_interactive_btn">
                            Create Interactive
                        </button>
                    </Link>
                    <Link href="/blogedit">
                        <button class="home_create_blog_btn">
                            Create Blog
                        </button>
                    </Link>
                </div>
                <Profile name={user.username} url={user.profileImage} />
            </div>
            <div class="home_body_wrapper">
                <div class="home_sidebar_wrapper">
                    <div
                        class={
                            isDisplayMyList
                                ? "home_my_list rotate black_char"
                                : "home_my_list rotate"
                        }
                        onClick={() => setIsDisplayMyList(true)}
                    >
                        My Lists
                    </div>
                    <div
                        class={
                            isDisplayMyList
                                ? "home_discover rotate"
                                : "home_discover rotate black_char"
                        }
                        onClick={() => setIsDisplayMyList(false)}
                    >
                        Discover
                    </div>
                </div>
                <div>
                    <div class="home_welcome_text">
                        Welcome back, {username}
                    </div>
                    <ContentWrapper
                        isDisplay={isDisplayMyList}
                        title="My Blog"
                        contentList={myBlogs}
                    />
                    <ContentWrapper
                        isDisplay={isDisplayMyList}
                        title="My Interactive"
                        contentList={myInteractives}
                    />
                    <ContentWrapper
                        isDisplay={!isDisplayMyList}
                        title="Public Blog"
                        contentList={publicBlogs}
                    />
                    <ContentWrapper
                        isDisplay={!isDisplayMyList}
                        title="Public Interactive"
                        contentList={publicInteractive}
                    />
                </div>
            </div>
        </div>
    );
}
