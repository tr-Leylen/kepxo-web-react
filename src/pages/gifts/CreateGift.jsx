import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import { MdError } from 'react-icons/md'
import { getAllGiftTypes } from '../../controllers/gift_type.controller'
import { GoStarFill, GoStar } from "react-icons/go";
import { GrPowerReset } from "react-icons/gr";
import { IoMdClose } from 'react-icons/io'
import { createGift } from '../../controllers/gift.controller'
import toast from 'react-hot-toast'
import { uploadImage } from '../../controllers/general.controller'

const CreateGift = ({ modalIsOpen, getData }) => {
    const [image, setImage] = useState(null)
    const [giftImg, setGiftImg] = useState(null)
    const [giftStar, setGiftStar] = useState(0)
    const [types, setTypes] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm()

    const getTypes = async () => {
        const res = await getAllGiftTypes()
        setTypes(res.data)
    }

    const changeStar = value => {
        setGiftStar(value)
    }

    const submitForm = async (data) => {
        if (image) {
            const formData = new FormData()
            formData.append('file', image)
            const imgURL = await uploadImage(formData)
            data.image = imgURL.data?.url;
        }
        data.star = giftStar
        const res = await createGift(data)
        if (res.status == 201) {
            getData()
            toast.success('Başarıyla yaratıldı')
            modalIsOpen(false)
        } else {
            toast.error(res.response?.data || 'Hata oldu')
        }
    }

    useEffect(() => {
        getTypes()
    }, [])
    return (
        <Modal>
            <form
                onSubmit={handleSubmit(submitForm)}
                className='w-1/3 bg-white rounded-sm p-5 pt-10 flex flex-col gap-5 relative h-[500px] overflow-auto'
            >
                <button
                    onClick={() => modalIsOpen(false)}
                    type='button'
                    className='absolute right-4 top-4 hover:bg-slate-100 duration-200 text-main-color p-2 rounded'
                >
                    <IoMdClose />
                </button>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="title">Başlık</label>
                    <input
                        id='title'
                        type="text"
                        className='outline-none border border-main-color rounded p-2'
                        placeholder='Başlık'
                        {...register("title", { required: "Başlık boş bırakılamaz" })}
                    />
                    {errors.title &&
                        <span className='flex items-center gap-2 text-xs text-red-600 font-semibold'>
                            <MdError />
                            {errors.title?.message}
                        </span>
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="score">Gerekli Puan</label>
                    <input
                        id='score'
                        type="number"
                        className='outline-none border border-main-color rounded p-2'
                        placeholder='Gerekli Puan'
                        onWheel={(e) => e.currentTarget.blur()}
                        {...register("score", { required: "Puan boş olamaz", valueAsNumber: true })}
                    />
                    {errors.score &&
                        <span className='flex items-center gap-2 text-xs text-red-600 font-semibold'>
                            <MdError />
                            {errors.score?.message}
                        </span>
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="star">Yıldız</label>
                    <p className='flex items-center gap-3 text-main-color'>
                        {[...Array(5)].map((_, index) => (
                            index + 1 <= giftStar ?
                                <GoStarFill className='cursor-pointer' onClick={() => changeStar(index + 1)} key={index} />
                                :
                                <GoStar key={index} className='cursor-pointer' onClick={() => changeStar(index + 1)} />
                        ))}
                        <button
                            onClick={() => setGiftStar(0)}
                            type='button'
                            className='bg-slate-100 p-2 rounded-sm active:bg-slate-200'
                        >
                            <GrPowerReset />
                        </button>
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="img">Hediye Fotosu</label>
                    {giftImg && <img src={giftImg} alt='img' className='w-full h-[200px] object-cover' />}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                            setGiftImg(URL.createObjectURL(e.target.files[0]))
                            setImage(e.target.files[0])
                        }}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="type">Hediye Kategorisi</label>
                    <select
                        {...register("giftType", { required: "Bu alan boş bırakılamaz" })}
                        className='outline-none border border-main-color p-2 rounded'
                        id='type'
                    >
                        <option></option>
                        {types.map(type =>
                            <option value={type._id} key={type._id}>{type.title}</option>
                        )}
                    </select>
                    {errors.giftType &&
                        <span className='flex items-center gap-2 text-xs text-red-600 font-semibold'>
                            <MdError />
                            {errors.giftType?.message}
                        </span>
                    }
                </div>
                <div className='flex justify-start'>
                    <button
                        className='px-4 py-2 rounded-sm text-white bg-main-color'
                        type='submit'
                    >
                        Gönder
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateGift