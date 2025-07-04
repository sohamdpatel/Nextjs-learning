import React from 'react'
// this is catch-all-segments
async function page({params, }: {params: Promise<{slug: string[]}>}) {

    const {slug} = await params
    
    if (slug?.length === 2){
        return (
            <h1> You are watching feature {slug[0]} and concept {slug[1]}</h1>
        )
    } else if (slug?.length === 1){
        return (
            <h1> You are watching feature {slug[0]}</h1>
        )
    }

    return (
        <h1>This is main docs</h1>
    )
}

export default page
