import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage';
import PageHeader from '../../components/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { acceptCourse, deleteCourse, getCourse } from '../../controllers/course.controller';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { LuClock } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import UpdateCourse from './UpdateCourse';
import DeleteAlert from '../../components/DeleteAlert';
import AcceptCourse from './AcceptCourse';
import toast from 'react-hot-toast';

const Course = () => {
    const navigate = useNavigate()
    const [course, setCourse] = useState({})
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [acceptModal, setAcceptModal] = useState(false)
    const { id } = useParams()
    const { currentUser } = useSelector(state => state.user)

    const getCourseData = async () => {
        const course = await getCourse(id)
        if (course.status === 200) {
            setCourse(course.data)
        }else{
            toast.error('Hata oldu')
        }
    }

    const deleteCurrentData = async()=>{
        try {
            await deleteCourse(id)
            navigate(-1)
        } catch (error) {
            console.log(error)
            toast.error('Hata oldu')
        }
    }

    const handleClickAccept = async () => {
        if (course?.accepted) {
            const accepted = await acceptCourse({ data: { score: course?.score }, id })
            if (accepted) {
                getCourseData()
                toast.success('Onay kaldırıldı')
                setAcceptModal(false)
            } else {
                toast.error('Onay kaldırılamadı')
            }
        } else {
            setAcceptModal(true)
        }
    }

    useEffect(() => {
        getCourseData()
    }, [id])
    return (
        <CurrentPage>
            <PageHeader title={course?.title} />
            <div className='p-5 mt-14'>
                <img src={course?.avatar} alt="course img" className='max-w-[600px] block max-h-[300px] mb-5 object-cover' />
                {course?.accepted ?
                    <h2 className='flex gap-2 items-center font-semibold text-xl text-green-600 my-5'>
                        <FaRegCheckCircle /> Onaylandı
                    </h2>
                    :
                    <h2 className='my-5 text-xl font-semibold text-red-600 flex items-center gap-2'>
                        <LuClock /> Onay bekliyor
                    </h2>}
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
                        {course?.categoryName}
                    </h2>
                    <p className='text-main-color text-opacity-80'>
                        {course?.description}
                    </p>
                    <a href={course?.link} target='_self' className='text-blue-500 w-fit'>{course?.link}</a>
                    <p className='text-lg text-main-color'>Adres: {course?.address}</p>
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
                            Sil
                        </button>
                        {currentUser.role === "admin" &&
                            <button
                                onClick={handleClickAccept}
                                className='rounded w-24 h-10 flex justify-center items-center text-white font-medium bg-lime-700 uppercase leading-4'
                            >
                                {course?.accepted ? 'Onayı kaldır' : 'Onayla'}
                            </button>}
                    </div>}
                </div>
            </div>
            {updateModal && <UpdateCourse closeModal={setUpdateModal} getNewData={getCourseData} />}
            {deleteModal && <DeleteAlert
                setModal={setDeleteModal}
                deleteOperation={deleteCurrentData}
            />}
            {(acceptModal && !course?.accepted) &&
                <AcceptCourse
                    setModal={setAcceptModal}
                    getData={getCourseData}
                />
            }
        </CurrentPage >
    )
}

export default Course;