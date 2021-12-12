import "../styles/navbar.css";
import "../styles/app.css";
import "../styles/previewbutton.css";
import "../styles/sharebutton.css";
import "../styles/profile.css";
import "../styles/workspace.css";
import "../styles/inspector.css";
import "../styles/selector.css";
import "../styles/homepage.css";
import "../styles/signin.css";
import "../styles/signup.css";
import "../styles/insp_constant.css";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState({ username: "-" });
    return <Component {...pageProps} user={user} setUser={setUser} />;
}

export default MyApp;
