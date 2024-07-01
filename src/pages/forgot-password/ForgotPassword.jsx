import React from 'react'
import { useForm } from 'react-hook-form'
import { forgotPassword } from '../../controllers/login.controller'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const submit = async (data) => {
        const res = await forgotPassword(data);
        if (res.status === 200) {
            toast.success('Mailinizi kontrol edin')
        } else {
            toast.error('Hata oldu')
        }
    }
    return (
        <main className='p-5'>
            <h2 className='uppercase text-2xl text-main-color font-semibold text-center'>
                Forgot Password
            </h2>
            <form
                className='w-1/3 mx-auto mt-10 flex flex-col gap-2'
                onSubmit={handleSubmit(submit)}
            >
                <label htmlFor="email">Email</label>
                <input
                    id='email'
                    type="email"
                    className='px-2 py-1 border outline-none rounded-sm'
                    {...register("email", { required: "Bu alan boş bırakılamaz" })}
                />
                <button
                    className='py-2 bg-main-color text-white rounded-sm'
                    type='submit'
                >
                    Gönder
                </button>
                <Link to={'/login'} className='w-full bg-slate-200 p-2 rounded-sm text-center'>
                    Logine dön
                </Link>
            </form>
        </main>
    )
}

export default ForgotPassword