import Link from 'next/link'

export default function Signup() {
  return (
    <>
       <div className = "homepage_background noselect"></div>
       <div className = "homepage_container white_char noselect">
            <ul className = "nav_homepage">
                <li className = "clicked">Sign up</li>
                <li className = "nav_homepage_li"><Link href="/signin"><a>Sign in</a></Link></li>
            </ul>
            <div className = "signup_container">
                <div className = "signup_topic">Sign up</div>
                <div className = "signup_information_container">
                    <div className = "signup_left_information_container">
                        <img className = "signup_profile_image"/>
                        <button className = "signup_upload_profile_button white_char">Upload Profile Photo</button>
                        <div className = "signup_content">Display Name</div>
                        <input className = "signup_input"/>
                    </div>
                    <div className = "signup_right_information_container">
                        <div className = "signup_row_align">
                            <div className = "signup_left_in_row">
                                <div className = "signup_content">First Name</div>
                                <input className = "signup_input"/>
                            </div>
                            <div>
                                <div className = "signup_content">Last Name</div>
                                <input className = "signup_input"/>
                            </div>
                        </div>
                        <div className = "signup_row_align">
                            <div className = "signup_left_in_row_small">
                                <div className = "signup_content">E-mail</div>
                                <input className = "signup_input signup_large_input"/>
                            </div>
                            <div className = "signup_margin_top_content">Role</div>
                            <button className = "role_selector">Instructor</button>
                            <button className = "role_selector">Student</button>
                        </div>

                        <div className = "signup_row_align">
                            <div className = "signup_left_in_row">
                                <div className = "signup_content">Password</div>
                                <input className = "signup_input" type="password"/>
                            </div>
                            <div>
                                <div className = "signup_content">Confirm Password</div>
                                <input className = "signup_input" type="password"/>
                            </div>
                        </div>
                        <button className = "signup_button">DONE</button>
                    </div>
                </div>

            </div>
       </div>
      
    </>
  )
}