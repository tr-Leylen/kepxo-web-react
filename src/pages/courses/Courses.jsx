import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import CourseListItem from '../../components/CourseListItem'
import CurrentPage from '../../components/CurrentPage'
import { IoSearch } from "react-icons/io5";
import { getCourses } from '../../controllers/course.controller';


const Courses = () => {
    const [data, setData] = useState([])

    const getCoursesData = async () => {
        const courses = await getCourses()
        setData(courses)
    }

    useEffect(() => {
        getCoursesData()
    }, [])
    return (
        <CurrentPage>
            <PageHeader title='Eğitimler' />
            <div className='p-10 mt-14'>
                <div className='text-main-color w-fit border-main-color border flex items-center rounded-md overflow-hidden px-2 py-1'>
                    <input
                        type="text"
                        placeholder='Eğitim ara'
                        className='px-2 py-1 text-sm outline-none'
                    />
                    <IoSearch className='cursor-pointer text-lg' />
                </div>
                <ul className='list-none flex flex-col gap-10 mt-14'>
                    {data.map(course => (
                        <CourseListItem course={course} key={course.id} />
                    ))}
                </ul>
            </div>
        </CurrentPage>
    )
}

export default Courses;