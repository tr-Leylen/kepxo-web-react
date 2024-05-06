import React from 'react'
import { Link } from 'react-router-dom'
import { MdStar, MdStarBorder } from "react-icons/md";

const CourseListItem = ({ course }) => {
    return (
        <li>
            <Link to="/" className='flex rounded-md border border-main-color overflow-hidden'>
                <div className='w-[240px] h-[140px]'>
                    <img src={course.avatar} alt="courseImg" className='w-full h-full block object-cover' />
                </div>
                <div className='flex flex-col gap-1 text-main-color px-5 justify-center'>
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
                        {course.owner}
                    </p>
                </div>
            </Link>
        </li>
    )
}

export default CourseListItem