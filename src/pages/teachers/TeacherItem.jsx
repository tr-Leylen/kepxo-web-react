import React, { useEffect, useState } from 'react'
import { deleteUser, getUser } from '../../controllers/user.controller'
import Modal from '../../components/Modal'
import UpdateUser from './UpdateUser'
import { FaUser } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import DeleteAlert from '../../components/DeleteAlert';

const TeacherItem = ({ id }) => {
    const [teacher, setTeacher] = useState()
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const getUserData = async () => {
        const data = await getUser(id)
        setTeacher(data)
    }

    const clickDelete = async (e) => {
        e.stopPropagation()
        setDeleteModal(true)
    }
    useEffect(() => {
        getUserData()
    }, [id])
    return (
        <>
            <li
                onClick={() => setUpdateModal(true)}
                className='rounded-md p-4 flex flex-col gap-3 border border-main-color cursor-pointer relative'
            >
                <button
                    onClick={clickDelete}
                    className='absolute top-2 right-2 p-2 rounded-md hover:bg-slate-100 hover:text-red-600 duration-200'
                >
                    <AiOutlineUserDelete />
                </button>
                <div className='flex justify-center w-1/2 aspect-square items-center mx-auto rounded-full overflow-hidden bg-main-color'>
                    {
                        teacher?.avatar ?
                            <img src={teacher?.avatar} alt="img" className='object-cover w-full' /> :
                            <FaUser className='text-white text-5xl' />
                    }
                </div>
                <h2 className='text-center text-main-color'>
                    {teacher?.username}
                </h2>
                <h3 className='text-center'>
                    {`${teacher?.firstName} ${teacher?.lastName}`}
                </h3>
                <p className={`text-center ${teacher?.enable ? 'text-green-600' : 'text-red-600'}`}>
                    Durum: {teacher?.enable ? 'Açık' : 'Kapalı'}
                </p>
            </li>
            {updateModal &&
                <Modal>
                    <UpdateUser userId={id} modalIsOpen={setUpdateModal} getData={getUserData} />
                </Modal>
            }
            {deleteModal && <DeleteAlert
                deleteOperation={() => deleteUser(teacher?._id)}
                getData={getUserData}
                setModal={setDeleteModal}
            />}
        </>
    )
}

export default TeacherItem