import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { TbPhotoEdit } from "react-icons/tb";
import { GoStarFill, GoStar } from "react-icons/go";
import { getOneGiftType } from '../../controllers/gift_type.controller';
import UpdateGift from './UpdateGift';
import DeleteAlert from '../../components/DeleteAlert';
import { deleteGift } from '../../controllers/gift.controller';

const GiftItem = ({ gift, getData }) => {
    const [type, setType] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const getTypeData = async () => {
        const res = await getOneGiftType(gift.giftType)
        setType(res.data)
    }
    useEffect(() => {
        getTypeData()
    }, [gift])
    return (
        <>
            <li className='rounded flex items-center justify-between border border-main-color overflow-hidden flex-col'>
                <div className='h-[200px] flex items-center justify-center w-full border-b'>
                    {gift.image ?
                        <img src={`${import.meta.env.VITE_IMAGE_URL}${gift.image}`} alt='image' className='object-cover block h-full w-full' /> :
                        <FaRegImage className='text-5xl' />
                    }
                </div>
                <div className='flex items-center justify-between w-full px-2 py-1'>
                    <span className='capitalize text-lg w-full truncate'>
                        {gift.title}
                    </span>
                    <div className='flex items-center gap-2'>
                        <button
                            onClick={() => setUpdateModal(true)}
                            type='button'
                            className='p-2 rounded-sm hover:bg-slate-100 hover:text-main-color duration-200 text-xl'
                        >
                            <TbPhotoEdit />
                        </button>
                        <button
                            onClick={() => setDeleteModal(true)}
                            type='button'
                            className='p-2 rounded-sm hover:bg-slate-100 hover:text-main-color duration-200 text-xl'
                        >
                            <MdDeleteOutline />
                        </button>
                    </div>
                </div>
                <div className='flex justify-between items-center gap-2 p-2 w-full text-main-color'>
                    <p className='flex gap-1'>
                        {[...Array(5)].map((_, index) => (
                            gift.star >= index + 1 ?
                                <GoStarFill key={index} /> :
                                <GoStar key={index} />
                        ))}
                    </p>
                    <h3 className='italic text-sm opacity-80 pr-5'>({type?.title})</h3>
                </div>
                <p className='p-2 flex items-center gap-2 w-full'>
                    <span className='font-semibold'>Gereken puan: </span>
                    <span className='text-main-color italic'>{gift.score}</span>
                </p>
            </li>
            {updateModal &&
                <UpdateGift
                    getData={getData}
                    gift={gift}
                    modalIsOpen={setUpdateModal}
                />
            }
            {deleteModal &&
                <DeleteAlert
                    getData={getData}
                    setModal={setDeleteModal}
                    deleteOperation={() => deleteGift(gift._id)}
                />
            }
        </>
    )
}

export default GiftItem