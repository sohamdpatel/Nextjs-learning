"use client"
import React from 'react'
// import { useRouter } from 'next/router'
import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter()

    const handleSubmit = () => {
        console.log('Order placed successfully');
        router.push('/'); // this thing add a new route
    }
  return (

    <div>
      <h1>Order Product</h1>
      <button onClick={handleSubmit}>Place Order</button>

    </div>
  )
}

export default page
