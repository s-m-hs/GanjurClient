import React, { useEffect, useState } from 'react'
import './ScrollTo.css'
// import {CaretUp} from "@phosphor-icons/react";


export default function ScrollTo() {
    const [fixTop,setFixTop]=useState(false)


    const goToTop=()=>{
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })
      }
      const goToBottom=()=>{
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        })
      }
      useEffect(()=>{

      const fixNavbarToTop=()=>{
        const currentScroll = window.scrollY;
        currentScroll > 300 ? setFixTop(true)   :  setFixTop(false) 
      }
       window.addEventListener('scroll',fixNavbarToTop)

      
      return()=>window.removeEventListener('scroll',fixNavbarToTop)
      },[])

  return (
    
 <div data-aos="fade-right"
  className={!fixTop ? `circle ` : `circle_visibil`} 
    >
<i      onClick={goToTop}
class="fa-solid fa-chevron-up" style={{color:'#ffff'}} ></i>   
<i  onClick={goToBottom}
class="fa-solid fa-chevron-down" style={{color:'#ffff'}}></i>
   </div>

    
  )
}
