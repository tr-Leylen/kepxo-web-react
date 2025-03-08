import React, { useState } from 'react'
import Modal from '../../components/Modal'
import { IoClose } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import InputError from '../../components/InputError';
import InputDiv from '../../components/InputDiv';
import { GoStar, GoStarFill } from 'react-icons/go';
import { GrPowerReset } from 'react-icons/gr';
import { createHotel } from '../../controllers/hotel.controller';
import toast from 'react-hot-toast';
import { uploadImage } from '../../controllers/general.controller';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';

const CreateHotel = ({ modalIsOpen, getData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [hotelStar, setHotelStar] = useState(0)
    const [imageURL, setImageURL] = useState([])
    const [image, setImage] = useState([])

    const changeStar = value => setHotelStar(value)

    const submitForm = async (data) => {
        try {
            data.star = hotelStar
            data.images = []
            if (image.length > 0) {
                for (let i = 0; i < image.length; i++) {
                    const formData = new FormData()
                    formData.append('file', image[i])
                    const imgURL = await uploadImage(formData)
                    data.images = [...data.images, imgURL.data?.url]
                }
            }
            data.star = hotelStar
            const res = await createHotel(data)
            if (res.status === 201) {
                getData()
                toast.success('Hotel created')
                modalIsOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleImages = (images = []) => {
        try {
            const filesArray = Array.from(images)
            const objectURLs = filesArray?.map(item => URL.createObjectURL(item))
            setImageURL(prev => ([...prev, ...objectURLs]))
            setImage(prev => ([...prev, ...filesArray]))
        } catch (error) {
            console.log(error)
        }
    }

    const removeImage = (index) => {
        try {
            setImageURL(prev => prev.filter((_, i) => i !== index))
            setImage(prev => prev.filter((_, i) => i !== index))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal>
            <form
                className='bg-white w-1/2 p-5 flex flex-col gap-5 relative h-[70vh] overflow-auto'
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
                    <label htmlFor="avatar" className='px-2 py-1 outline-none border border-main-color rounded flex items-center gap-2'>
                        <MdOutlineDriveFolderUpload />
                        <p className='flex items-center gap-2'>
                            <span>Fotoğrafları seç</span>
                            <span className='text-gray-400'>: {image.length}</span>
                        </p>
                    </label>
                    <input
                        type="file"
                        multiple
                        className='px-2 py-1 outline-none border border-main-color rounded hidden'
                        id='avatar'
                        accept='image/*'
                        onChange={e => handleImages(e.target.files)}
                    />
                    <div className='grid grid-cols-2 gap-2'>
                        {imageURL.length > 0 &&
                            imageURL.map((url, index) => (
                                <div key={index} className='mb-2 border border-main-color relative max-h-[200px]'>
                                    <button
                                        type='button'
                                        className='p-1 absolute bg-slate-100 top-1 right-1 rounded-full'
                                        onClick={() => removeImage(index)}
                                    >
                                        <IoIosCloseCircleOutline />
                                    </button>
                                    <img src={url} alt='image' className='object-cover w-full h-full' />
                                </div>
                            ))
                        }
                    </div>
                </InputDiv>
                <InputDiv>
                    <label htmlFor="score">Puan</label>
                    <input
                        type='number'
                        className='px-2 py-1 outline-none border border-main-color rounded'
                        id='score'
                        onWheel={(e) => e.currentTarget.blur()}
                        {...register("score", { required: "Puan boş olamaz", valueAsNumber: true, min: {value:0, message:'Puan minimum 0 olabilir'} })}
                    />
                    {errors.score && <InputError message={errors.score.message} />}
                </InputDiv>
                <InputDiv>
                    <label htmlFor="desc">Açıklama</label>
                    <textarea
                        className='px-2 py-1 outline-none border border-main-color rounded resize-none h-[150px]'
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