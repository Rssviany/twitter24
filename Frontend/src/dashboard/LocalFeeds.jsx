import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import Header from '../components/feeds/Header'
import { Icon } from '@iconify/react';
import Search from '../components/feeds/Search';
import { useDispatch, useSelector } from "react-redux";
import { fetchLocalFeeds } from '../redux/slices/LocalFeedSlice';
import GetFeedDetails from './GetFeedDetails';
import PostLocalFeed from '../components/feeds/PostLocalFeed';
import { Circles } from 'react-loader-spinner'
import HeaderFeeds from '../components/feeds/HeaderFeeds';

function LocalFeeds() {
    const [isActive, setIsActive] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [openCreatePost, setOpenCreatePost] = useState(false);
    const dispatch = useDispatch();
    const { loading, feeds } = useSelector((state) => state.localFeeds);

    const items = [
        { id: 1, title: 'Discover', icon: 'mdi:compass' },
        { id: 2, title: 'My Posts', icon: 'mdi:notebook' }
    ]

    useEffect(() => {
        dispatch(fetchLocalFeeds());
    }, [dispatch]);
    return (
        <>
            <div className='w-full h-screen md:flex transition-all ease-in-out duration-1000 '>

                <div className="md:h-screen">
                    <LeftSideBar />
                </div>
                <div className='flex-1 h-screen md:overflow-y-auto  gap-y-4'>
                    <Header />
                    <div className='flex flex-col flex-start  lg:mx-30 xl:mx-50 space-y-5'>

                        <HeaderFeeds
                            setIsActive={setIsActive} items={items}
                            isActive={isActive} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}
                            title='Local Feeds'
                            para='Stay updated with the latest from local businesses in your area.New arrivals,store updates and more ,all in one place.' />
                        {/* DISCOVER POSTS */}
                        {loading &&
                            (
                                <div className="flex justify-center items-center h-screen">
                                    <Circles height="80" width="80" color="#4fa94d" visible={true} />
                                </div>
                            )}
                        {isActive === 1 && (
                            <GetFeedDetails
                                feeds={feeds}
                                isCommentOpen={isCommentOpen}
                                setIsCommentOpen={setIsCommentOpen}
                            />
                        )}

                        {/* MY POSTS */}
                        {isActive === 2 && (
                            <>
                                {openCreatePost ? (
                                    <div className='w-[80%]'>
                                        <PostLocalFeed title='Posting Local Feed' />
                                    </div>
                                ) : (
                                    <button
                                        className='w-full rounded-lg p-1.5 bg-linear-to-r from-[#f391f6] to-[#6e57ef] text-white text-sm cursor-pointer font-semibold'
                                        onClick={() => setOpenCreatePost(true)}
                                    >
                                        Create New Post
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30"
                    onClick={() => setIsFilterOpen(false)}
                />
            )}
            {isCommentOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30"
                    onClick={() => setIsCommentOpen(false)}
                />
            )}
        </>
    )
}

export default LocalFeeds
