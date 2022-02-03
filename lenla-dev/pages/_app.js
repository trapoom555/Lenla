import "../styles/navbar.css";
import 'reactjs-popup/dist/index.css';
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
import "../styles/insp_sum.css";
import "../styles/toggle.css";
import "../styles/insp_layout.css";
import { useState } from "react";
import Head from "next/head"
// import { AppStateProvider } from './my-context'
function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState({ username: "-" });
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </Head>
            <Component {...pageProps} user={user} setUser={setUser} />
        </>
    );
}

export default MyApp;
