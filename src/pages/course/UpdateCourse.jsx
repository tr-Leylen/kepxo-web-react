import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { getCourse, updateCourse } from '../../controllers/course.controller'
import { MdError } from 'react-icons/md'
import { getCategories } from '../../controllers/category.controller'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { uploadImage } from '../../controllers/general.controller'

const UpdateCourse = ({ closeModal, getNewData }) => {
    const { currentUser } = useSelector(state => state.user)
    const [categories, setCategories] = useState([])
    const [courseData, setCourseData] = useState({})
    const [newImage, setNewImage] = useState()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { id } = useParams()

    const getCourseData = async () => {
        const courseData = await getCourse(id)
        let course = courseData.data
        if (course) {
            setValue("title", course?.title)
            setValue("description", course?.description)
            setValue("address", course?.address)
            setValue("categoryId", course?.categoryId)
            setValue("date", course?.date)
            setValue("avatar", course?.avatar)
            setValue("link", course?.link)
            setCourseData(course)
        }
    }

    const getCategoryData = async () => {
        const response = await getCategories()
        setCategories(response)
    }

    const onsubmit = async (data) => {
        if (newImage) {
            const formData = new FormData()
            formData.append('file', newImage)
            const avatar = await uploadImage(formData)
            data.avatar = avatar.data?.url;
        }
        const res = await updateCourse({ id, data })
        if (res) {
            getNewData()
            toast.success('Kurs güncellendi')
            closeModal(false)
        } else {
            toast.error('Kurs güncellenemedi')
        }
    }

    useEffect(() => {
        getCourseData()
    }, [id])

    useEffect(() => {
        getCategoryData()
    }, [])


    return (
        <Modal>
            <form
                onSubmit={handleSubmit(onsubmit)}
                className='w-1/2 bg-white h-[500px] overflow-y-auto flex flex-col gap-5 text-main-color relative py-10'
            >
                <button
                    className='hover:bg-gray-100 absolute top-5 right-5 rounded-full p-2 text-2xl cursor-pointer'
                    onClick={() => closeModal(false)}
                >
                    <IoMdClose />
                </button>
                <h2 className='text-center text-2xl font-semibold uppercase'>Kurs Güncelle</h2>
                <div className='flex flex-col gap-2 px-10'>
                    <label htmlFor="title">Başlık</label>
                    <input
                        type="text"
                        {...register("title", { required: 'Bu alan boş bırakılamaz' })}
                        placeholder='Başlık'
                        id='title'
                        className='border rounded-sm outline-none p-2'
                    />
                    {errors.title && <span className='text-red-600 text-xs font-semibold flex items-center gap-2'>
                        <MdError />
                        {errors.title?.message}
                    </span>}
                </div>
                <div className='flex flex-col gap-2 px-10'>
                    <label htmlFor="description">Açıklama</label>
                    <textarea
                        type="text"
                        {...register("description")}
                        placeholder='Açıklama'
                        id='description'
                        className='border rounded-sm outline-none p-2 resize-none h-[150px]'
                    />
                </div>
                <div className='flex flex-col gap-2 px-10'>
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="file"
                        {...register("avatar")}
                        placeholder='Avatar'
                        id='avatar'
                        accept='image/*'
                        className='border rounded-sm outline-none p-2'
                        onChange={e => setNewImage(e.target.files[0])}
                    />
                    {errors.avatar && <span className='text-red-600 text-xs font-semibold flex items-center gap-2'>
                        <MdError />
                        {errors.avatar?.message}
                    </span>}
                    <div className='w-full h-60'>
                        {<img src={newImage ? URL.createObjectURL(newImage) : `${import.meta.env.VITE_IMAGE_URL}${courseData.avatar}`} className='h-full w-full object-contain' />}
                    </div>
                </div>
                <div className='flex flex-col gap-2 px-10'>
                    <label htmlFor="category">Kategori</label>
                    <select
                        {...register("categoryId", { required: 'Bu alan boş bırakılamaz' })}
                        className='border rounded-sm outline-none p-2'
                        id='category'
                    >
                        <option></option>
                        {categories.map(category => (
                            <option selected={category._id === courseData?.categoryId} value={category._id} key={category._id}>{category.title}</option>
                        ))}
                    </select>
                    {errors.categoryId && <span className='text-red-600 text-xs font-semibold flex items-center gap-2'>
                        <MdError />
                        {errors.categoryId?.message}
                    </span>}
                </div>
                <div className='flex flex-col gap-2 px-10'>
                    <label htmlFor="link">Link</label>
                    <input
                        type="text"
                        {...register("link", { required: 'Bu alan boş bırakılamaz' })}
                        placeholder='Link'
                        id='link'
                        className='border rounded-sm outline-none p-2'
                    />
                    {errors.link && <span className='text-red-600 text-xs font-semibold flex items-center gap-2'>
                        <MdError />
                        {errors.link?.message}
                    </span>}
                </div>
                <div className='flex flex-col gap-2 px-10'>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        {...register("date", { required: 'Bu alan boş bırakılamaz' })}
                        id='date'
                        className='border rounded-sm outline-none p-2'
                    />
                    {errors.date && <span className='text-red-600 text-xs font-semibold flex items-center gap-2'>
                        <MdError />
                        {errors.date?.message}
                    </span>}
                </div>
                <div className='flex flex-col gap-2 px-10'>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        {...register("address")}
                        id='address'
                        className='border rounded-sm outline-none p-2'
                        placeholder='Address'
                    />
                </div>
                <div className='flex items-start px-10'>
                    <button
                        type='submit'
                        className='bg-main-color text-white px-3 py-1'
                    >
                        Gönder
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default UpdateCourse