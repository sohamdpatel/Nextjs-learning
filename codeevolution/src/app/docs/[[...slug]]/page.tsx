import React from 'react'
// this is catch-all-segments
async function page({params, }: {params: Promise<{slug: string[]}>}) {

    const {slug} = await params
    
    if (slug?.length === 2){ // its execute when we give two nested params to url
        return (
            <h1> You are watching feature {slug[0]} and concept {slug[1]}</h1>
        )
    } else if (slug?.length === 1){ // its execute when we give just one param to url
        return (
            <h1> You are watching feature {slug[0]}</h1>
        )
    }

    return ( // it execute when above both condition are false and when we can't give route to docs and when we give extra nested routes 
        <h1>This is main docs</h1>
    ) 
}
export default page
