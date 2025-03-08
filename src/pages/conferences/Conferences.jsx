import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import Modal from '../../components/Modal'
import CreateConference from './CreateConference'
import { deleteConference, getConferences } from '../../controllers/conference.controller'
import moment from 'moment'
import UpdateConference from './UpdateConference'
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineEditNote } from "react-icons/md";
import DeleteAlert from '../../components/DeleteAlert'
import ConferenceSkeleton from '../../components/UI/ConferenceSkeleton'

const Conferences = () => {
    const [createModal, setCreateModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState([])
    const getData = async () => {
        try {
            setLoading(true)
            const conferenceData = await getConferences()
            setData(conferenceData.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <CurrentPage>
            <PageHeader title='Konferanslar' />
            <div className='mt-14 p-5'>
                <div className='flex justify-start mb-10'>
                    <button
                        onClick={() => setCreateModal(true)}
                        className='bg-blue-700 text-white px-4 py-2 rounded-sm'
                    >
                        Konferans yarat
                    </button>
                </div>
                <ul
                    className='grid grid-cols-3 gap-5'
                >
                    {loading ? Array.from({ length: 6 }, () => <ConferenceSkeleton />) : data.map(item => (
                        <ConferenceItem conference={item} key={item?._id} getData={getData} />
                    ))}
                </ul>
            </div>
            {
                createModal && <Modal>
                    <CreateConference modalIsOpen={setCreateModal} getData={getData} />
                </Modal>
            }

        </CurrentPage >
    )
}

export default Conferences;



const ConferenceItem = ({ conference, getData }) => {
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const formatDate = (data) => {
        return moment(data).format('MMMM Do YYYY')
    }
    return (
        <li
            id={conference?._id}
            key={conference?._id}
            className='rounded-sm bg-main-color p-5 flex gap-5'
        >
            <div className='flex flex-col gap-5 w-full'>
                <h2 className='text-2xl font-semibold truncate text-white'>
                    <span>
                        {conference?.title}
                    </span>
                </h2>
                <time className='text-sm text-white'>{formatDate(conference?.date)}</time>
                {
                    updateModal && <Modal>
                        <UpdateConference conferenceId={conference?._id} getData={getData} modalIsOpen={setUpdateModal} />
                    </Modal>
                }
                {
                    deleteModal && <DeleteAlert
                        deleteOperation={() => deleteConference(conference?._id)}
                        getData={getData}
                        setModal={setDeleteModal}
                    />
                }
            </div>
            <div className='flex flex-col gap-4 justify-center h-full text-xl px-2 text-white'>
                <button
                    className='p-2 rounded-md hover:bg-slate-200 hover:text-main-color duration-200'
                    onClick={() => setUpdateModal(true)}
                >
                    <MdOutlineEditNote />
                </button>
                <button
                    className='p-2 rounded-md hover:bg-slate-200 hover:text-main-color duration-200'
                    onClick={() => setDeleteModal(true)}
                >
                    <RiDeleteBin5Line />
                </button>
            </div>
        </li>
    )
}