import React from 'react'

function CommonButton({isSubmitting,text1,text2}) {
    return (
        <div className='flex'>
            <button type='submit' disabled={isSubmitting} className={`w-full py-2 rounded-md text-white transition-all duration-300
                                ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-[#9c62ee] to-[#591eef] hover:opacity-90"
                }`}>{isSubmitting ? text1 : text2}</button>
        </div>
    )
}

export default CommonButton
