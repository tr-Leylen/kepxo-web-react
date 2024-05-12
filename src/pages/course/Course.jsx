import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage';
import PageHeader from '../../components/PageHeader';
import { Link, useParams } from 'react-router-dom';
import { deleteCourse, getCourse } from '../../controllers/course.controller';
import { getCategory } from '../../controllers/category.controller';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { useSelector } from 'react-redux';
import UpdateCourse from './UpdateCourse';
import DeleteAlert from '../../components/DeleteAlert';

const Course = () => {
    const [course, setCourse] = useState({})
    const [category, setCategory] = useState({})
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const { id } = useParams()
    const { currentUser } = useSelector(state => state.user)

    const getCourseData = async () => {
        const course = await getCourse(id)
        setCourse(course)
    }

    const getCategoryData = async () => {
        const data = await getCategory(course?.categoryId)
        setCategory(data)
    }

    useEffect(() => {
        getCourseData()
    }, [id])

    useEffect(() => {
        course?._id && getCategoryData()
    }, [course])
    return (
        <CurrentPage>
            <PageHeader title={course?.title} />
            <div className='p-5 mt-14'>
                <img src={course?.avatar} alt="course img" className='max-w-[600px] block max-h-[300px] mb-5 object-cover' />
                <div className='flex flex-col gap-5'>
                    <p className='text-yellow-500 flex'>
                        {
                            [...Array(5)].map((_, index) => (
                                course?.star >= index + 1 ?
                                    <MdStar key={index} /> :
                                    <MdStarBorder key={index} />
                            ))
                        }
                    </p>
                    <h2 className='text-main-color font-semibold text-3xl'>
                        {category?.title}
                    </h2>
                    <p className='text-main-color text-opacity-80'>
                        {course?.description}
                    </p>
                    <a href={course?.link} target='_self' className='text-blue-500'>{course?.link}</a>
                    <p className='font-semibold text-main-color text-xl'>{course?.score} puan</p>
                    <p className='text-sm font-semibold'>
                        Durum: {course.enable ? <span className='text-green-600'>Aktiv</span> : <span className='text-red-600'>Kapalı</span>}
                    </p>
                    {(currentUser.role === "admin" || currentUser._id === course?.ownerId) && <div className='flex gap-2'>
                        <button
                            onClick={() => setUpdateModal(!updateModal)}
                            className='rounded flex w-24 justify-center h-10 items-center bg-yellow-500 text-white font-medium active:bg-yellow-600 uppercase text-sm'
                        >
                            Güncelle
                        </button>
                        <button
                            onClick={() => setDeleteModal(!deleteModal)}
                            className='rounded w-24 h-10 flex justify-center items-center bg-red-500 text-white font-medium active:bg-red-600 uppercase text-sm'
                        >
                            {course?.enable ? 'Sil':'Aç'}
                        </button>
                    </div>}
                </div>
            </div>
            {updateModal && <UpdateCourse closeModal={setUpdateModal} getNewData={getCourseData} />}
            {deleteModal && <DeleteAlert
                setModal={setDeleteModal}
                deleteOperation={() => deleteCourse(id)}
                getData={getCourseData}
            />}
        </CurrentPage >
    )
}

export default Course;