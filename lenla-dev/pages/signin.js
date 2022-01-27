import Link from "next/link";
import DynamicBackground from "../components/dynamicBackground";
import { useState } from "react";
import { useRouter } from "next/router";
const Domain = "http://localhost:3000";
import fetch from "isomorphic-unfetch";
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
    async function login(email, password) {
        try {
            const res = await fetch(Domain + "/auth/login", {
                // mode: "no-cors",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            //
            if (res.status == 201) {
                [console.log("success")];
                router.push("/create");
            }
            const data = await res.json();
            // console.log(data.access_token);
            const profile_res = await fetch(Domain + "/profile", {
                // mode: "no-cors",
                // method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.access_token,
                },
                // body: JSON.stringify({ email, password }),
            });
            const profile_data = await profile_res.json();
            setUser(profile_data);
            console.log("get profile done");
            const img_res = await fetch(Domain + "/profileImg", {
                // mode: "no-cors",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                // body: JSON.stringify({ email, password }),
            });
            const img_data = await img_res.json();
            setUser({ ...data, profileImage: img_data.profileImg });
            console.log(user);
            console.log("get profileImg done");
        } catch (error) {
            // console.log(res);
            //console.log(error);
        }
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
                                console.log(password);
                                await login(email, password);
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
