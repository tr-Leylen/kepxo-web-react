import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoCloseOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { MdError } from 'react-icons/md';
import { createConference } from '../../controllers/conference.controller';
import toast from 'react-hot-toast';

const CreateConference = ({ modalIsOpen, getData }) => {
    const [speakers, setSpeakers] = useState([])
    const { formState: { errors }, register, handleSubmit } = useForm()
    const inputRef = useRef()
    const addName = () => {
        if (inputRef.current.value) {
            setSpeakers([...speakers, inputRef.current.value])
            inputRef.current.value = ''
        }
    }

    const removeSpeaker = (speaker) => {
        let newArray = speakers.filter(item => item != speaker)
        setSpeakers(newArray)
    }

    const submit = async (data) => {
        data.speakers = speakers
        const conference = await createConference(data)
        if (conference.status == 201) {
            getData()
            toast.success('Başarıyla yaratıldı')
            modalIsOpen(false)
        } else {
            toast.error(conference?.response?.data || "Hata oldu")
        }
    }
    return (
        <form
            onSubmit={handleSubmit(submit)}
            className='w-1/2 bg-white p-5 relative flex flex-col gap-5 overflow-auto h-[500px]'
        >
            <button
                type='button'
                onClick={() => modalIsOpen(false)}
                className='absolute top-2 right-2 rounded-sm p-2 text-lg hover:bg-slate-100 duration-150 hover:text-main-color'
            >
                <IoCloseOutline />
            </button>
            <div className='flex flex-col gap-2 mt-5'>
                <label htmlFor="title">Başlık</label>
                <input
                    type="text"
                    id='title'
                    placeholder='Başlık'
                    className='p-2 rounded outline-none border'
                    {...register("title", { required: "Bu alan boş bırakılamaz" })}
                />
                {errors.title && <span className='flex gap-2 items-center text-xs font-semibold text-red-600'>
                    <MdError />
                    {errors.title?.message}
                </span>}
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="date">Tarih</label>
                <input
                    type="date"
                    className='p-2 rounded outline-none border'
                    {...register("date", { required: "Tarih boş bırakılamaz" })}
                    id='date'
                />
                {errors.date && <span className='flex gap-2 items-center text-xs font-semibold text-red-600'>
                    <MdError />
                    {errors.date?.message}
                </span>}
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="address">Adres</label>
                <input
                    type="address"
                    className='p-2 rounded outline-none border'
                    {...register("address")}
                    id='address'
                    placeholder='Adres'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="link">Link</label>
                <input
                    type="link"
                    className='p-2 rounded outline-none border'
                    {...register("link")}
                    id='link'
                    placeholder='Link'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="speakers">Konuşmacılar</label>
                <div className='flex gap-3'>
                    <input
                        type="text"
                        id='speakers'
                        placeholder='Konuşmacılar'
                        className='p-2 rounded outline-none border w-1/2'
                        ref={inputRef}
                    />
                    <button
                        type='button'
                        className='bg-main-color text-white px-4 text-xl rounded-sm'
                        onClick={addName}
                    >
                        +
                    </button>
                </div>
                <ul className='flex flex-col gap-3 mt-2'>
                    {speakers.map(speaker => (
                        <li
                            className='flex items-center gap-5'
                        >
                            {speaker}
                            <IoRemoveCircleOutline
                                className='cursor-pointer text-red-600'
                                onClick={() => removeSpeaker(speaker)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex justify-start'>
                <button
                    type='submit'
                    className='text-white bg-main-color px-3 py-2 rounded-sm'
                >
                    Gönder
                </button>
            </div>
        </form>
    )
}

export default CreateConference