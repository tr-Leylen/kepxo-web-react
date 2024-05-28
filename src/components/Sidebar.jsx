import React from 'react'
import { Link } from 'react-router-dom';
import { IoSchool } from "react-icons/io5";
import { FaUserGroup, FaGift, FaHotel } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import logo from '../assets/kepxo-logo.png'
import { useSelector } from 'react-redux';
import { GoClockFill } from "react-icons/go";
import { BiSolidCategory } from "react-icons/bi";
import { MdGroups } from "react-icons/md";

const sidebarLinks = [
    {
        title: 'Eğitimler',
        icon: <IoSchool />,
        path: '/courses',
        role: 'admin'
    },
    {
        title: 'Kullanıcılar',
        icon: <PiStudentFill />,
        path: '/users',
        role: 'admin'
    },
    {
        title: 'Öğretmenler',
        icon: <FaUserGroup />,
        path: '/teachers',
        role: 'admin'
    },
    {
        title: 'Eğitimlerim',
        icon: <IoSchool />,
        path: '/my-courses',
        role: 'teacher'
    },
    {
        title: 'Onay Bekleyen Kurslar',
        icon: <GoClockFill />,
        path: '/waiting-courses',
        role: 'admin'
    },
    {
        title: 'Kategoriler',
        icon: <BiSolidCategory />,
        path: '/category',
        role: "admin"
    },
    {
        title: 'Konferanslar',
        icon: <MdGroups />,
        path: '/conferences',
        role: 'admin'
    },
    {
        title: 'Hediyeler',
        icon: <FaGift />,
        path: '/gifts',
        role: 'admin'
    },
    {
        title: 'Hoteller',
        icon: <FaHotel />,
        path: '/hotels',
        role: 'admin'
    }
]

const Sidebar = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <aside className='h-screen border-r border-main-color w-[300px] min-w-[300px] text-main-color'>
            <div className='w-fit h-16 px-5 py-3'>
                <Link to={'/'}>
                    <img src={logo} alt="logo" className='block w-full h-full object-cover' />
                </Link>
            </div>
            <ul className='list-none flex flex-col'>
                {
                    sidebarLinks.map((item, index) => (
                        currentUser?.role === item.role && <li key={index}>
                            <Link to={item.path} className='flex items-center gap-2 px-5 py-3 transition-all duration-200 hover:bg-purple-100'>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </aside >
    )
}

export default React.memo(Sidebar);