import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { format } from "timeago.js";
import PostLocalFeed from './PostLocalFeed';


function JobsDetails({ feeds }) {
    return (
        <>
            <div className='flex flex-col px-4 gap-y-4 mb-4 duration-1000 transition-all ease-in-out '>
                {feeds?.map((each) => (

                    <React.Fragment key={each._id}>


                        <div className='border border-gray-300 rounded-xl px-4 py-4 flex flex-col gap-y-3 w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex flex-row gap-x-3 items-center'>
                                    <div className='flex rounded-full bg-[#e6d5e7] p-1.5 items-center'>
                                        <Icon icon='mdi:store' className='text-lg text-[#5e1ee8]' />
                                    </div>
                                    <div className='flex flex-col gap-y-1  flex-start'>
                                        <h6 className='text-sm text-black/75 font-semibold'>{each?.companyName}</h6>
                                        <span className='text-sm text-black/50'>{format(each?.createdAt)}</span>
                                    </div>
                                </div>
                                <div>
                                    <Icon icon='mdi:share-outline' className='text-2xl cursor-pointer text-gray-600' />
                                </div>
                            </div>
                            <h1 className='text-md text-black/80 font-semibold'>{each.title}</h1>
                            <div className="grid grid-cols-[120px_1fr] gap-y-1 text-sm text-gray-700">
                                <span className="font-semibold">Salary:</span>
                                <span>{each.salary}</span>

                                <span className="font-semibold">Experience:</span>
                                <span>{each.experience}</span>

                                <span className="font-semibold">Type:</span>
                                <span>{each.type}</span>

                                <span className="font-semibold">Timings:</span>
                                <span>{each.timings}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <h4 className="text-sm font-semibold text-black/80">Skills Required:</h4>

                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                    {each.skills?.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>

                            <img src={each.image} alt={each.title} className='w-[80%] h-60 object-cover rounded-xl' />

                            <div className='flex flex-row items-center gap-x-2'>
                                <Icon icon='mdi:location-outline' className='text-[#9c7cee] text-xl' />
                                <p className='text-sm font-semibold text-gray-600 border-b border-gray-600'>
                                    {each.address},{each.city}
                                </p>
                            </div>
                        </div>

                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default JobsDetails
