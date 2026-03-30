import { Icon } from '@iconify/react'
import React from 'react'
import Search from './Search'

function HeaderFeeds({setIsActive,items,isActive,setIsFilterOpen,isFilterOpen,title,para}) {
    return (
        <>
            <div className='flex flex-col pl-4 pt-8 gap-y-4 overflow-hidden  '>
                <h1 className='text-black/70 text-2xl font-semibold'>{title}</h1>
                <p className='text-black/60 text-sm font-semibold'>{para}</p>
            </div>

            {/* Mobile  */}

            <div className="px-4 md:hidden">
                <div className="flex border border-gray-300 rounded-lg p-1 bg-gray-100">
                    {items.map((item) => (
                        <div key={item.id} onClick={() => setIsActive(item.id)}
                            className={`flex-1 text-center py-2 rounded-lg cursor-pointer transition-all duration-300 ${isActive === item.id
                                ? "bg-white shadow-md"
                                : ""}`}  >
                            <span className={`text-sm font-semibold ${isActive === item.id ? "text-[#787ef3]" : "text-black/70"}`}>
                                {item.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* desktop */}
            <div className='px-4 hidden md:flex flex-col gap-y-3'>
                <div className='flex items-center flex-row'>
                    {items.map((item) => (
                        <div className='flex flex-col gap-y-3 items-center w-full'>
                            <div className={`flex flex-row gap-x-2 items-center cursor-pointer `} onClick={() => setIsActive(item.id)}>
                                <Icon icon={item.icon} className={`${isActive === item.id ? 'text-[#787ef3]' : 'text-black/75'} text-xl`} />
                                <span className={`${isActive === item.id ? 'text-[#787ef3]' : 'text-black/65'} text-md font-semibold`}>{item.title}</span>
                            </div>
                            <div className={` w-full ${isActive === item.id ? 'border-2 border-[#8f4af1]' : 'border border-[#ded1f0]'}`} />
                        </div>
                    ))}
                </div>

            </div>

            <Search isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
        </>
    )
}

export default HeaderFeeds
