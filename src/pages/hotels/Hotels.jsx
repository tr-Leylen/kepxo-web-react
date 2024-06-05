import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import HotelItem from './HotelItem'
import { getHotelsPaged } from '../../controllers/hotel.controller'
import CreateHotel from './CreateHotel'

const Hotels = () => {
    const [data, setData] = useState([])
    const [activePage, setActivePage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [createModal, setCreateModal] = useState(false)

    const getData = async () => {
        const res = await getHotelsPaged(activePage)
        setData(res.data)
    }

    useEffect(() => {
        getData()
    }, [activePage])
    return (
        <>
            <CurrentPage>
                <PageHeader title='Hoteller' />
                <div className='mt-14 p-5'>
                    <button
                        type='button'
                        className='px-4 py-2 rounded text-white bg-main-color mb-10'
                        onClick={() => setCreateModal(true)}
                    >
                        Yeni Hotel
                    </button>
                    <ul className='grid grid-cols-3 gap-4'>
                        {data.map(hotel => (
                            <HotelItem key={hotel._id} hotel={hotel} getData={getData} />
                        ))}
                    </ul>
                </div>
            </CurrentPage>
            {createModal && <CreateHotel modalIsOpen={setCreateModal} getData={getData} />}
        </>
    )
}

export default Hotels