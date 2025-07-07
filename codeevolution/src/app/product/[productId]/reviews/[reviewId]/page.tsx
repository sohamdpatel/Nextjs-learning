// import { log } from 'console';
import { notFound } from 'next/navigation';
import React from 'react'

async function page({params, }: {params: Promise<{productId: string, reviewId: string}>}) {
    const {productId, reviewId} =  await params;
    // console.log(productId, reviewId);
    
    if(parseInt(reviewId) > 1000) {
        console.log("error");
        
        notFound(); //it route to the notFound page when condition are tr
    }
  return (
    <div>
      Hello from {productId} of {reviewId}
    </div>
  )
}

export default page
