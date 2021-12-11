export default function Profile(props) {
    return (
        <>
            <p>{props.name}</p>
            <img className="profile_icon" />
            <img className="triangle_icon" src={props.url} />
        </>
    );
}
