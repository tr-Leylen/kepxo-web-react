import React from 'react'
import PageHeader from '../../components/PageHeader'
import CourseListItem from '../../components/CourseListItem'
import CurrentPage from '../../components/CurrentPage'
import { IoSearch } from "react-icons/io5";

const data = [
    {
        id: 1,
        title: 'Node js backend gelistirme',
        avatar: 'https://picsum.photos/200/100',
        date: '05.01.2024',
        owner: 'Elturan Shujai',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In molestias, error iste repellendus inventore corrupti commodi officia vel officiis beatae',
        star: 4.5
    },
    {
        id: 2,
        title: 'Java ile backend gelistirme',
        avatar: 'https://picsum.photos/200/100',
        date: '05.01.2024',
        owner: 'Subhan Masimov',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In molestias, error iste repellendus inventore corrupti commodi officia vel officiis beatae',
        star: 4.2
    },
    {
        id: 3,
        title: '0-dan senior frontend developer ol!',
        avatar: 'https://picsum.photos/200/100',
        date: '05.01.2024',
        owner: 'Farman Allahverdiyev',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In molestias, error iste repellendus inventore corrupti commodi officia vel officiis beatae',
        star: 3.7
    },
    {
        id: 3,
        title: '0-dan senior frontend developer ol!',
        avatar: 'https://picsum.photos/200/100',
        date: '05.01.2024',
        owner: 'Farman Allahverdiyev',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In molestias, error iste repellendus inventore corrupti commodi officia vel officiis beatae',
        star: 5
    },
    {
        id: 3,
        title: '0-dan senior frontend developer ol!',
        avatar: 'https://picsum.photos/200/100',
        date: '05.01.2024',
        owner: 'Farman Allahverdiyev',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In molestias, error iste repellendus inventore corrupti commodi officia vel officiis beatae',
        star: 2.4
    },
]

const Courses = () => {
    return (
        <CurrentPage>
            <PageHeader title='Eğitimler' />
            <div className='p-10 mt-14'>
                <div className='text-main-color w-fit border-main-color border flex items-center rounded-md overflow-hidden px-2 py-1'>
                    <input
                        type="text"
                        placeholder='Eğitim ara'
                        className='px-2 py-1 text-sm outline-none'
                    />
                    <IoSearch className='cursor-pointer text-lg'/>
                </div>
                <ul className='list-none flex flex-col gap-10 mt-14'>
                    {data.map(course => (
                        <CourseListItem course={course} key={course.id} />
                    ))}
                </ul>
            </div>
        </CurrentPage>
    )
}

export default Courses;