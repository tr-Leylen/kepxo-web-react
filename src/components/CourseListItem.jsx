import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdStar, MdStarBorder, MdModeEdit, MdDelete } from "react-icons/md";
import { getUser } from '../controllers/user.controller';

const CourseListItem = ({ course }) => {
    const [userName, setUserName] = useState("")
    const getUserName = async () => {
        const user = await getUser(course.ownerId)
        setUserName(user.username)
    }
    useEffect(() => {
        getUserName()
    }, [])
    return (
        <li>
            <Link to={`/course/${course._id}`} className='flex rounded-md border border-main-color overflow-hidden'>
                <div className='w-[250px] h-[150px]'>
                    <img src={course.avatar} alt="courseImg" className='w-full h-full block object-cover' />
                </div>
                <div className='flex flex-col gap-1 text-main-color px-5 justify-center w-full'>
                    <h2 className='font-bold text-xl flex gap-4'>
                        <span>{course.title}</span>
                        <span className='flex items-center gap-1 text-yellow-500'>
                            <span className='text-sm text-gray-500 font-normal'>
                                ({course.star})
                            </span>
                            {
                                [...Array(5)].map((_, index) => (
                                    course.star >= index + 1 ?
                                        <MdStar /> :
                                        <MdStarBorder />
                                ))
                            }
                        </span>
                    </h2>
                    <p className='text-sm'>
                        {course.description}
                    </p>
                    <p className='text-lg'>
                        {userName}
                    </p>
                </div>
            </Link>
        </li>
    )
}

export default CourseListItem;