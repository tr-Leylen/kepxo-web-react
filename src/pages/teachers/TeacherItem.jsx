import React, { useEffect, useState } from 'react'
import noImg from '../../assets/no-profile.png'
import { getUser } from '../../controllers/user.controller'

const TeacherItem = ({ id }) => {
    const [teacher, setTeacher] = useState()
    const getUserData = async () => {
        const data = await getUser(id)
        setTeacher(data)
    }
    useEffect(() => {
        getUserData()
    }, [id])
    return (
        <li className='rounded-md p-4 flex flex-col gap-4 border border-main-color'>
            <div className='flex justify-center w-1/2 mx-auto rounded-full overflow-hidden bg-main-color'>
                <img src={teacher?.avatar || noImg} alt="img" className='object-cover w-full' />
            </div>
            <h2 className='text-center text-main-color'>
                {teacher?.username}
            </h2>
            <h3 className='text-center'>
                {`${teacher?.firstName} ${teacher?.lastName}`}
            </h3>
        </li>
    )
}

export default TeacherItem