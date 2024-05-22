import React from 'react'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import { MdError } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { updateGiftType } from '../../controllers/gift_type.controller'
import toast from 'react-hot-toast'

const UpdateGiftType = ({ modalIsOpen, getData, giftType }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            title: giftType.title
        }
    })

    const onSubmit = async (data) => {
        if (data.title === giftType.title) {
            return modalIsOpen(false)
        }
        const res = await updateGiftType({ id: giftType._id, data })
        if (res.status === 200) {
            getData()
            toast.success('Başarıyla güncellendi')
            modalIsOpen(false)
        } else {
            toast.error(res?.response?.data || 'Hata oldu')
        }
    }
    return (
        <Modal>
            <form className='w-1/3 p-5 bg-white rounded-sm relative flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <button
                    type='button'
                    onClick={() => modalIsOpen(false)}
                    className='absolute right-5 duration-150 hover:bg-slate-100 p-2 hover:text-main-color rounded'
                >
                    <IoMdClose />
                </button>
                <div className='flex flex-col gap-2 mt-10'>
                    <label htmlFor="title">Başlık</label>
                    <input
                        type="text"
                        className='p-2 outline-none border border-main-color rounded'
                        placeholder='Başlık'
                        {...register("title", { required: "Başlık boş bırakılamaz" })}
                        autoFocus
                    />
                    {errors.title && <span className='text-xs font-semibold flex items-center gap-2 text-red-600'>
                        <MdError />
                        {errors.title?.message}
                    </span>}
                </div>
                <div className='flex justify-start'>
                    <button
                        type='submit'
                        className='px-4 py-2 bg-main-color text-white rounded-sm'
                    >
                        Gönder
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default UpdateGiftType;