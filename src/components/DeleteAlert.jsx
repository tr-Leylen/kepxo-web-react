import React from 'react'
import Modal from './Modal'

const DeleteAlert = ({ req }) => {
    const deleteFunc = async () => {
        
    }
    return (
        <Modal>
            <div className='w-1/2 bg-white'>
                <p>Silmek istediğinizden emin misiniz?</p>
                <div className='flex gap-5 [&>button]:px-3 py-1'>
                    <button>Hayır</button>
                    <button className='rounded-sm bg-red-600 text-white' onClick={deleteFunc}>Evet</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteAlert