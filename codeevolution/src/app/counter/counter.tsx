"use client"

import React, { useState } from 'react'

function Counter() {
    const [counter,setCounter] = useState<number>(0);

  
  return (
    <div>
      <h1>
        Count {counter}
      </h1>
      <button onClick={() => setCounter(counter + 1)} className='p-2 border-2 mx-2'>Increase count</button>
      <button onClick={() => setCounter(counter - 1)} className='p-2 border-2 mx-2'>Decrease count</button>
    </div>
  )
}

export default Counter
