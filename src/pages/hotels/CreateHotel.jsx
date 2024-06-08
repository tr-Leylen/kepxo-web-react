import React, { useState } from 'react'
import Modal from '../../components/Modal'
import { IoClose } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import InputError from '../../components/InputError';
import InputDiv from '../../components/InputDiv';
import { GoStar, GoStarFill } from 'react-icons/go';
import { GrPowerReset } from 'react-icons/gr';
import { createHotel, uploadHotelImage } from '../../controllers/hotel.controller';
import toast from 'react-hot-toast';

const CreateHotel = ({ modalIsOpen, getData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [hotelStar, setHotelStar] = useState(0)
    const [imageURL, setImageURL] = useState([])
    const [image, setImage] = useState([])

    const changeStar = value => setHotelStar(value)

    const submitForm = async (data) => {
        data.star = hotelStar
        data.images = []
        if (image.length > 0) {
            for (let i = 0; i < image.length; i++) {
                const formData = new FormData()
                formData.append('file', image[i])
                const imgURL = await uploadHotelImage(formData)
                data.images = [...data.images, imgURL.data?.url]
            }
        }
        data.star = hotelStar
        const res = await createHotel(data)
        if (res.status === 201) {
            getData()
            toast.success('Hotel created')
            modalIsOpen(false)
        } else {
            toast.error(res.response?.data || 'Hata oldu')
        }
    }
    return (
        <Modal>
            <form
                className='bg-white w-1/3 p-5 flex flex-col gap-5 relative h-[500px] overflow-auto'
                onSubmit={handleSubmit(submitForm)}
            >
                <h2 className='font-semibold text-main-color uppercase text-xl'>
                    Hotel Yarat
                </h2>
                <button
                    onClick={() => modalIsOpen(false)}
                    type='button'
                    className='p-2 rounded-xl hover:bg-slate-100 text-main-color duration-150 absolute right-2'
                >
                    <IoClose />
                </button>
                <InputDiv>
                    <label htmlFor="title">Hotel adı</label>
                    <input
                        type="text"
                        id='title'
                        {...register("title", { required: "Başlık boş olamaz" })}
                        className='px-2 py-1 outline-none border border-main-color rounded'
                    />
                    {errors.title && <InputError message={errors.title.message} />}
                </InputDiv>
                <InputDiv>
                    <label htmlFor="city">Şehir</label>
                    <input
                        type="text"
                        id='city'
                        className='px-2 py-1 outline-none border border-main-color rounded'
                        {...register("city", { required: "Şehir boş olamaz" })}
                    />
                    {errors.city && <InputError message={errors.city.message} />}
                </InputDiv>
                <InputDiv>
                    <label htmlFor="star">Yıldız</label>
                    <p className='flex items-center gap-3 text-main-color'>
                        {[...Array(5)].map((_, index) => (
                            index + 1 <= hotelStar ?
                                <GoStarFill className='cursor-pointer' onClick={() => changeStar(index + 1)} key={index} />
                                :
                                <GoStar key={index} className='cursor-pointer' onClick={() => changeStar(index + 1)} />
                        ))}
                        <button
                            onClick={() => setHotelStar(0)}
                            type='button'
                            className='bg-slate-100 p-2 rounded-sm active:bg-slate-200'
                        >
                            <GrPowerReset />
                        </button>
                    </p>
                </InputDiv>
                <InputDiv>
                    <label htmlFor="avatar">Fotolar</label>
                    {imageURL.length > 0 &&
                        imageURL.map(url => (
                            <img src={url} alt='image' />
                        ))
                    }
                    <input
                        type="file"
                        className='px-2 py-1 outline-none border border-main-color rounded'
                        id='avatar'
                        accept='image/*'
                        onChange={e => {
                            setImageURL([...imageURL, URL.createObjectURL(e.target.files[0])])
                            setImage([...image, e.target.files[0]])
                        }}
                    />
                </InputDiv>
                <InputDiv>
                    <label htmlFor="desc">Açıklama</label>
                    <input
                        className='px-2 py-1 outline-none border border-main-color rounded'
                        id='desc'
                        {...register("description")}
                    />
                </InputDiv>
                <InputDiv>
                    <label htmlFor="address">Adres</label>
                    <input
                        className='px-2 py-1 outline-none border border-main-color rounded'
                        id='address'
                        {...register("address", { required: "Adres boş olamaz" })}
                    />
                    {errors.address && <InputError message={errors.address.message} />}
                </InputDiv>
                <div className='flex justify-start'>
                    <button
                        type='submit'
                        className='px-4 py-2 rounded text-white font-medium bg-main-color'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateHotel