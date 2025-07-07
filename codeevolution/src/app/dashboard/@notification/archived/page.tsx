import React from 'react'
import Card from '../../Card'
import Link from 'next/link'

function Page() {
  return (
    <Card>
      Archived Notification

      <Link href={"/dashboard"}>Default</Link>
    </Card>
  )
}

export default Page
