import React from 'react'
import logo from '../../assets/kepxo-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../../controllers/login.controller'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/userSlice'
import toast from 'react-hot-toast'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        const user = await login(data)
        if (user._id) {
            dispatch(signIn(user))
            toast.success("Welcome")
            navigate("/")
        } else {
            toast.error(user.response?.data || user)
        }
    }
    return (
        <main className='flex items-center justify-center h-screen'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='border text-main-color rounded-md p-4 border-main-color w-full max-w-[400px] flex flex-col gap-4'>
                <div className="px-4 flex items-center justify-center">
                    <img src={logo} alt="logo" className='h-20' />
                </div>
                <h2 className='font-extrabold text-xl  text-center'>
                    HOŞ GELDİNİZ
                </h2>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="username" className=' font-semibold'>
                        Kullanıcı Adı
                    </label>
                    <input
                        {...register("username", { required: 'Bu alan boş bırakılamaz' })}
                        type="text"
                        id='username'
                        className='outline-none border border-main-color rounded-md px-3 py-2'
                    />
                    {errors.username &&
                        <span className='text-xs text-red-600'>
                            {errors.username?.message}
                        </span>
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password" className='font-semibold'>
                        Şifre
                    </label>
                    <input
                        {...register("password", {
                            required: "Bu alan boş bırakılamaz",
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters"
                            }
                        })}
                        type="password"
                        id='password'
                        className='outline-none border border-main-color rounded-md px-3 py-2'
                    />
                    <span className='text-xs text-red-600'>
                        {errors.password?.message}
                    </span>
                </div>
                <button
                    type='submit'
                    className='font-semibold text-lg text-white bg-main-color w-[120px] mx-auto py-2 rounded-xl mb-2.5'>
                    GİRİŞ
                </button>
                <Link to="/forgot-password" className='font-medium text-center'>
                    Şifreni mi unuttun?
                </Link>
            </form>
        </main>
    )
}

export default Login