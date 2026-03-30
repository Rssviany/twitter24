import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { format } from "timeago.js";
import PostLocalFeed from './PostLocalFeed';


function MyStoreDetails({ feeds, isActive }) {
    const [active, setActive] = useState(0)
    return (
        <>
            <div className='flex flex-col px-4 gap-y-4 mb-4  '>

                {feeds?.map((each) => (

                    <React.Fragment key={each._id}>


                        <div className='border border-gray-300 rounded-xl px-4 py-4  gap-y-3 w-full'>
                            {/* <div className='flex flex-col lg:flex-row  p-2 '>
                                
                                <div className='flex flex-col gap-y-4 lg:w-[60%]'>
                                    <img src={each.images[0]} alt="Images" className=' w-full  rounded-lg ' />
                                    <div className='flex flex-row gap-x-2 pt-3'  >
                                        {each?.images.map((i, id) => (
                                            <img key={id} src={i} alt="img" onClick={() => setActive(id)} className={`rounded-md  w-15 cursor-pointer ${active === id ? 'border-2 border-[#c658f9]' : ''}`} />
                                        ))}
                                    </div>
                                    <h5 className='text-sm font-semibold text-black'>We Sell/Our Services</h5>
                                    <div className='flex flex-row gap-x-2 flex-wrap gap-y-2'>
                                        {each.services.map((s) => (
                                            <div className='flex items-center rounded-lg bg-[#f2e4f2] px-3 py-2 cursor-pointer w-fit'>
                                                <span className='text-xs font-bold text-[#9458f5]'>{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <h5 className='text-sm font-semibold text-black'>About Us</h5>
                                        <p className='text-sm text-black/60'>{each.description}</p>
                                    </div>

                                </div>
                                
                                <div className=' flex lg:w-[40%] flex-col gap-y-3 pt-5 md:pt-0'>
                                    <div className='flex justify-between'>
                                        <div className='flex flex-row items-center gap-x-2'>
                                            <h1 className='text-md text-black font-semibold'>{each.name}</h1>
                                            <div className='flex items-center p-1 bg-[#22C55E] rounded-md'>
                                                <span className='text-gray-100 font-bold text-xs'>Open </span>
                                            </div>
                                        </div>
                                        <Icon icon='mdi:share-outline' className='text-2xl cursor-pointer' />
                                    </div>
                                    <div className='flex flex-row items-center gap-x-2'>
                                        <div className='rounded-lg px-2 py-1.5 flex items-center gap-x-1 bg-gray-100'>

                                            <span className='text-xs text-black font-bold'>follow</span>
                                        </div>
                                        <span className='text-gray-500 text-sm font-semibold'>{each.followers} followers</span>
                                    </div>
                                    <div className='flex flex-row items-center gap-x-2'>
                                        <div className='rounded-lg px-2 py-1.5 flex items-center gap-x-1 bg-[#f9f0c3]'>
                                            <Icon icon='mdi:star' className='text-lg text-yellow-300' />
                                            <span className='text-xs text-[#8b5959] font-bold'>{each.averageRating}</span>
                                        </div>
                                        <span className='text-[#8c5af0] border-b-2 border-[#8c5af0] text-sm font-bold'>({each.numReviews} reviews)</span>
                                    </div>
                                </div>
                            </div> */}
                            <div className='flex flex-col md:flex-row gap-6 p-2'>

                                {/* LEFT */}
                                <div className='flex flex-col gap-y-4 md:w-[60%]'>

                                    <img
                                        src={each.images[active]}
                                        alt="Images"
                                        className='w-full rounded-lg'
                                    />

                                    <div className='flex gap-2 pt-3'>
                                        {each?.images.map((i, id) => (
                                            <img
                                                key={id}
                                                src={i}
                                                alt="img"
                                                onClick={() => setActive(id)}
                                                className={`rounded-md w-16 cursor-pointer ${active === id ? 'border-2 border-[#c658f9]' : ''
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <h5 className='text-sm font-semibold'>We Sell/Our Services</h5>

                                    <div className='flex flex-wrap gap-2'>
                                        {each.services.map((s, index) => (
                                            <div key={index} className='bg-[#f2e4f2] px-3 py-2 rounded-lg'>
                                                <span className='text-xs font-bold text-[#9458f5]'>{s}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <h5 className='text-sm font-semibold'>About Us</h5>
                                        <p className='text-sm text-gray-600'>{each.description}</p>
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className='flex flex-col md:w-[40%] gap-4'>

                                    {/* NAME + OPEN */}
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <h1 className='text-lg font-semibold'>{each.name}</h1>

                                            <span className='bg-green-500 text-white text-xs px-2 py-1 rounded-md'>
                                                Open
                                            </span>
                                        </div>

                                        <Icon icon='mdi:share-outline' className='text-xl cursor-pointer' />
                                    </div>

                                    {/* FOLLOW */}
                                    <div className='flex items-center gap-2'>
                                        <button className='bg-gray-100 px-3 py-1 rounded-lg text-xs font-semibold'>
                                            Follow
                                        </button>
                                        <span className='text-sm text-gray-500'>
                                            {each.followers} followers
                                        </span>
                                    </div>

                                    {/* RATING */}
                                    <div className='flex items-center gap-2'>
                                        <div className='flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-md'>
                                            <Icon icon='mdi:star' className='text-yellow-500' />
                                            <span className='text-sm font-bold'>
                                                {each.averageRating}
                                            </span>
                                        </div>

                                        <span className='text-purple-500 text-sm font-semibold underline cursor-pointer'>
                                            ({each.numReviews} reviews)
                                        </span>
                                    </div>

                                    {/* CATEGORY */}
                                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                                        <Icon icon="mdi:tag-outline" />
                                        <span>{each.category}</span>
                                    </div>

                                    {/* WORKING DAYS */}
                                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                                        <Icon icon="mdi:calendar-outline" />
                                        <span>{each.workingDays?.join(", ")}</span>
                                    </div>

                                    {/* TIMINGS */}
                                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                                        <Icon icon="mdi:clock-outline" />
                                        <span>
                                            {each.timings?.open} - {each.timings?.close}
                                        </span>
                                    </div>

                                    {/* PHONE */}
                                    <div className='flex items-center gap-2 text-sm text-blue-600'>
                                        <Icon icon="mdi:phone-outline" />
                                        <a href={`tel:${each.phone}`} className='underline'>
                                            {each.phone}
                                        </a>
                                    </div>

                                    {/* ADDRESS */}
                                    <div className='flex items-center gap-2 text-sm text-blue-600'>
                                        <Icon icon="mdi:map-marker-outline" />
                                        <span className='underline cursor-pointer'>
                                            {each.address}
                                        </span>
                                    </div>

                                    {/* DISTANCE */}
                                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                                        <Icon icon="mdi:crosshairs-gps" />
                                        <span>{each.distance}</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default MyStoreDetails
