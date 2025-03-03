import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import HotelItem from './HotelItem'
import { getHotelsPaged } from '../../controllers/hotel.controller'
import CreateHotel from './CreateHotel'
import Pagination from '../../components/Pagination'
import GiftSkeleton from '../../components/UI/GiftSkeleton'

const Hotels = () => {
    const [data, setData] = useState([])
    const [activePage, setActivePage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [createModal, setCreateModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
            setLoading(true)
            const res = await getHotelsPaged({ page: activePage, limit: 10 })
            setData(res.data?.data)
            setTotalPages(res.data?.totalPages)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
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
                        {loading ? Array.from({ length: 6 }, () => <GiftSkeleton />) : data.map(hotel => (
                            <HotelItem key={hotel._id} hotel={hotel} getData={getData} />
                        ))}
                    </ul>
                </div>
                {data.length > 0 &&
                    <Pagination
                        activePage={activePage}
                        setActivePage={setActivePage}
                        pageCount={totalPages}
                    />
                }
            </CurrentPage>
            {createModal && <CreateHotel modalIsOpen={setCreateModal} getData={getData} />}
        </>
    )
}

export default Hotels