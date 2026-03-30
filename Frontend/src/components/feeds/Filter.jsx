import { Icon } from '@iconify/react'
import React, { useState } from 'react'

function Filter({ isFilterOpen, setIsFilterOpen }) {

    const cat = [
        {
            id: 1,
            title: 'Category',
            items: [
                'All Categories',
                'Offers',
                'Food & Dining',
                'Groceries',
                'Electronics',
                'Fashion',
                'Beauty',
                'Fitness',
                'Services',
                'Events',
            ]
        },
        {
            id: 2,
            title: 'Distance Range',
            items: []
        },
        {
            id: 3,
            title: 'Post Type',
            items: []
        },
    ]

    const [activeFilterId, setActiveFilterId] = useState(1)

    return (
        <>

            <div
                className='flex flex-row gap-x-1 items-center px-3 py-2 rounded-lg border cursor-pointer border-gray-300'
                onClick={() => setIsFilterOpen(true)}
            >
                <Icon icon='mdi:filter-outline' className='text-xl text-black/60' />
                <span className='text-black/60 text-sm font-semibold'>Filter</span>
            </div>

            {isFilterOpen && (
                <div className='flex w-115 lg:w-150 h-100 bg-white rounded-xl shadow-xl fixed z-40'>

                    <div className='flex flex-col w-full h-full'>

                        {/* Header */}
                        <div className='flex flex-col gap-y-2 w-full pt-2'>
                            <h4 className='px-4 text-lg text-black/80 font-semibold'>Filters</h4>
                            <div className='border border-gray-200 w-full' />
                        </div>


                        <div className='flex flex-row justify-around pt-3'>
                            {cat.map((c) => (
                                <div
                                    key={c.id}
                                    className='flex flex-col items-center cursor-pointer w-full'
                                    onClick={() => setActiveFilterId(c.id)}
                                >
                                    <h2 className='text-sm text-black/80 font-semibold'>
                                        {c.title}
                                    </h2>

                                    <div
                                        className={`mt-2 h-0.5 w-full transition-all duration-300 ${activeFilterId === c.id
                                            ? 'bg-[#715ff8]'
                                            : 'bg-transparent'
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Content */}
                        <div className='flex-1 overflow-y-scroll px-6 py-4'>

                            {/* CATEGORY */}
                            {activeFilterId === 1 && (
                                <div className='flex flex-col gap-y-4'>
                                    {cat.find(c => c.id === 1).items.map((item, index) => (
                                        <div
                                            key={index}
                                            className='flex flex-row gap-x-3 items-center'
                                        >
                                            <input type="checkbox" className='size-4' />
                                            <span className='text-sm text-black/70 font-semibold'>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* DISTANCE */}
                            {activeFilterId === 2 && (
                                <div className='flex flex-col gap-y-6'>

                                    {/* Distance Cards Grid */}
                                    <div className='grid grid-cols-3 gap-4'>
                                        {[
                                            'upto 5km',
                                            'upto 10km',
                                            'upto 15km',
                                            'upto 20km',
                                            'upto 25km',
                                            'upto 30km',
                                            'upto 35km',
                                            'upto 40km',
                                            'upto 50km'
                                        ].map((range, index) => (
                                            <div
                                                key={index}
                                                className='border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-[#715ff8] hover:shadow-sm transition-all'
                                            >
                                                <h3 className='text-sm font-semibold text-black/80'>
                                                    {range}
                                                </h3>

                                                <div className='flex items-center gap-x-2 mt-2 text-xs text-black/60'>
                                                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                                    <span>000 Online</span>
                                                </div>

                                                <div className='flex items-center gap-x-2 mt-1 text-xs text-black/60'>
                                                    <span className='w-2 h-2 border border-black/40 rounded-full'></span>
                                                    <span>000 Total</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* OR RANGE SLIDER */}
                                    <div className='flex flex-col gap-y-3'>
                                        <h4 className='text-sm font-semibold text-black/80'>
                                            Or Select a Range
                                        </h4>

                                        <div className='flex items-center gap-x-4 text-xs text-black/60'>
                                            <div className='flex items-center gap-x-2'>
                                                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                                <span>000 Online</span>
                                            </div>
                                            <div className='flex items-center gap-x-2'>
                                                <span className='w-2 h-2 border border-black/40 rounded-full'></span>
                                                <span>000 Total</span>
                                            </div>
                                        </div>

                                        <input
                                            type="range"
                                            min="0"
                                            max="50"
                                            className='w-full accent-purple-600'
                                        />
                                    </div>

                                </div>
                            )}

                            {activeFilterId === 3 && (
                                <div className='flex flex-col gap-y-5'>

                                    {[
                                        'All Posts',
                                        'Text Posts',
                                        'Image Posts',
                                        'Video Posts'
                                    ].map((type, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center gap-x-3'
                                        >
                                            <input type="checkbox" className='size-4' />
                                            <span className='text-sm font-semibold text-black/70'>
                                                {type}
                                            </span>
                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>

                        <div className='flex flex-row justify-between px-6 py-4'>
                            <button className='w-1/2 mr-3 py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold'>
                                Apply
                            </button>

                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className='w-1/2 ml-3 py-3 rounded-xl border border-purple-500 text-purple-600 font-semibold'
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default Filter