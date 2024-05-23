import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import CreateGiftType from './CreateGiftType'
import { getAllGiftTypes } from '../../controllers/gift_type.controller'
import GiftTypeItem from './GiftTypeItem'
import { useNavigate } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti";
import toast from 'react-hot-toast'

const GiftTypes = () => {
    const [createModal, setCreateModal] = useState(false)
    const [data, setData] = useState([])

    const navigate = useNavigate()

    const getTypes = async () => {
        const res = await getAllGiftTypes()
        if(res.status==200){
            setData(res.data)
        }else{
            toast.error(res?.response?.data || 'Hata oldu')
        }
    }

    useEffect(() => {
        getTypes()
    }, [])
    return (
        <CurrentPage>
            <PageHeader title='Hediye Tipleri' />
            <div className='mt-14 p-5'>
                <div className='flex items-center gap-3 mb-10'>
                    <button
                        onClick={() => navigate(-1)}
                        className='px-4 py-2 rounded-sm flex items-center gap-2 duration-200 hover:bg-slate-100'
                    >
                        <TiArrowBack/>
                        Geri Git
                    </button>
                    <button
                        onClick={() => setCreateModal(true)}
                        className='px-4 py-2 rounded-sm bg-green-700 text-white cursor-cell'
                    >
                        Yeni Hediye Tipi
                    </button>
                </div>
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