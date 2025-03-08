import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import CourseListItem from '../../components/CourseListItem'
import CurrentPage from '../../components/CurrentPage'
import { IoSearch } from "react-icons/io5";
import { getCourses, searchCourse } from '../../controllers/course.controller';
import CreateCourse from '../mycourses/CreateCourse';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import { useForm } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import CourseSkeleton from '../../components/UI/CourseSkeleton';

const Courses = () => {
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [activePage, setActivePage] = useState(0)
    const [createModal, setCreateModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm()

    const getCoursesData = async () => {
        try {
            setLoading(true)
            const courses = await getCourses({ page: activePage, limit: 10 })
            if (courses?.status === 200) {
                setData(courses.data.data)
                setTotalPages(courses.data.totalPages)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const search = async (data) => {
        const res = await searchCourse({ limit: 10, page: activePage, title: data.title })
        if (res.status === 200) {
            setData(res.data.data)
            setTotalPages(res.data.totalPages)
        }
    }
    useEffect(() => {
        getCoursesData()
    }, [activePage])
    return (
        <CurrentPage>
            <PageHeader title='Eğitimler' />
            <div className='p-10 mt-14'>
                <form
                    className='flex border border-main-color rounded overflow-hidden w-fit'
                    onSubmit={handleSubmit(search)}
                >
                    <input
                        type="text"
                        placeholder='Eğitim ara'
                        className='outline-none px-3 py-2 text-sm'
                        {...register("title", { required: true })}
                    />
                    <button
                        type='submit'
                        className='px-3 py-1 bg-main-color text-white'
                    >
                        <IoSearch className='cursor-pointer text-lg' />
                    </button>
                    <button
                        type='reset'
                        className='px-2 flex items-center justify-center text-xl'
                        onClick={getCoursesData}
                    >
                        <IoIosClose />
                    </button>
                </form>
                <button
                    className='mt-10 bg-green-700 text-white px-4 py-2'
                    onClick={() => setCreateModal(true)}
                >
                    Yeni Eğitim
                </button>
                <ul className='list-none flex flex-col gap-5 mt-14'>
                    {loading ? Array.from({ length: 3 }, () => <CourseSkeleton />) : data.map(course => (
                        <CourseListItem course={course} key={course?._id} />
                    ))}
                </ul>
            </div>
            {data.length > 0 && <Pagination
                activePage={activePage}
                pageCount={totalPages}
                setActivePage={setActivePage}
            />}
            {createModal &&
                <Modal>
                    <CreateCourse closeModal={setCreateModal} createdBy='admin' />
                </Modal>
            }
        </CurrentPage>
    )
}

export default Courses;