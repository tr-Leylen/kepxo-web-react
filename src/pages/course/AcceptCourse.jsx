import React, { useEffect } from 'react'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { acceptCourse, getCourse, getCourses } from '../../controllers/course.controller'
import toast from 'react-hot-toast'

const AcceptCourse = ({ setModal, getData }) => {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const onsubmit = async (data) => {
        const accepted = await acceptCourse({ data, id })
        if (accepted) {
            toast.success('Kurs onaylandı')
            getData()
            setModal(false)
        } else {
            toast.error('Kurs onaylanamadı')
        }
    }

    const getCourseScore = async () => {
        const course = await getCourse(id)
        setValue("score", course?.score)
    }

    useEffect(() => {
        getCourseScore()
    }, [id])
    return (
        <Modal>
            <div className='bg-white w-1/3 p-5'>
                <h1 className='text-main-color text-xl mb-10'>Kursa puan eklemek ister misin?</h1>
                <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-5'>
                    <input
                        type="number"
                        {...register("score", { min: 0, required: "Boş bırakılamaz", valueAsNumber: true })}
                        defaultValue={0}
                        className='outline-none whitespace-normal'
                    />
                    {errors.score && <span>Minimum 0 ola bilir</span>}
                    <div className='flex gap-4'>
                        <button
                            type='submit'
                            className='px-3 py-1 bg-main-color text-white rounded'
                        >
                            Gönder
                        </button>
                        <button type='button' onClick={() => setModal(false)} className='text-slate-500'>
                            Kapat
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default AcceptCourse