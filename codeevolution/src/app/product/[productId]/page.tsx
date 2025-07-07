import React from 'react'
import { Metadata } from 'next'

type Props = { 
  params: Promise<{productId: string}>
}

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
  const id = (await params).productId
  console.log(id);
  
  return {
    title: `Product ${id}`,
  };
}
console.log(generateMetadata);

async function page({params}: Props) {   

    const productId =  (await params).productId
    //this is dynamic routing

    // const param = await params
    console.log(productId);
    
  return (
    <div>
      This is Child product Page {productId}
    </div>
  )
}

export default page
