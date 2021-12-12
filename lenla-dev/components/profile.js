export default function Profile(props) {
    // console.log(props.url);
    return (
        <>
            <p>{props.name}</p>
            <img className="profile_icon" src={props.url} />
            <img className="triangle_icon" />
            {/* <img className="signup_profile_image" src={info.profileImage} /> */}
        </>
    );
}
