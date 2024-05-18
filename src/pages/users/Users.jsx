import React, { useEffect, useRef, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { IoIosSearch } from 'react-icons/io'
import UserItem from '../teachers/UserItem'
import Modal from '../../components/Modal'
import CreateUser from '../teachers/CreateUser'
import { getUsersPaged } from '../../controllers/user.controller'

const Users = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [createModal, setCreateModal] = useState(false)
    const getData = async () => {
        const users = await getUsersPaged(page)
        setData(users?.data)
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
            <PageHeader title='Kullanıcılar' />
            <div className='mt-14 p-5'>
                <form
                    onSubmit={handleSubmit}
                    className='flex border border-main-color rounded overflow-hidden w-fit'
                >
                    <input
                        type="text"
                        className='outline-none px-3 py-2 text-sm'
                        placeholder='Kullanıcı ara'
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
                    Yeni Kullanıcı
                </button>
                <ul className='grid grid-cols-3 gap-3'>
                    {data.map(item => (
                        <UserItem id={item} key={item} />
                    ))}

                </ul>
            </div>
            {createModal &&
                <Modal>
                    <CreateUser getData={getData} modalIsOpen={setCreateModal} userType='user' />
                </Modal>
            }
        </CurrentPage>
    )
}

export default Users;;