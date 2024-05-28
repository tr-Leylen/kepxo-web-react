import React from 'react'
import { FaRegImage } from "react-icons/fa6";
import { GoStarFill, GoStar } from "react-icons/go";

const HotelItem = ({ hotel, getData }) => {
    return (
        <li className='rounded-sm overflow-hidden border-main-color border'>
            <div className='h-[150px] w-full flex items-center justify-center text-2xl border-b border-main-color'>
                {hotel.avatar ?
                    <img src={hotel.avatar} alt='hotel' className='object-cover w-full h-full' /> :
                    <FaRegImage />
                }
            </div>
            <div className='flex flex-col p-3 gap-4'>
                <p className='w-full flex gap-2 justify-between items-end'>
                    <span className='w-1/2 text-main-color font-medium'>{hotel.title}</span>
                    <span className='text-gray-600 text-sm italic'>({hotel.city})</span>
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
            </div>
        </li>
    )
}

export default HotelItem