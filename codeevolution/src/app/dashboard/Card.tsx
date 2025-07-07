import React from 'react'

function Card({children}: {children: React.ReactNode}) {
  return (
    <div className=' p-2 border-2 shadow-emerald-500 m-4 shadow-2xl'>
      {children}
    </div>
  )
}

export default Card
                                                        