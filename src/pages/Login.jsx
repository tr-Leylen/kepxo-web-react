import React from 'react'
import logo from '../assets/kepxo-logo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Login = () => {
    // const { currentUser } = useSelector(state => state.user)
    // console.log(currentUser)
    const data = useSelector(state=>state.user)
    console.log(data)
    return (
        <main className='flex items-center justify-center h-screen'>
            <form className='border text-main-color rounded-md p-4 border-main-color w-full max-w-[400px] flex flex-col gap-4'>
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
                        type="text"
                        id='username'
                        className='outline-none border border-main-color rounded-md px-3 py-2'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password" className='font-semibold'>
                        Şifre
                    </label>
                    <input
                        type="password"
                        id='password'
                        className='outline-none border border-main-color rounded-md px-3 py-2'
                    />
                </div>
                <button className='font-semibold text-lg text-white bg-main-color w-[120px] mx-auto py-2 rounded-xl mb-2.5'>
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