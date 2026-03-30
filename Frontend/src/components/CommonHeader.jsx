import React from 'react'
import logo from '../assets/logo.png'

function CommonHeader({ title, para }) {
    return (
        <>
            <div className='flex flex-row gap-x-2 items-center mx-auto'>
                <img src={logo} alt="twitter" className='size-8 rounded-md' />
                <h1 className='text-gray-600 font-semibold text-xl'>Twitter24</h1>
            </div>
            <div className='flex flex-col items-center space-y-2'>
                <h2 className='text-gray-800 text-2xl font-semibold'>{title}</h2>
                <p className='text-gray-400 text-md'>{para}</p>
            </div>
            </>
    )
}

export default CommonHeader
