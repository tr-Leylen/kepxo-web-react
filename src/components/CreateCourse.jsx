import React from 'react'
import { useForm } from 'react-hook-form'
import { createCourse } from '../controllers/course.controller'
import toast from 'react-hot-toast'

const CreateCourse = ({ closeModal, getCourses }) => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const submit = async (data) => {
        const course = await createCourse(data)
        if (course) {
            toast.success('Kurs başarıyla yaratıldı')
            getCourses()
            closeModal(false)
        } else {
            toast.error('Kurs yaratılamadı')
        }
    }
    return (
        <form
            onSubmit={handleSubmit(submit)}
            className='w-1/2 bg-white h-[500px] overflow-y-auto flex flex-col gap-5 text-main-color py-10'
        >
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
                {errors.title && <span className='text-red-600 text-xs font-semibold'>{errors.title?.message}</span>}
            </div>
            <div className='flex flex-col gap-2 px-10'>
                <label htmlFor="avatar">Avatar</label>
                <input
                    type="text"
                    {...register("avatar", { required: 'Bu alan boş bırakılamaz' })}
                    placeholder='Avatar'
                    id='avatar'
                    className='border rounded-sm outline-none p-2'
                />
                {errors.avatar && <span className='text-red-600 text-xs font-semibold'>{errors.avatar?.message}</span>}
            </div>
            <div className='flex flex-col gap-2 px-10'>
                <label htmlFor="category">Kategori</label>
                <input
                    type="text"
                    {...register("categoryId", { required: 'Bu alan boş bırakılamaz' })}
                    placeholder='Kategori'
                    id='category'
                    className='border rounded-sm outline-none p-2'
                />
                {errors.categoryId && <span className='text-red-600 text-xs font-semibold'>{errors.categoryId?.message}</span>}
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
                {errors.link && <span className='text-red-600 text-xs font-semibold'>{errors.link?.message}</span>}
            </div>
            <div className='flex flex-col gap-2 px-10'>
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    {...register("date", { required: 'Bu alan boş bırakılamaz' })}
                    id='date'
                    className='border rounded-sm outline-none p-2'
                />
                {errors.date && <span className='text-red-600 text-xs font-semibold'>{errors.date?.message}</span>}
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