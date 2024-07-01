import React from 'react'
import { Link } from 'react-router-dom';
import { IoSchool } from "react-icons/io5";
import { FaUserGroup, FaGift, FaHotel } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import logo from '../assets/kepxo-logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { GoClockFill } from "react-icons/go";
import { BiSolidCategory } from "react-icons/bi";
import { MdGroups } from "react-icons/md";
import { RiLogoutCircleRLine, RiAccountCircleLine } from "react-icons/ri";
import { signOut } from '../redux/userSlice';

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
    const dispatch = useDispatch()
    return (
        <aside className='h-screen border-r border-main-color w-[300px] min-w-[300px] text-main-color'>
            <div className='w-full h-14 px-5 flex items-center gap-4 justify-between'>
                <Link to={'/'} className='w-1/3 block'>
                    <img src={logo} alt="logo" className='block object-cover' />
                </Link>
                <div className='flex items-center gap-2'>
                    <Link to={'/profile'} className='rounded-lg p-1 bg-indigo-100 flex text-2xl'>
                        <RiAccountCircleLine />
                    </Link>
                    <button onClick={() => dispatch(signOut())} className='rounded-lg p-1 bg-red-500 flex text-2xl text-white'>
                        <RiLogoutCircleRLine />
                    </button>
                </div>
            </div>
            <ul className='list-none flex flex-col overflow-auto h-[calc(100vh-56px)] border-t pb-10'>
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
            {/* <ul className='h-[100px] w-full border-t' >
                <li className='h-1/2 bg-main-color text-white transition-all hover:bg-opacity-95 duration-200'>
                    <Link to={'/profile'} className='flex items-center gap-2 px-5 py-3'>
                        <RiAccountCircleLine />
                        <span>Profile</span>
                    </Link>
                </li>
                <li className='h-1/2'>
                    <button
                        onClick={() => dispatch(signOut())}
                        className='w-full h-full bg-red-600 text-start flex items-center gap-2 px-5 text-white transition-all hover:bg-red-700'
                    >
                        <RiLogoutCircleRLine />
                        Log out
                    </button>
                </li>
            </ul> */}
        </aside >
    )
}

export default React.memo(Sidebar);