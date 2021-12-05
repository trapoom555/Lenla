import Navbar from "../components/navbar"
import PreviewButton from "../components/previewButton"
import ShareButton from "../components/shareButton"
import Profile from "../components/profile"
import Workspace from "../components/workspace"
import Inspector from "../components/inspector"
import Selector from "../components/selector"

export default function Create() {
  return (
    <>
    <div className = "flexPage">
      <div className = "flexNav">
        <Navbar />
        <ShareButton />
        <PreviewButton />
        <Profile />
      </div>
      <div className = "flexContent">
        <Workspace />
        <Inspector />
      </div>
      <Selector />
    </div>
      
    </>
  )
}