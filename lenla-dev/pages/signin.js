import Link from "next/link";
import DynamicBackground from "../components/dynamicBackground";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../components/API";
const Domain = "http://localhost:3001";
// import fetch from "isomorphic-unfetch";
export default function Signin({ user, setUser }) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const router = useRouter();
    function changeEmail(mail) {
        setemail(mail.target.value);
        // console.log(name);
    }
    function changePassword(pass) {
        setpassword(pass.target.value);
        // console.log(name);
    }
    
    return (
        <>
            <div className="homepage_background noselect"></div>
            <div className="homepage_container white_char noselect">
                <ul className="nav_homepage">
                    <li className="nav_homepage_li">
                        <Link href="/signup">
                            <a>Sign up</a>
                        </Link>
                    </li>
                    <li className="clicked">Sign in</li>
                </ul>
                <div className="signin_container">
                    <div className="signin_topic">Sign in</div>
                    <div className="signin_content">E-mail</div>
                    <input
                        type="email"
                        value={email}
                        onChange={changeEmail}
                        className="signin_input"
                    />
                    <div className="signin_content">Password</div>
                    <input
                        type="password"
                        value={password}
                        className="signin_input"
                        onChange={changePassword}
                    />

                    <div>
                        <button
                            className="signin_button"
                            onClick={async () => {
                                // fetch(Domain + "/");
                                
                                login(email,password,setUser)
                            }}
                        >
                            {/* <Link href="/create"> */}
                            <a>LOG IN</a>
                            {/* </Link> */}
                        </button>
                    </div>
                </div>
            </div>
            <DynamicBackground className="dynamic_background" />
        </>
    );
}
