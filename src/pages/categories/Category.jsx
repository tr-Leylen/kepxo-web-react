import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import { getCategories } from '../../controllers/category.controller'
import UpdateCategory from './UpdateCategory'
import CreateCategory from './CreateCategory'
import CategorySkeleton from '../../components/UI/CategorySkeleton'

const Category = () => {
    const [data, setData] = useState([])
    const [createModal, setCreateModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState()

    const getData = async () => {
        try {
            setLoading(true)
            const categories = await getCategories()
            setData(categories)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const clickCategory = (e) => {
        setSelectedCategory(e.target.id)
        setUpdateModal(true)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <CurrentPage>
            <PageHeader title='Kategoriler' />
            <div className='mt-14 p-5'>
                <button
                    onClick={() => setCreateModal(!createModal)}
                    className='px-3 py-2 rounded text-white bg-green-700 hover:bg-green-800 mb-10'
                >
                    Yeni Kategori
                </button>
                <ul className='grid grid-cols-4 gap-5'>
                    {loading ? Array.from({ length: 12 }, () => <CategorySkeleton />) : data.map(item => (
                        <li
                            onClick={clickCategory}
                            id={item?._id}
                            key={item?._id}
                            className='bg-main-color rounded-lg py-5 px-3 text-center text-white font-medium uppercase cursor-pointer'
                        >
                            {item?.title}
                        </li>
                    ))}
                </ul>
            </div>
            {updateModal && <UpdateCategory
                categoryId={selectedCategory}
                getData={getData}
                modalIsOpen={setUpdateModal}
            />}
            {createModal && <CreateCategory
                getData={getData}
                modalisOpen={setCreateModal}
            />}
        </CurrentPage>
    )
}

export default Category