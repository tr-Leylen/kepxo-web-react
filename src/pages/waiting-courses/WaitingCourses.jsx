import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { getWaitingCourses } from '../../controllers/course.controller'
import CourseListItem from '../../components/CourseListItem'
import Pagination from '../../components/Pagination'
import CourseSkeleton from '../../components/UI/CourseSkeleton'

const WaitingCourses = () => {
    const [data, setData] = useState([])
    const [activePage, setActivePage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    const getWaitingCourseData = async () => {
        try {
            setLoading(true)
            const courses = await getWaitingCourses({ page: activePage, limit: 10 })
            if (courses.status === 200) {
                setData(courses.data.data)
                setTotalPages(courses.data.totalPages)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getWaitingCourseData()
    }, [activePage])
    return (
        <CurrentPage>
            <PageHeader title='Onay Bekleyen Kurslar' />
            <ul className='p-5 mt-14 gap-3 flex flex-col'>
                {loading ? Array.from({ length: 4 }, () => <CourseSkeleton />) :
                    data.map(course => (
                        <CourseListItem key={course?._id} course={course} />
                    ))}
            </ul>
            {data.length > 0 && <Pagination
                activePage={activePage}
                pageCount={totalPages}
                setActivePage={setActivePage}
            />}
        </CurrentPage>
    )
}

export default WaitingCourses;