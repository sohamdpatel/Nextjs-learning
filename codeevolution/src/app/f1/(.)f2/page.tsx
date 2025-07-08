import React from 'react'
import Link from 'next/link'
function InterceptedF2() {
  return (
    <div>
      Intercepted F2 Page
      <div>
        <Link href={"/f4"}>F4</Link>
      </div>
    </div>
  )
}

export default InterceptedF2