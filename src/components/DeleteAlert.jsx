import React from 'react'
import Modal from './Modal'
import { deleteCourse } from '../controllers/course.controller'
import toast from 'react-hot-toast'

const DeleteAlert = ({ deleteOperation, setModal, getData }) => {
    const deleteFunc = async () => {
        const res = await deleteOperation()
        if (!res?.response) {
            toast.success('Başarıyla tamamlandı')
            getData()
            setModal(false)
        } else {
            toast.error(res?.response?.data || 'Bir hata oluşdu')
        }
    }
    return (
        <Modal>
            <div className='w-1/3 bg-white p-5 rounded'>
                <p className='font-semibold text-xl mb-10'>Silmek istediğinizden emin misiniz?</p>
                <div className='flex gap-5 [&>button]:px-3 py-1'>
                    <button
                        onClick={() => setModal(false)}
                        className='px-3 py-1 rounded-sm hover:bg-slate-100 transition-all'
                    >
                        Hayır
                    </button>
                    <button
                        className='rounded-sm bg-red-600 text-white px-3 py-1 hover:bg-red-800 transition-all'
                        onClick={deleteFunc}
                    >
                        Evet
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteAlert