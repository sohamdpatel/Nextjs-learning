"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

function notFound() {

    const pathName = usePathname()

    const product = pathName.split("/")[2]
    const review = pathName.split("/")[4]

    
  return (
    <div>
      <h1>Review {review} not found for product {product}</h1>
    </div>
  )
}

export default notFound
