import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { getWaitingCourses } from '../../controllers/course.controller'
import CourseListItem from '../../components/CourseListItem'

const WaitingCourses = () => {
    const [data, setData] = useState([])

    const getWaitingCourseData = async () => {
        const courses = await getWaitingCourses()
        setData(courses)
    }

    useEffect(() => {
        getWaitingCourseData()
    }, [])
    return (
        <CurrentPage>
            <PageHeader title='Onay Bekleyen Kurslar' />
            <ul className='p-5 mt-14'>
                {data.map(course => (
                    <CourseListItem key={course?._id} course={course}/>
                ))}
            </ul>
        </CurrentPage>
    )
}

export default WaitingCourses;