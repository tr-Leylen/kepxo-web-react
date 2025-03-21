import React, { useEffect, useState } from 'react'
import CurrentPage from '../../components/CurrentPage'
import PageHeader from '../../components/PageHeader'
import Modal from '../../components/Modal'
import CreateCourse from './CreateCourse'
import { getMyCourses } from '../../controllers/course.controller'
import { useSelector } from 'react-redux'
import CourseListItem from '../../components/CourseListItem'
import CourseSkeleton from '../../components/UI/CourseSkeleton'

const MyCourses = () => {
  const [modal, setModal] = useState(false)
  const [courseList, setCourseList] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector(state => state.user)

  const getCourses = async () => {
    try {
      setLoading(true)
      const courses = await getMyCourses(currentUser._id)
      setCourseList(courses.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <CurrentPage>
      <PageHeader title='Eğitimlerim' />
      <div className='mt-14 p-5'>
        <button
          onClick={() => setModal(modal ? false : true)}
          className='bg-green-600 text-white font-semibold p-2 rounded-sm mb-20'
        >
          Yeni Eğitim
        </button>
        <ul className='flex flex-col gap-5'>
          {loading ? Array.from({ length: 4 }, () => <CourseSkeleton />) : courseList.map(course => (
            <CourseListItem course={course} key={course._id} />
          ))}
        </ul>
      </div>
      {modal &&
        <Modal>
          <CreateCourse closeModal={setModal} />
        </Modal>
      }
    </CurrentPage>
  )
}

export default MyCourses