import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import InputError from '../../components/InputError';
import { resetPassword } from '../../controllers/login.controller';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [show, setShow] = useState(false)
    const params = useParams();
    const token = params.token;
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const submit = async (data) => {
        const res = await resetPassword(data)
        if (res.status === 200) {
            navigate('/login')
        } else {
            toast.error('Hata oldu')
        }
    }
    return (
        <main className='p-5'>
            <h2 className='text-main-color text-3xl font-semibold uppercase text-center'>Reset Password</h2>
            <form
                onSubmit={handleSubmit(submit)}
                className='mx-auto w-1/3 mt-10 flex flex-col gap-2'
            >
                <label htmlFor="password">Yeni Parola</label>
                <div className='flex border rounded-sm'>
                    <input
                        id='password'
                        type={show ? "text" : "password"}
                        className='px-2 py-1 w-full outline-none'
                        {...register("newPassword", {
                            required: {
                                message: "Bu alan boş bırakılamaz"
                            },
                            minLength: {
                                message: "Parola minimum 6 karakterli olmalıdır",
                                value: 6
                            }
                        })}
                    />
                    <span
                        onClick={() => setShow(prev => !prev)}
                        className='w-[30px] flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all duration-200'
                    >
                        {show ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.newPassword && <InputError message={errors.newPassword?.message} />}
                <input
                    type="text"
                    value={token}
                    className='hidden'
                    {...register("token", { required: true })}
                />
                <button
                    type='submit'
                    className='bg-main-color rounded-sm text-white p-2'
                >
                    Gönder
                </button>
            </form>
        </main>
    )
}

export default ResetPassword