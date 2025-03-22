import React, { useState } from 'react'
import { FaRegImage } from "react-icons/fa6";
import { GoStarFill, GoStar } from "react-icons/go";
import { TbPhotoEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import UpdateHotel from './UpdateHotel';
import DeleteAlert from '../../components/DeleteAlert';
import { deleteHotel } from '../../controllers/hotel.controller';

const HotelItem = ({ hotel, getData }) => {
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    return (
        <>
            <li className='rounded-sm overflow-hidden border-main-color border'>
                <div className='h-[200px] w-full flex items-center justify-center text-2xl border-b border-main-color'>
                    {hotel.images.length > 0 ?
                        <img src={`${import.meta.env.VITE_IMAGE_URL}${hotel.images[0]}`} alt='hotel' className='object-fill w-full h-full' /> :
                        <FaRegImage />
                    }
                </div>
                <div className='flex flex-col p-3 gap-2'>
                    <div className='flex items-center justify-between'>
                        <span className='w-1/2 text-main-color font-medium'>{hotel.title}</span>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => setUpdateModal(true)}
                                className='rounded p-2 text-main-color hover:bg-slate-100 duration-200'
                            >
                                <TbPhotoEdit />
                            </button>
                            <button
                                onClick={() => setDeleteModal(true)}
                                className='rounded p-2 text-main-color hover:bg-slate-100 duration-200'
                            >
                                <MdDeleteOutline />
                            </button>
                        </div>
                    </div>
                    <p className='text-gray-600 text-xs italic'>
                        {hotel.city},
                        {" "}
                        {hotel.address}
                    </p>
                    <p className='flex items-center gap-1 text-main-color'>
                        {
                            [...Array(5)].map((_, index) => (
                                hotel.star >= index + 1 ?
                                    <GoStarFill key={index} /> :
                                    <GoStar key={index} />
                            ))
                        }
                    </p>
                    <p className='text-sm text-gray-600'>
                        {hotel.description}
                    </p>
                </div>
            </li>
            {updateModal && <UpdateHotel
                getData={getData}
                hotel={hotel}
                modalIsOpen={setUpdateModal}
            />}
            {deleteModal && <DeleteAlert
                deleteOperation={() => deleteHotel(hotel._id)}
                getData={getData}
                setModal={setDeleteModal}
            />}
        </>
    )
}

export default HotelItem