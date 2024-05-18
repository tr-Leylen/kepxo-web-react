import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { getUser, updateUser } from '../../controllers/user.controller';
import toast from 'react-hot-toast';
import { IoCloseOutline } from 'react-icons/io5';
import { MdError } from 'react-icons/md';

const UpdateUser = ({ userId, modalIsOpen, getData }) => {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm()
    const getUserData = async () => {
        const user = await getUser(userId)
        if (user) {
            setValue("username", user?.username)
            setValue("email", user?.email)
            setValue("firstName", user?.firstName)
            setValue("lastName", user?.lastName)
            setValue("phone", user?.phone)
            setValue("city", user?.city)
        } else {
            toast.error('Hata oldu!')
        }
    }

    const submit = async (data) => {
        const res = await updateUser({ userId, data })
        if (res.status === 200) {
            getData()
            toast.success('User updated')
            modalIsOpen(false)
        } else {
            toast.error(res.response.data || 'Hata oldu!')
        }
    }

    useEffect(() => {
        getUserData()
    }, [userId])
    return (
        <form
            onSubmit={handleSubmit(submit)}
            className='w-1/3 bg-white h-[500px] overflow-auto flex flex-col gap-4 text-main-color p-5 relative'
        >
            <button
                type='button'
                onClick={() => modalIsOpen(false)}
                className='absolute top-2 right-2 w-fit p-2 hover:bg-slate-100 text-xl'
            >
                <IoCloseOutline />
            </button>
            <div className='flex flex-col gap-2 mt-5'>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id='username'
                    placeholder='Username'
                    className='border rounded px-3 py-2 outline-none border-main-color text-sm'
                    {...register("username", { required: "Bu alan boş bırakılamaz" })}
                />
                {errors.username &&
                    <span className='text-red-700 text-xs flex items-center gap-2 font-semibold'>
                        <MdError />
                        {errors.username?.message}
                    </span>}
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id='email'
                    placeholder='Email'
                    className='border rounded px-3 py-2 outline-none border-main-color text-sm'
                    {...register("email", { required: "Bu alan boş bırakılamaz" })}
                />
                {errors.email &&
                    <span className='text-red-700 text-xs flex items-center gap-2 font-semibold'>
                        <MdError />
                        {errors.email?.message}
                    </span>}
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="firstName">Ad</label>
                <input
                    type="text"
                    id='firstName'
                    placeholder='Ad'
                    className='border rounded px-3 py-2 outline-none border-main-color text-sm'
                    {...register("firstName", { required: "Bu alan boş bırakılamaz" })}
                />
                {errors.firstName &&
                    <span className='text-red-700 text-xs flex items-center gap-2 font-semibold'>
                        <MdError />
                        {errors.firstName?.message}
                    </span>}
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="lastName">Soyad</label>
                <input
                    type="text"
                    id='lastName'
                    placeholder='Soyad'
                    className='border rounded px-3 py-2 outline-none border-main-color text-sm'
                    {...register("lastName", { required: "Bu alan boş bırakılamaz" })}
                />
                {errors.lastName &&
                    <span className='text-red-700 text-xs flex items-center gap-2 font-semibold'>
                        <MdError />
                        {errors.lastName?.message}
                    </span>}
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="phone">Telefon</label>
                <input
                    type="tel"
                    id='phone'
                    placeholder='Telefon'
                    className='border rounded px-3 py-2 outline-none border-main-color text-sm'
                    {...register("phone")}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="city">Şehir</label>
                <input
                    type="tel"
                    id='city'
                    placeholder='Şehir'
                    className='border rounded px-3 py-2 outline-none border-main-color text-sm'
                    {...register("city")}
                />
            </div>
            <div className='flex justify-start mt-10'>
                <button
                    type='submit'
                    className='bg-main-color text-white px-3 py-2'
                >
                    Gönder
                </button>
            </div>
        </form>
    )
}

export default UpdateUser;