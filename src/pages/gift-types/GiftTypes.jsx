import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import CreateGiftType from './CreateGiftType'
import { getAllGiftTypes } from '../../controllers/gift_type.controller'
import GiftTypeItem from './GiftTypeItem'

const GiftTypes = () => {
    const [createModal, setCreateModal] = useState(false)
    const [data, setData] = useState([])
    const getTypes = async () => {
        const res = await getAllGiftTypes()
        setData(res.data)
    }

    useEffect(() => {
        getTypes()
    }, [])
    return (
        <CurrentPage>
            <PageHeader title='Hediye Tipleri' />
            <div className='mt-14 p-5'>
                <button
                    onClick={() => setCreateModal(true)}
                    className='px-4 py-2 rounded-sm bg-green-700 text-white mb-10 cursor-cell'
                >
                    Yeni Hediye Tipi
                </button>
                <ul className='grid grid-cols-3 gap-5'>
                    {data.map(item => (
                        <GiftTypeItem giftType={item} key={item._id} getData={getTypes} />
                    ))}
                </ul>
            </div>
            {createModal && <CreateGiftType modalIsOpen={setCreateModal} getData={getTypes} />}
        </CurrentPage>
    )
}

export default GiftTypes