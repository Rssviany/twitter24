import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { format } from "timeago.js";
import PostLocalFeed from './PostLocalFeed';


function OfferFeedDetails({ feeds, isActive }) {
    const [createLocalOffer, setCreateLocalOffer] = useState(false);
    const [createGlobalOffer, setCreateGlobalOffer] = useState(false)
    return (
        <>
            <div className='flex flex-col px-4 gap-y-4 mb-4 duration-1000 transition-all ease-in-out '>
                {isActive === 3 && (
                    <div className='flex flex-row gap-x-1 items-center'>
                        <button
                            className='w-full rounded-lg p-1.5 bg-linear-to-r from-[#f391f6] to-[#6e57ef] text-white text-sm cursor-pointer font-semibold'
                            onClick={() => {
                                setCreateLocalOffer(true)
                                setCreateGlobalOffer(false)
                            }}
                        >
                            Create Local Offer
                        </button>
                        <button
                            className='w-full rounded-lg p-1.5 bg-linear-to-r from-[#f391f6] to-[#6e57ef] text-white text-sm cursor-pointer font-semibold'
                            onClick={() => {
                                setCreateGlobalOffer(true)
                                setCreateLocalOffer(false)
                            }}
                        >
                            Create Global Offer
                        </button>
                    </div>
                )}
                {createGlobalOffer &&
                    <PostLocalFeed title='Post Global Offer' />
                }
                {createLocalOffer &&
                    <PostLocalFeed title='Post Local Offer' />
                }

                {feeds?.map((each) => (

                    <React.Fragment key={each._id}>


                        <div className='border border-gray-300 rounded-xl px-4 py-4 flex flex-col gap-y-3 w-full'>
                            <div className='flex flex-row gap-x-3 items-center'>
                                <img
                                    src={each?.userId?.profileImage || "https://i.pravatar.cc/40"}
                                    alt={each.name} className='size-xl rounded-full object-cover' />
                                <div className='flex flex-col gap-y-1  flex-start'>
                                    <h6 className='text-sm text-black/75 font-semibold'>{each?.userId?.name}</h6>
                                    <span className='text-sm text-black/50'>{format(each?.createdAt)}</span>
                                </div>
                            </div>
                            <h1 className='text-md text-black font-semibold'>{each.title}</h1>

                            <p className='text-sm text-gray-400 font-semibold'>{each.description}</p>

                            <img src={each.image} alt={each.title} className='w-[80%] h-60 object-cover rounded-xl' />

                            <div className='flex flex-row items-center gap-x-2'>
                                <Icon icon='mdi:location-outline' className='text-[#9c7cee] text-xl' />
                                <p className='text-sm font-semibold text-gray-600 border-b border-gray-600'>
                                    {each.address}
                                </p>
                            </div>
                            <span className='text-sm text-black/70 font-semibold'>Valid Till Upto:{each.validTill}</span>
                        </div>

                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default OfferFeedDetails
