import React, { useEffect, useRef, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { getTeachersPaged } from '../../controllers/user.controller.js'
import { IoIosSearch } from "react-icons/io";
import Modal from '../../components/Modal.jsx';
import CreateUser from './CreateUser.jsx';
import UserItem from './UserItem.jsx';
import Pagination from '../../components/Pagination.jsx';

const Teachers = () => {
    const [data, setData] = useState([])
    const [activePage, setActivePage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [createModal, setCreateModal] = useState(false)
    const getData = async () => {
        const teachers = await getTeachersPaged({ page: activePage, limit: 20 })
        setData(teachers.data?.data)
        setTotalPages(teachers.data?.totalPages)
    }

    const searchRef = useRef()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(searchRef.current.value)
    }

    useEffect(() => {
        getData()
    }, [activePage])
    return (
        <CurrentPage>
            <PageHeader title='Öğretmenler' />
            <div className='mt-14 p-5'>
                <form
                    onSubmit={handleSubmit}
                    className='flex border border-main-color rounded overflow-hidden w-fit'
                >
                    <input
                        type="text"
                        className='outline-none px-3 py-2 text-sm'
                        placeholder='Öğretmen ara'
                        ref={searchRef}
                    />
                    <button
                        type='submit'
                        className='px-3 py-1 bg-main-color text-white'
                    >
                        <IoIosSearch />
                    </button>
                </form>
                <button
                    onClick={() => setCreateModal(true)}
                    className='bg-green-700 text-white px-4 py-2 rounded my-10'
                >
                    Yeni Öğretmen
                </button>
                <ul className='grid grid-cols-3 gap-3'>
                    {data.map(item => (
                        <UserItem id={item} key={item} />
                    ))}

                </ul>
            </div>
            <Pagination
                activePage={activePage}
                pageCount={totalPages}
                setActivePage={setActivePage}
            />
            {createModal &&
                <Modal>
                    <CreateUser getData={getData} modalIsOpen={setCreateModal} userType='teacher' />
                </Modal>
            }
        </CurrentPage>
    )
}

export default Teachers;