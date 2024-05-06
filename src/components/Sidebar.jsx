import React from 'react'
import { Link } from 'react-router-dom';
import { IoSchool } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import logo from '../assets/kepxo-logo.png'

const Sidebar = () => {
    return (
        <aside className='h-screen border-r border-main-color w-[300px] min-w-[300px] text-main-color'>
            <div className='w-fit h-16 px-5 py-3'>
                <img src={logo} alt="logo" className='block w-full h-full object-cover' />
            </div>
            <ul className='list-none flex flex-col'>
                <li>
                    <Link to="/courses" className='flex items-center gap-2 px-5 py-3 transition-all duration-200 hover:bg-purple-100'>
                        <IoSchool />
                        <span>Eğitimler</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" className='flex items-center gap-2 px-5 py-3 transition-all duration-200 hover:bg-purple-100'>
                        <PiStudentFill />
                        <span>Kullanıcılar</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" className='flex items-center gap-2 px-5 py-3 transition-all duration-200 hover:bg-purple-100'>
                        <FaUserGroup />
                        <span>Öğretmenler</span>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default React.memo(Sidebar);