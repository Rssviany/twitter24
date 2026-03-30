import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import exit from '../assets/icons/exit.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth.api';
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/AuthSlice"




const menuItems = [
    { id: 1, icon: "mdi:map-marker", title: "Location", moveTo: '/' },
    { id: 2, icon: "mdi:earth", title: "Global Feed", moveTo: '/global_feeds' },
    { id: 3, icon: "mdi:radar", title: "Radius", moveTo: '/radius' },
    { id: 4, icon: "mdi:discount", title: "Offers", moveTo: '/offers' },
    { id: 5, icon: "mdi:briefcase", title: "Jobs", moveTo: '/jobs' },
    { id: 6, icon: "mdi:store", title: "My Store", moveTo: '/mystore' },
];

function LeftSideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(clearUser())
            navigate("/login");
        } catch (error) {
            console.log('Logout Error', error)
        }
    }
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    return (
        <>
            <div className='flex flex-col gap-y-4 shadow-xs md:hidden pt-4'>
                <div className='flex flex-row gap-x-3 px-2  items-center'>
                    <button className={`border border-gray-500 rounded-md px-1 py-1 cursor-pointer flex items-center`}
                        onClick={() => setIsOpen(prev => !prev)}>
                        <Icon icon='mdi:menu' className='text-md text-black ' />
                    </button>
                    <h2 className='text-black/90 text-md font-bold font-stretch-100%'>Twitter24</h2>
                </div>
                <div className='border border-gray-200 w-full' />
            </div>

            <div className={`  fixed md:static top-0 left-0 z-30 h-full w-60 bg-white transform transition-transform duration-500 ease-in-out
                         ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex-row flex`}>
                <div className='w-60  bg-white px-5 '>
                    <div className='flex flex-col justify-between min-h-screen pt-4'>
                        <div className='flex flex-col  space-y-3'>
                            <div className='flex flex-col gap-y-3 mb-5 md:hidden'>
                                <div className='flex flex-row justify-between '>
                                    <span className='text-sm text-black/80 font-bold'>Menu</span>
                                    <Icon icon='mdi:close' onClick={() => setIsOpen(false)} className='text-xl text-gray-400 hover:text-black/60' />
                                </div>
                                <div className='border border-gray-300 w-full' />
                            </div>
                            {menuItems.map((item) => {
                                const active = location.pathname === item.moveTo
                                return (
                                    <div className={`${active ? 'bg-[#FAF5FF] px-2 py-2 border-r-2 rounded-l-md rounded-r-xl  border-[#5820f3]' : 'px-2 py-2'} flex items-center w-full`} >
                                        <div className={`flex flex-row items-center gap-x-5 cursor-pointer  `} key={item.id}
                                            onClick={() => {
                                                setIsOpen(false)
                                                setTimeout(() => {
                                                    navigate(item.moveTo)
                                                }, 500)
                                            }}>
                                            <Icon icon={item.icon} className={`text-xl ${active ? "text-[#8377ff]" : 'text-gray-600'}`} />
                                            <span className={`text-md font-semibold ${active ? "text-[#8377ff]" : 'text-black/60'}`}>{item.title}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='flex flex-col space-y-6 pb-8 '>
                            <div className='border border-gray-200  ' />
                            <div className='flex flex-row items-center justify-between'>
                                <div className='border border-gray-400 rounded-full px-1 py-1'>
                                    <Icon icon='mdi:user' className={`text-xl text-[#8377ff]`} />
                                </div>
                                <p className='text-md text-gray-800 font-medium'>Vinay Kumar</p>
                                <img
                                    src={exit}
                                    alt="LogOut"
                                    className='text-gray-600 size-4 cursor-pointer'
                                    onClick={handleLogout}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border border-gray-200 h-screen ' />
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 md:hidden z-20"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>

    )
}

export default LeftSideBar
