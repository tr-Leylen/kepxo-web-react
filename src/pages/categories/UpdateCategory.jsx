import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import { deleteCategory, getCategory, updateCategory } from '../../controllers/category.controller'
import { MdError } from "react-icons/md";
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert';

const UpdateCategory = ({ categoryId, getData, modalIsOpen }) => {
    const [category, setCategory] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const getCategoryData = async () => {
        const categorydata = await getCategory(categoryId)
        setCategory(categorydata)
        setValue("title", categorydata?.title)
    }
    const submit = async (data) => {
        const category = await updateCategory({ data, id: categoryId })
        if (category._id) {
            getData()
            toast.success('Başarıyla tamamlandı')
            modalIsOpen(false)
        } else {
            toast.error('Hata oluşdu')
            modalIsOpen(false)
        }
    }

    const handleDelete = async () => {
        const deletingData = await deleteCategory(categoryId)
        if (!deletingData?.response) {
            getData()
            modalIsOpen(false)
        } else {
            toast.error(deletingData?.response?.data || 'Silinemedi')
        }
    }

    useEffect(() => {
        getCategoryData()
    }, [categoryId])
    return (
        <Modal>
            <form className='w-1/3 bg-white rounded p-5 flex flex-col gap-5' onSubmit={handleSubmit(submit)}>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="title">Başlık</label>
                    <input
                        id='title'
                        type="text"
                        placeholder='Başlık'
                        {...register("title", { required: "Bu alan boş bırakılamaz" })}
                        className='outline-none border border-main-color rounded p-2 text-main-color'
                    />
                    {errors?.title &&
                        <span className='flex items-center gap-2 text-red-700 text-xs font-semibold'>
                            <MdError />
                            {errors?.title.message}
                        </span>}
                </div>
                <div className='flex justify-start gap-5'>
                    <button
                        type='submit'
                        className='rounded px-3 py-1 text-white bg-main-color'
                    >
                        Gönder
                    </button>
                    <button type='button' onClick={() => modalIsOpen(false)}>
                        Kapat
                    </button>
                </div>
                <div className='mt-5 border-t py-5'>
                    <button
                        type='button'
                        className='bg-red-700 text-white px-3 py-1'
                        onClick={() => setDeleteModal(true)}
                    >
                        Kategoriyi Sil
                    </button>
                </div>
            </form>
            {deleteModal && <DeleteAlert
                setModal={setDeleteModal}
                getData={getData}
                deleteOperation={handleDelete}
            />}
        </Modal>
    )
}

export default UpdateCategory