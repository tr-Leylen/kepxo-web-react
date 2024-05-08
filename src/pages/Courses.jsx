import React from 'react'
import PageHeader from '../components/PageHeader'
import CourseListItem from '../components/CourseListItem'

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
        <div className='max-h-screen w-full overflow-y-scroll'>
            <PageHeader title='Eğitimler' />
            <div className='p-10'>
                <div className=''>
                    <input type="text" />
                </div>
                <ul className='list-none flex flex-col gap-10 mt-14'>
                    {data.map(course => (
                        <CourseListItem course={course} key={course.id} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Courses;