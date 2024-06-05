import React from 'react'
import { MdError } from 'react-icons/md'

const InputError = ({ message='' }) => {
    return (
        <span className='flex items-center gap-2 text-xs text-red-500 font-medium'>
            <MdError />
            {message}
        </span>
    )
}

export default InputError