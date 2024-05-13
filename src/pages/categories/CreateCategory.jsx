import React from 'react'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import { MdError } from 'react-icons/md'
import { createCategory } from '../../controllers/category.controller'
import toast from 'react-hot-toast'

const CreateCategory = ({ modalisOpen, getData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const submit = async (data) => {
        const category = await createCategory(data)
        if (category._id) {
            getData()
            toast.success('Başarıyla tamamlandı')
            modalisOpen(false)
        } else {
            toast.error(category?.response?.data || 'Hata oluştu')
        }
    }
    return (
        <Modal>
            <form className='w-1/3 flex flex-col gap-5 p-5 bg-white' onSubmit={handleSubmit(submit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="title">Kategori</label>
                    <input
                        type="text"
                        id='title'
                        placeholder='Kategori'
                        className='outline-none p-2 border border-main-color'
                        {...register("title", { required: "Bu alan boş bırakılamaz" })}
                    />
                    {errors?.title && <span className='flex gap-2 items-center text-xs text-red-700'>
                        <MdError />
                        {errors?.title?.message}
                    </span>}
                </div>
                <div className='flex justify-start gap-5'>
                    <button
                        type='submit'
                        className='bg-main-color text-white px-3 py-1 rounded'
                    >
                        Gönder
                    </button>
                    <button onClick={() => modalisOpen(false)}>
                        Kapat
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateCategory