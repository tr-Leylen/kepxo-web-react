import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { getTeachersPaged, searchTeacher } from '../../controllers/user.controller.js'
import { IoIosClose, IoIosSearch } from "react-icons/io";
import Modal from '../../components/Modal.jsx';
import CreateUser from './CreateUser.jsx';
import UserItem from './UserItem.jsx';
import Pagination from '../../components/Pagination.jsx';
import { useForm } from 'react-hook-form';

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

    const { register, handleSubmit } = useForm()

    const search = async (data) => {
        const username = data.username
        const users = await searchTeacher({ page: activePage, limit: 10, username })
        if (users.status === 200) {
            setData(users.data.data)
            setTotalPages(users.data.totalPages)
        }
    }

    useEffect(() => {
        getData()
    }, [activePage])
    return (
        <CurrentPage>
            <PageHeader title='Öğretmenler' />
            <div className='mt-14 p-5'>
                <form
                    onSubmit={handleSubmit(search)}
                    className='flex border border-main-color rounded overflow-hidden w-fit'
                >
                    <input
                        type="text"
                        className='outline-none px-3 py-2 text-sm'
                        placeholder='Öğretmen ara'
                        {...register("username", { required: true })}
                    />
                    <button
                        type='submit'
                        className='px-3 py-1 bg-main-color text-white'
                    >
                        <IoIosSearch />
                    </button>
                    <button
                        type='reset'
                        className='px-2 flex items-center justify-center text-xl'
                        onClick={getData}
                    >
                        <IoIosClose />
                    </button>
                </form>
                <button
                    onClick={() => setCreateModal(true)}
                    className='bg-green-700 text-white px-4 py-2 rounded my-10'
                >
                    Yeni Öğretmen
                </button>
                <ul className='grid grid-cols-3 gap-3'>
                    {data.map(user => (
                        <UserItem user={user} key={user._id} getUserData={getData} />
                    ))}

                </ul>
            </div>
            {data.length > 0 &&
                <Pagination
                    activePage={activePage}
                    pageCount={totalPages}
                    setActivePage={setActivePage}
                />
            }
            {createModal &&
                <Modal>
                    <CreateUser getData={getData} modalIsOpen={setCreateModal} userType='teacher' />
                </Modal>
            }
        </CurrentPage>
    )
}

export default Teachers;