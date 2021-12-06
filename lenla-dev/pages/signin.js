import Link from 'next/link'
import DynamicBackground from "../components/dynamicBackground"

export default function Signin() {
  return (
    <>
       <div className = "homepage_background noselect"></div>
       <div className = "homepage_container white_char noselect">
          <ul className = "nav_homepage">
              <li className = "nav_homepage_li"><Link href="/signup"><a>Sign up</a></Link></li>
              <li className = "clicked">Sign in</li>
          </ul>
          <div className = "signin_container">
            <div className = "signin_topic">Sign in</div>
            <div className = "signin_content">E-mail</div>
            <input type="email" className = "signin_input"/>
            <div className = "signin_content">Password</div>
            <input type="password" className = "signin_input"/>
            <div><button className = "signin_button"><Link href = "/create"><a>LOG IN</a></Link></button></div>
            
          </div>
       </div>
       <DynamicBackground className = "dynamic_background"/>
      
    </>
  )
}