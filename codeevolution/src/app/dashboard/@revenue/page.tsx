import React from 'react'
import Card from '../Card'
import Link from 'next/link'

function Page() {
  return (
    <Card>
      Revenue
      <Link href="/dashboard/last-year">Last year</Link>
    </Card>
  )
}

export default Page
