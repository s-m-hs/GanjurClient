import React from 'react'
import './ErrorPage.css'
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const  navigate=useNavigate()
  return (
    <div className='container  errorpage-container'>
        <div className='row'>
            <div className='col errorpage-col '>
                <img className='errorpage-container' src="../../../images/1698.jpg" alt="img" />
                <div className='errorpage-type'>
                              <Typewriter
                className='errorpage-type-div'
  options={{
    strings: ['مشکلی پیش آمده لطفا مجددا تلاش بفرمایید'],
    autoStart: true,
    loop: true,
    pauseFor:2500,

    delay: 75
  }}
/> 
<button className='btn btn-warning errorpage-button'
onClick={()=>{navigate('/p-admin')}}
>بازگشت</button>

                </div>

            </div>
        </div>
    </div>
  )
}
