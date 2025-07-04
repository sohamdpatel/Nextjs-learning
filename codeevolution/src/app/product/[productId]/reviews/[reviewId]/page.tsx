// import { log } from 'console';
import { notFound } from 'next/navigation';
import React from 'react'

async function page({params, }: {params: Promise<{productId: string, reviewId: string}>}) {
    const {productId, reviewId} =  await params;
    console.log(productId, reviewId);
    
    if(parseInt(reviewId) > 1000) {
        console.log("error");
        
        notFound();
    }
  return (
    <div>
      Hello from {productId} of {reviewId}
    </div>
  )
}

export default page
