import React, { useEffect, useState } from 'react'

export default function CounterSpan({count}) {
const [counter,setCounter]=useState(0)


useEffect(()=>{
let interval=setInterval(() => {
      
setCounter(prev=> prev+1)

}, 1);

if(counter==count){
    clearInterval(interval)
}

return ()=> clearInterval(interval)
},[counter])

  return (
<span>{counter}</span>
  )
}
