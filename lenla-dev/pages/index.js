import Link from 'next/link'
import DynamicBackground from "../components/dynamicBackground"

export default function Home() {
  return (
    <>
       <div className = "homepage_background noselect"></div>
       <div className = "homepage_container white_char noselect">
          <ul className = "nav_homepage">
              <li className = "nav_homepage_li"><Link href="/signup"><a>Sign up</a></Link></li>
              <li className = "nav_homepage_li"><Link href="/signin"><a>Sign in</a></Link></li>
          </ul>
          <img className = "img_logo_white"/>
          <div className = "learn_lab">LEARN & LAB</div>
          <ul className = "content_homepage">
              <li className = "content_homepage_li">CREATE & SHARE<br/>INTERACTIVE RESOURCE</li>
              <li><img className = "ic_circle" /></li>
              <li className = "content_homepage_li">INTERACTIVE<br/>LEARNING</li>
              <li><img className = "ic_circle" /></li>
              <li className = "content_homepage_li">LAB USING<br/>SIMULATION</li>
          </ul>
       </div>
       <DynamicBackground className = "dynamic_background"/>
      
    </>
  )
}
