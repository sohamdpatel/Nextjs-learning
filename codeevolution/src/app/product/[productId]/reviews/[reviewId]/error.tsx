"use client"

import React,{ startTransition} from 'react'
import { useRouter } from 'next/navigation'

function error({error, reset}: {
    error: Error,
    reset: () => void //this is the reset function 
}) {

    const router = useRouter()
    const reload = () =>{
        startTransition(() => {
            router.refresh();
            reset()
        })
    }
  return (
    <div>
      {error.message}
      <button onClick={() => reload()}>Try again</button> 
      {/* // when we click this first of all refresh the page and reset button run  */}
    </div>
  )
}

export default error;
