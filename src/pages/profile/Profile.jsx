import React, { useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import InputDiv from '../../components/InputDiv'
import { uploadImage } from '../../controllers/general.controller'
import { updateUser } from '../../controllers/user.controller'
import toast from 'react-hot-toast'
import { signIn } from '../../redux/userSlice'

const Profile = () => {
    const [image, setImage] = useState(null)
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            email: currentUser?.email,
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            username: currentUser?.username,
            avatar: currentUser?.avatar
        }
    })
    const submitForm = async (data) => {
        if (image) {
            const formData = new FormData()
            formData.append('file', image)
            const imageURL = await uploadImage(formData)
            data.avatar = imageURL.data?.url;
        }
        const res = await updateUser({ userId: currentUser?._id, data })
        if (res.status === 200) {
            toast.success('Güncellendi')
            const token = currentUser?.token;
            res.data.token = token;
            dispatch(signIn(res.data))
            setImage(null)
        } else {
            toast.error(res.response?.data || 'Hata oldu')
        }
    }
    return (
        <CurrentPage>
            <PageHeader title='Profile' />
            <div className='mt-14 p-5 grid grid-cols-2 gap-10'>
                <form
                    onSubmit={handleSubmit(submitForm)}
                    className='flex flex-col gap-5 border p-5 rounded-sm'
                >
                    <InputDiv>
                        <label htmlFor="email">Email</label>
                        <input
                            id='email'
                            type="email"
                            {...register("email", { required: "Boş olamaz" })}
                            className='px-2 py-1 text-sm outline-none border rounded-sm border-main-color'
                        />
                    </InputDiv>
                    <InputDiv>
                        <label htmlFor="username">Username</label>
                        <input
                            id='username'
                            type="text"
                            {...register("username", { required: "Boş olamaz" })}
                            className='px-2 py-1 text-sm outline-none border rounded-sm border-main-color'
                        />
                    </InputDiv>
                    <InputDiv>
                        <label htmlFor="firstname">Ad</label>
                        <input
                            id='firstname'
                            type="text"
                            {...register("firstName", { required: "Boş olamaz" })}
                            className='px-2 py-1 text-sm outline-none border rounded-sm border-main-color'
                        />
                    </InputDiv>
                    <InputDiv>
                        <label htmlFor="lastname">Soyad</label>
                        <input
                            id='lastname'
                            type="text"
                            {...register("lastName", { required: "Boş olamaz" })}
                            className='px-2 py-1 text-sm outline-none border rounded-sm border-main-color'
                        />
                    </InputDiv>
                    <InputDiv>
                        <label htmlFor="avatar">Profil resmi</label>
                        {image && <img src={URL.createObjectURL(image)} alt="new image" />}
                        <input
                            onChange={e => setImage(e.target.files[0])}
                            type="file"
                            className='px-2 py-1 text-sm outline-none border rounded-sm border-main-color'
                        />
                    </InputDiv>
                    <div className='flex items-center justify-start'>
                        <button
                            type='submit'
                            className='px-4 py-2 rounded-sm bg-main-color text-white'
                        >
                            Güncelle
                        </button>
                    </div>
                </form>
                {currentUser?.avatar && <div className='border px-5 py-3 rounded-sm h-fit'>
                    <h2 className='mb-2'>Profil fotoğrafı</h2>
                    <img src={`${import.meta.env.VITE_IMAGE_URL}${currentUser?.avatar}`} alt="user image" className='w-full h-full object-contain' />
                </div>}
            </div>
        </CurrentPage>
    )
}

export default Profile