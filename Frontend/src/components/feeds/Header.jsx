import { Icon } from '@iconify/react'
import React, { useState } from 'react'

function Header() {
    const [color, setColor] = useState(false);
    return (
        <div className={`flex flex-col gap-y-4 px-4 py-4 bg-white shadow-sm`}>
            <div className='flex flex-row gap-x-4 items-center'>
                <div className={`px-4 py-2 border border-black/10 rounded-3xl transition-all ease-in duration-300 shadow-xl ${color ? 'bg-[#22C55E]' : 'bg-gray-200 '} `}>
                    <div className='flex flex-row gap-x-2 items-center '>
                        <span className={` ${color ? 'text-white' : "text-black/40"} text-sm font-semibold`}>{color ? 'Online' : "Offline"}</span>
                        <div onClick={() => setColor(prev => !prev)} className={`rounded-full ${color ? 'border-0' : "border-2 border-gray-500"} cursor-pointer bg-gray-50  px-1 py-1 w-4 h-4`} />
                    </div>
                </div>
                <div className='border border-black/10 bg-white shadow-xs rounded-xl px-3 py-2 flex items-center flex-row gap-x-2'>
                    <Icon icon='mdi:location' className='text-xl text-[#9366ee]' />
                    <span className='text-black/70 font-semibold text-sm'>Kakinada</span>
                    <Icon icon='mdi:chevron-right' className='text-2xl cursor-pointer text-gray-400' />
                </div>
            </div>

        </div>
    )
}

export default Header
