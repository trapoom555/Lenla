import Navbar from "../components/navbar";
import PreviewButton from "../components/previewButton";
import ShareButton from "../components/shareButton";
import Profile from "../components/profile";
import Workspace from "../components/workspace";
import Inspector from "../components/inspector";
import Selector from "../components/selector";

export default function Create({ user, setUser }) {
    // console.log(user.profileImage);
    return (
        <>
            <div className="flexPage">
                <div className="flexNav">
                    <Navbar />
                    <ShareButton />
                    <PreviewButton />
                    <Profile name={user.username} url={user.profileImage} />
                </div>
                <div className="flexContent">
                    <Workspace />
                    <Inspector />
                </div>
                <Selector />
            </div>
        </>
    );
}
