import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { IoIosSearch, IoIosClose } from 'react-icons/io'
import UserItem from '../teachers/UserItem'
import Modal from '../../components/Modal'
import CreateUser from '../teachers/CreateUser'
import { getUsersPaged, searchUser } from '../../controllers/user.controller'
import Pagination from '../../components/Pagination'
import { useForm } from 'react-hook-form'

const Users = () => {
    const [data, setData] = useState([])
    const [activePage, setActivePage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [createModal, setCreateModal] = useState(false)

    const { register, handleSubmit } = useForm()
    const getData = async () => {
        const users = await getUsersPaged({ page: activePage, limit: 20 })
        setData(users.data?.data)
        setTotalPages(users.data?.totalPages)
    }

    const search = async (data) => {
        const username = data.username
        const users = await searchUser({ page: activePage, limit: 10, username })
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
            <PageHeader title='Kullanıcılar' />
            <div className='mt-14 p-5'>
                <form
                    onSubmit={handleSubmit(search)}
                    className='flex border border-main-color rounded overflow-hidden w-fit'
                >
                    <input
                        type="text"
                        className='outline-none px-3 py-2 text-sm'
                        placeholder='Kullanıcı ara'
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
                    Yeni Kullanıcı
                </button>
                <ul className='grid grid-cols-3 gap-3'>
                    {data.map(item => (
                        <UserItem id={item} key={item} />
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
            {createModal &&
                <Modal>
                    <CreateUser getData={getData} modalIsOpen={setCreateModal} userType='user' />
                </Modal>
            }
        </CurrentPage>
    )
}

export default Users;;