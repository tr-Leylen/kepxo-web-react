import React from 'react'

const PageHeader = ({title="Title"}) => {
  return (
    <h2 className='text-xl text-main-color font-bold uppercase mb-10 fixed flex items-center px-5 w-full bg-white top-0 h-14 shadow-lg'>
        {title}
    </h2>
  )
}

export default PageHeader