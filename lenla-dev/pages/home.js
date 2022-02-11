import Profile from "../components/profile"
import CourseOverviewWrapper from "../components/courseOverviewWrapper"
import { useState } from "react";
import Link from 'next/link'

function ContentWrapper(props) {
    const {isDisplay, titleName, contentList} = props;
    let contentElement = [];
    for(let i=0; i < contentList.length; i++){
        contentElement.push(<CourseOverviewWrapper courseData={contentList[i]} />)
    }
    return (
        <div style={{display: isDisplay ? "" : "none"}}>
            <div className="home_my_blog">{titleName}</div>
            <div className="home_list_wrapper">
                {contentElement}
            </div>
        </div>
    )
}


export default function Home() {
    const [isDisplayMyList, setIsDisplayMyList] = useState(true)
    let username = "Trapoom" // backend แก้ตรงนี้
    let blogList = [];
    let InteractiveList = [];
    let contentList = [
        {
            courseName: "Petting Cats",
            author : "Meowman",
        },
        {
            courseName: "Petting Cats",
            author : "Meowman",
        },
        {
            courseName: "Petting Cats",
            author : "Meowman",
        },
        {
            courseName: "Petting Cats",
            author : "Meowman",
        },
    ]

    return (
        <div className="home_wrapper">
        <div className="home_nav_wrapper">
            <img className="img_logo" />
            <div className="home_create_button">
                <Link href="/create"><button className="home_create_interactive_btn">Create Interactive</button></Link>
                <Link href="/blogedit"><button className="home_create_blog_btn">Create Blog</button></Link>
            </div>
            <Profile />
        </div>
        <div className="home_body_wrapper">
            <div className="home_sidebar_wrapper">
                <div className={isDisplayMyList ? "home_my_list rotate black_char" : "home_my_list rotate"} onClick={() => setIsDisplayMyList(true)}>My Lists</div>
                <div className={isDisplayMyList ? "home_discover rotate" : "home_discover rotate black_char"} onClick={() => setIsDisplayMyList(false)}>Discover</div>
            </div>
            <div>
                <div className="home_welcome_text">Welcome back, {username}</div>
                <ContentWrapper isDisplay={isDisplayMyList} titleName="My Blog" contentList={contentList} />
                <ContentWrapper isDisplay={isDisplayMyList} titleName="My Interactive" contentList={contentList} />
                <ContentWrapper isDisplay={!isDisplayMyList} titleName="Public Blog" contentList={contentList} />
                <ContentWrapper isDisplay={!isDisplayMyList} titleName="Public Interactive" contentList={contentList} />
            </div>
            

        </div>
        

        </div>
    )
}