import React from 'react'
import Card from '../Card'
import Link from 'next/link'

async function Page() {

  await new Promise((resolve,reject) => setTimeout(resolve, 20000));
  return (
    <Card>
      Revenue
      <Link href="/dashboard/last-year">Last year</Link>
    </Card>
  )
}

export default Page;
