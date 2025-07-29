// import { log } from 'console';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

// function getRandom(count: number){
//   return Math.floor(Math.random() *)
// }

async function page({params, }: {params: Promise<{productId: string, reviewId: string}>}) {
    const {productId, reviewId} =  await params;
    // console.log(productId, reviewId);
    const random = Math.floor(Math.random() * 2)
    if (random === 1) {
      console.log();
      
      throw new Error("This is Random Error")// when we have error.tsx in this folder and error comes,that time erroe.tsx run
    }
    if(parseInt(reviewId) > 1000) {
        console.log("error");
        
        notFound(); //it route to the notFound page when condition are tr
        // redirect("/");
    }
  return (
    <div>
      Hello from {productId} of {reviewId}
    </div>
  )
}

export default page
