import React from 'react'
import Link from 'next/link'
function page() {
  return (
    <div>
      F1 
      <div className="flex gap-4">
        <Link href={"/f1/f2"}>F2</Link>
        <Link href={"/f3"}>F3</Link>
      </div>
    </div>
  )
}

export default page
