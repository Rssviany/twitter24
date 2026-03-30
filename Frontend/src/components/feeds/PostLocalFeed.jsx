import { Icon } from '@iconify/react'
import React, { useState } from 'react'

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { localPost } from '../../api/LocalFeed.api'



function PostLocalFeed({title}) {

    const { register, handleSubmit, setValue, reset } = useForm()

    const [radius, setRadius] = useState(false);
    const [isDropDown, setIsDropDown] = useState(false);
    const [location, setLocation] = useState("");
    const [CategoryValue, setCategoryValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const mutation = useMutation({
        mutationFn:(data)=> localPost(data),
        onSuccess: () => {
            alert("Post Created Successfully")
            reset()
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const onSubmit = (data) => {

        const payload = {
            ...data,
            city: location,
            category: CategoryValue,
            title: inputValue
        }

        mutation.mutate(payload)
    }

    //getting location
    const getUserLocation = () => {

        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
                {
                    headers: {
                        "Accept-Language": "en"
                    }
                }
            );

            const data = await res.json();

            const village =
                data.address.village ||
                data.address.town ||
                data.address.hamlet ||
                "";

            const district =
                data.address.county ||
                data.address.state_district ||
                "";

            const location = `${village}, ${district}`;

            setLocation(location);
            setValue("city", location)

        });
    };

    const listItems = [
        { id: 1, title: 'Offers' },
        { id: 2, title: 'Electronics' },
        { id: 3, title: 'Food & Dining' },
        { id: 4, title: 'Groceries' },
        { id: 5, title: 'Fashion' },
        { id: 6, title: 'Services' },
        { id: 7, title: 'Events' },
    ]

    return (
        <div className='flex-1 flex-col gap-y-4 px-4 py-4 '>
            <div className='flex flex-row gap-x-2 items-center'>
                <Icon icon='mdi:arrow-left' className='text-2xl font-stretch-90% text-black/65' onClick={() => { }} />
                <span className='text-lg text-black/80 font-semibold'>{title}</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='px-2 py-2 flex flex-col gap-y-3 flex-start'>

                <div className='flex flex-col gap-y-2'>
                    <span className='text-sm text-black/80 font-semibold'>Posting Location</span>
                    <input
                        type="text"
                        value={location}
                        onClick={getUserLocation}
                        readOnly
                        placeholder="Click to detect location"
                        className='w-full rounded-xl px-2 py-2 text-sm outline-none border border-gray-300 cursor-pointer'
                    />
                </div>

                <div className='flex flex-col gap-y-2'>
                    <span className='text-sm text-black/80 font-semibold'>Post Category</span>
                    <input type="text" value={CategoryValue} className='w-full rounded-xl px-2  py-2 outline-none border border-gray-300' onClick={() => setIsDropDown(true)} placeholder='Select Category' />

                    {isDropDown && (
                        <ul className='border border-gray-500 flex flex-col gap-y-2 px-2 py-2'>
                            {listItems.map((list) => (
                                <div key={list.id}
                                    className='hover:bg-blue-500 p-1 rounded-lg cursor-pointer'
                                    onClick={() => {
                                        setIsDropDown(false)
                                        setCategoryValue(list.title)
                                        setValue("category", list.title)
                                    }}>
                                    <li className='text-sm text-gray-800 font-semibold'>{list.title}</li>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='flex flex-col gap-y-2'>
                    <span className='text-sm text-black/80 font-semibold'>Post title</span>
                    <input
                        type='text'
                        value={inputValue}
                        {...register("title")}
                        onChange={(e) => setInputValue(e.target.value)}
                        className='w-full rounded-xl p-1 text-sm outline-none border border-gray-300'
                    />
                </div>

                <div className='flex flex-col gap-y-2'>
                    <span className='text-sm text-black/80 font-semibold'>Description</span>
                    <textarea
                        {...register("description")}
                        className='w-full rounded-xl p-1 outline-none border border-gray-300'
                    />
                </div>

                {/* image/video */}
                <div className='flex flex-col gap-y-3'>
                    <span className='text-sm text-black/80 font-semibold'>Image/Video</span>
                    <span className='text-xs text-black/60'>Max size:10 MB for images, 50MB for video</span>
                    <div className='border-dashed border-2 w-fit rounded-lg p-4 flex items-center border-[#7a6cf8] cursor-pointer'>
                        <div className='flex flex-col gap-y-2 items-center'>
                            <Icon icon='mdi:upload' className='text-lg text-[#7e69f0]' />
                            <span className='text-xs text-[#7e69f0]'>Upload</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-y-2'>
                    <span className='text-sm text-black/80 font-semibold'>URL/Links.</span>
                    <span className='text-xs text-black/60'>Add a link and name,it wi'll appear as a button in your post.</span>

                    <input {...register("buttonName")} type="text" className='w-full text-sm font-semibold text-black/80 cursor-pointer rounded-lg border border-gray-300 outline-none px-2 py-2' placeholder='Button Name' />

                    <input {...register("buttonLink")} type="text" className='w-full text-sm font-semibold text-black/80 cursor-pointer rounded-lg border border-gray-300 outline-none px-2 py-2' placeholder='Enter or Paste URL/Link' />

                    <div className='border-dashed border-2 w-full rounded-lg p-4 flex items-center justify-center border-[#7a6cf8] cursor-pointer'>
                        <span className='text-sm font-semibold text-[#7a6cf8]'> + Add One More Link</span>
                    </div>
                </div>

                <div className='flex flex-col gap-y-2'>
                    <span className='text-sm text-black/80 font-semibold'>Tags</span>
                    <span className='text-xs text-black/60'>Type and press comma or enter to add tags</span>

                    <input
                        {...register("tags")}
                        type='text'
                        className='w-full rounded-xl text-sm font-semibold text-black/80 p-1 outline-none border border-gray-300'
                        placeholder='food,biryani,dum biryani...'
                    />
                </div>

                <div className='flex flex-row w-full justify-around items-center'>
                    <button
                        type="submit"
                        className='w-[40%] rounded-lg p-1.5 bg-linear-to-r from-[#f391f6] to-[#6e57ef] text-white items-center text-sm cursor-pointer font-semibold'>
                        Post
                    </button>

                    <button
                        type="button"
                        className='w-[40%] rounded-lg p-1.5 border border-[#6e57ef] text-[#6e57ef] items-center text-sm cursor-pointer font-semibold'>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}

export default PostLocalFeed