import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { getAllGifts } from '../../controllers/gift.controller'
import { Link } from 'react-router-dom'
import { GrFormNextLink } from "react-icons/gr";

const Gift = () => {
    const [data, setData] = useState([])
    const [createModal, setCreateModal] = useState(false)

    const getGiftsData = async () => {
        const res = await getAllGifts()
        setData(res.data)
    }

    useEffect(() => {
        getGiftsData()
    }, [])
    console.log(data)
    return (
        <CurrentPage>
            <PageHeader title='Hediyeler' />
            <div className='mt-14 p-5'>
                <div className='flex gap-5'>
                    <button
                        onClick={() => setCreateModal(true)}
                        className='bg-purple-800 text-white px-4 py-2 rounded-sm mb-10 flex'
                    >
                        Hediye yarat
                    </button>
                    <Link to='types' className='px-4 py-2 h-fit flex items-center gap-2 hover:text-main-color duration-200'>
                        Hediye tipleri
                        <GrFormNextLink className='text-xl' />
                    </Link>
                </div>

                <ul
                    className='grid grid-cols-3 gap-5'
                >

                </ul>
            </div>
        </CurrentPage>
    )
}

export default Gift