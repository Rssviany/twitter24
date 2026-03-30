import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Filter from './Filter';

function Search({ isFilterOpen, setIsFilterOpen }) {

    return (
        <>
            <div className='flex flex-wrap gap-y-4   flex-row gap-x-2 px-4'>
                <div className='relative'>
                    <input type="text" className='outline-none border border-gray-300 rounded-xl px-2 py-2 text-black font-semibold text-sm min-w-md lg:min-w-xl ' placeholder='Search' />
                    <div className='absolute flex item-center p-1 bg-[#8b5bf1] rounded-full right-2 top-1.5 cursor-pointer'>
                        <Icon icon='mdi:search' className='text-md text-white' />
                    </div>
                </div>
                <Filter isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
                <div className='flex flex-row gap-x-1 items-center px-3 py-2 rounded-lg border cursor-pointer border-gray-300' onClick={()=>setIsFilterOpen(true)}>
                    <Icon icon='mdi:sort' className='text-xl text-black/60' />
                    <span className='text-black/60 text-sm font-semibold'>Sort by</span>
                </div>
            </div>

           
        </>
    )
}

export default Search
