export default function CourseOverviewWrapper(props) {
    const { courseData } = props;
    // Data
    // {
    //     courseName: "",
    //     author : "",
    // }
    return (
        <div className="course_overview_wrapper">
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
