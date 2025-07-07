import React from 'react'
import Counter from './counter'

export const metadata = {
  title: 'Counter',
}
 // when we can not export metadata from use client component so that time we need to seperate both components
 // we can not use metadata in client component so thats the reason of seperation
function page() {
  return (
    <Counter />
  )
}

export default page
