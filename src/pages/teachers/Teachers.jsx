import React, { useEffect, useRef, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { getTeachersPaged } from '../../controllers/user.controller.js'
import { IoIosSearch } from "react-icons/io";
import TeacherItem from './TeacherItem.jsx';
import Modal from '../../components/Modal.jsx';
import CreateUser from './CreateUser.jsx';

const Teachers = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [createModal, setCreateModal] = useState(false)
    const getData = async () => {
        const teachers = await getTeachersPaged(page)
        setData(teachers?.data)
    }

    const searchRef = useRef()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(searchRef.current.value)
    }

    useEffect(() => {
        getData()
    }, [])
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
                        <TeacherItem id={item} />
                    ))}

                </ul>
            </div>
            {createModal &&
                <Modal>
                    <CreateUser getData={getData} modalIsOpen={setCreateModal} userType='teacher' />
                </Modal>
            }
        </CurrentPage>
    )
}

export default Teachers;