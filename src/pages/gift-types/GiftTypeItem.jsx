import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import DeleteAlert from '../../components/DeleteAlert';
import { deleteGiftType } from '../../controllers/gift_type.controller';
import UpdateGiftType from './UpdateGiftType';

const GiftTypeItem = ({ giftType, getData }) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    return (
        <>
            <li
                onClick={() => setUpdateModal(true)}
                className='p-5 rounded-sm flex items-center justify-between text-white uppercase text-lg bg-main-color font-medium cursor-pointer'
            >
                <span>
                    {giftType.title}
                </span>
                <button
                    onClick={e => {
                        e.stopPropagation()
                        setDeleteModal(true)
                    }}
                    className='p-2 rounded-sm hover:bg-slate-100 hover:text-main-color duration-200'
                >
                    <MdDeleteOutline />
                </button>
            </li>
            {deleteModal && <DeleteAlert
                deleteOperation={() => deleteGiftType(giftType._id)}
                getData={getData}
                setModal={setDeleteModal}
            />}
            {updateModal && <UpdateGiftType
                getData={getData}
                giftType={giftType}
                modalIsOpen={setUpdateModal}
            />}
        </>
    )
}

export default GiftTypeItem