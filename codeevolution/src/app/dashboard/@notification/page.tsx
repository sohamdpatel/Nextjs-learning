import React from 'react'
import Card from '../Card'
import Link from 'next/link'

function page() {
  return (
    <Card>
      Notification

      <Link href={"/dashboard/archived"}>Archived</Link>
    </Card>
  )
}

export default page
