import { useRouter } from "next/router";

export default function CourseOverviewWrapper(props) {
    const { courseData } = props;
    const router = useRouter();
    // Data
    // {
    //     courseName: "",
    //     author : "",
    // }
    return (
        <div
            className="course_overview_wrapper"
            onClick={() => {
                router.push("/blog/" + courseData._id);
            }}
        >
            <img className="course_overview_img" />
            <div className="course_overview_description">
                <div className="course_overview_name">{courseData.name}</div>
                <div className="course_overview_author">
                    {courseData.author}
                </div>
            </div>
        </div>
    );
}
