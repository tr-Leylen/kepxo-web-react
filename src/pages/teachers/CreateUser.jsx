import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdError } from 'react-icons/md'
import { registerUser } from '../../controllers/login.controller'
import toast from 'react-hot-toast'
import { IoCloseOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";

const CreateUser = ({ getData, modalIsOpen, userType = 'user' }) => {
    const [showPass, setShowPass] = useState(false)
    const { formState: { errors }, handleSubmit, register } = useForm()
    const submit = async (data) => {
        data.role = userType
        const res = await registerUser(data)
        if (res.status == 201) {
            getData()
            toast.success('Kullanıcı başarıyla yaratıldı')
            modalIsOpen(false)
        } else {
            toast.error(res.response?.data || 'Hata oldu')
        }
    }
    return (
        <form
            onSubmit={handleSubmit(submit)}
            className='w-1/3 bg-white h-[500px] overflow-auto flex flex-col gap-4 text-main-color p-5 relative'
        >
            <button
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
                <label htmlFor="password">Parola</label>
                <div className='relative'>
                    <input
                        type={showPass ? 'text':'password'}
                        id='password'
                        placeholder='Parola'
                        className='border rounded px-3 py-2 outline-none border-main-color text-sm w-full pr-10'
                        {...register("password", {
                            required: "Bu alan boş bırakılamaz", minLength: {
                                value: 6, message: "Minimum uzunluk:6"
                            }
                        })}
                    />
                    <button
                        type='button'
                        className='absolute right-1 h-full rounded-full top-0 aspect-square flex items-center justify-center'
                        onClick={() => setShowPass(prev => !prev)}
                    >
                        {showPass ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>
                {errors.password &&
                    <span className='text-red-700 text-xs flex items-center gap-2 font-semibold'>
                        <MdError />
                        {errors.password?.message}
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

export default CreateUser