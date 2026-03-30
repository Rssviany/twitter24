import { Icon } from '@iconify/react'
import React, { useState } from 'react'


function StoreFeedDetails({ feeds }) {
    const [favStores, setFavStores] = useState({});
    const toggleFav = (id) => {
        setFavStores(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    return (
        <>
            {feeds.map((each) => (
                <div key={each._id} className='flex flex-row gap-x-4 relative border border-black/20 rounded-xl px-2 py-3 m-2'>
                    <img src={each.images[0]} alt='image' className='w-[50%] h-50 rounded-lg ' />
                    <div className='flex flex-col gap-y-4 '>
                        <div className='flex flex-row justify-between flex-start items-center'>
                            <h4 className='font-semibold text-lg text-black/80'>{each.name}</h4>
                            <Icon
                                icon={favStores[each._id] ? "mdi:heart" : "mdi:heart-outline"}
                                className={`${favStores[each._id] ? "text-red-500" : ""} text-xl right-5 absolute`}
                                onClick={() => toggleFav(each._id)}
                            />
                        </div>
                        <div className='flex flex-row gap-x-2 '>
                            <div className='border w-17 border-gray-100 rounded-md bg-[#f3eefe] flex items-center gap-x-1 px-2 py-1'>
                                <Icon icon='mdi:star' className='text-[#FCD34D] text-lg' />
                                <span className='text-sm text-[#6464d2] font-semibold'> {each.rating}</span>
                            </div>
                            <div className='border w-fit border-gray-100 rounded-md bg-[#edf9f2] flex items-center gap-x-1 px-2 py-1'>
                                <span className='text-sm text-[#4ef129]'> Open</span>
                            </div>
                            <div className='border w-fit border-gray-100 rounded-md bg-[#f3eefe] flex items-center gap-x-1 px-2 py-1'>
                                <Icon icon='mdi:walk' className='text-[#6464d2] text-lg' />
                                <span className='text-sm text-[#6464d2] font-semibold'>0.6 km </span>
                            </div>
                        </div>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <Icon icon='mdi:store' className='text-black/50 text-xl' />
                            <span className='text-sm text-black/60 '>{each.category}</span>
                        </div>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <Icon icon='mdi:location-outline' className='text-black/50 text-xl' />
                            <span className='text-sm text-black/60 '>{each.address},{each.city}</span>
                        </div>
                        <button className=' px-2 py-1 w-fit bg-linear-to-r from-[#a877f6] to-[#5b1ff3] text-md text-white rounded-md cursor-pointer'>View Details</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default StoreFeedDetails
