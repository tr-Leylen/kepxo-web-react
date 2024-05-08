import React from 'react'

const CurrentPage = ({children}) => {
  return (
    <div className='max-h-screen w-full overflow-y-scroll'>
        {children}
    </div>
  )
}

export default CurrentPage