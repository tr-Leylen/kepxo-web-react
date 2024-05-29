import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createCourse, uploadImage } from '../../controllers/course.controller'
import toast from 'react-hot-toast'
import { IoMdClose } from "react-icons/io";
import { MdError } from "react-icons/md";
import { useSelector } from 'react-redux';
import { getCategories } from '../../controllers/category.controller';
import { getTeachers, getUser } from '../../controllers/user.controller';
import TeacherItem from './TeacherItem';

const CreateCourse = ({ closeModal, createdBy = "teacher" }) => {
    const { currentUser } = useSelector(state => state.user)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [categories, setCategories] = useState([])
    const [teachers, setTeachers] = useState([])

    const submit = async (data) => {
        const avatar = await uploadImage({
            userId: createdBy === 'admin' ? data.ownerId : currentUser._id,
            file: data.avatar[0],
            title: data.title
        })
        data.avatar = avatar
        const course = await createCourse(data)
        if (course) {
            toast.success('Kurs başarıyla yaratıldı')
            closeModal(false)
        } else {
            toast.error('Kurs yaratılamadı')
        }
    }

    const categoriesData = async () => {
        const data = await getCategories()
        setCategories(data)
    }

    const getTeachersData = async () => {
        const data = await getTeachers()
        setTeachers(data)
    }

    useEffect(() => {
        categoriesData()
        createdBy === 'admin' && getTeachersData()
    }, [])

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className='w-1/2 bg-white h-[500px] overflow-y-auto flex flex-col gap-5 text-main-color relative py-10'
        >
            <button
                className='hover:bg-gray-100 absolute top-5 right-5 rounded-full p-2 text-2xl cursor-pointer'
                onClick={() => closeModal(false)}
            >
                <IoMdClose />
            </button>
            <h2 className='text-center text-2xl font-semibold uppercase'>Kurs yarat</h2>
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
            {createdBy === 'admin' && <div className='flex flex-col gap-2 px-10'>
                <label htmlFor="teacher">Öğretmen</label>
                <select
                    {...register("ownerId", { required: 'Bu alan boş bırakılamaz' })}
                    className='border rounded-sm outline-none p-2'
                    id='teacher'
                >
                    <option></option>
                    {teachers.map(teacher => (
                        <TeacherItem teacher={teacher} key={teacher} />
                    ))}
                </select>
                {errors.ownerId && <span className='text-red-600 text-xs font-semibold flex items-center gap-2'>
                    <MdError />
                    {errors.ownerId?.message}
                </span>}
            </div>}
            <div className='flex flex-col gap-2 px-10'>
                <label htmlFor="description">Açıklama</label>
                <textarea
                    type="text"
                    {...register("description")}
                    placeholder='Açıklama'
                    id='description'
                    className='border rounded-sm outline-none p-2 resize-none'
                />
            </div>
            <div className='flex flex-col gap-2 px-10'>
                <label htmlFor="avatar">Avatar</label>
                <input
                    type="file"
                    {...register("avatar", { required: 'Bu alan boş bırakılamaz' })}
                    placeholder='Avatar'
                    id='avatar'
                    accept='image/*'
                    className='border rounded-sm outline-none p-2'
                />
                {errors.avatar && <span className='text-red-600 text-xs font-semibold flex items-center gap-2'>
                    <MdError />
                    {errors.avatar?.message}
                </span>}
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
                        <option value={category?._id}>{category?.title}</option>
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
    )
}

export default CreateCourse