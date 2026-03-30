import { Icon } from '@iconify/react'
import React from 'react'
import { togglerLikes } from '../api/LocalFeed.api';
import CommentModal from '../components/feeds/CommentModel';
import { useDispatch } from "react-redux";
import { updatePostLike } from '../redux/slices/LocalFeedSlice';
import { format } from "timeago.js";


function GetFeedDetails({ feeds, setIsCommentOpen, isCommentOpen }) {

    const dispatch = useDispatch();

    const handleLikes = async (postId) => {
        try {

            const res = await togglerLikes(postId);

            dispatch(
                updatePostLike({
                    postId,
                    likesCount: res.data.likesCount,
                    isLiked: res.data.isLiked
                })
            );

        } catch (error) {
            console.log('Error while giving like', error);
        }
    }

    return (
        <>
            <div className='flex flex-col px-4 gap-y-4 mb-4 '>
                {feeds?.map((each) => (
                    <React.Fragment key={each._id}>

                        <div className='border border-gray-300 rounded-xl px-4 py-4 flex flex-col gap-y-3 w-full'>
                            <div className='flex flex-row gap-x-3 items-center'>
                                <img src={each.profileImage || "https://i.pravatar.cc/40"} alt={each.name} className='size-xl rounded-full object-cover' />
                                <div className='flex flex-col gap-y-1  flex-start'>
                                    <h6 className='text-sm text-black/75 font-semibold'>{each?.userId?.name}</h6>
                                    <span className='text-sm text-black/50'>{format(each?.createdAt)}</span>
                                </div>
                            </div>
                            <h1 className='text-md text-black font-semibold'>{each.title}</h1>

                            <p className='text-sm text-gray-400 font-semibold'>{each.description}</p>

                            <img src={each.image} alt={each.title} className='w-[80%] h-60 object-cover rounded-xl' />

                            <div className='flex flex-row gap-x-4 py-3'>
                                {each.links?.map((link, index) => (
                                    <a key={index} href={link.url} target="_blank" rel='noopener noreferrer'
                                        className="border border-gray-300 rounded-xl px-3  w-fit hover:bg-gray-100">
                                        <span className="text-[#613df0] text-xs font-semibold">{link.label}</span>
                                    </a>
                                ))}
                            </div>

                            <div className='flex flex-row items-center gap-x-2'>
                                <Icon icon='mdi:location-outline' className='text-[#9c7cee] text-xl' />
                                <p className='text-sm font-semibold text-gray-600 border-b border-gray-600'>
                                    {each.address}
                                    <span className='text-sm font-semibold text-gray-600 border-none!'>--{each.radius}Km away</span>
                                </p>
                            </div>

                            <div className='flex flex-row items-center gap-x-1'>
                                <p className='text-gray-600 font-semibold text-lg -translate-y-0.5'>{each.likesCount}</p>

                                <Icon
                                    icon={each.isLiked ? 'mdi:heart' : 'mdi:heart-outline'}
                                    className={`${each.isLiked ? 'text-red-500' : 'text-gray-600'} text-lg object-center items-center cursor-pointer`}
                                    onClick={() => handleLikes(each._id)}
                                />

                                <div className='flex flex-row gap-x-1 items-center'>
                                    <span className='text-gray-600 font-semibold text-lg -translate-y-0.5 ml-3'>{each.commentsCount}</span>

                                    <Icon
                                        icon='mdi:comment-outline'
                                        className='text-lg text-gray-600 cursor-pointer'
                                        onClick={() => setIsCommentOpen(prev => !prev)}
                                    />
                                </div>
                            </div>

                        </div>

                        {isCommentOpen && (
                            <CommentModal postId={each._id} setIsCommentOpen={setIsCommentOpen} />
                        )}

                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default GetFeedDetails
