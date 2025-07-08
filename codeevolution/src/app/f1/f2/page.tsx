import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div>
      F2 Page
      <div>
        <Link href={"/f4"}>F4</Link>
      </div>
    </div>
  )
}

export default page
