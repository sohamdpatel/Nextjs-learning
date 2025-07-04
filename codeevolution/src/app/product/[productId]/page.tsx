import React from 'react'

async function page({params,}: { params: Promise<{productId: string}>}) {   

    const productId =  (await params).productId
    //this is dynamic routing

    // const param = await params
    // console.log(params);
    
  return (
    <div>
      This is Child product Page {productId}
    </div>
  )
}

export default page
