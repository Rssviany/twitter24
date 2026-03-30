import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import Header from '../components/feeds/Header'
import { useDispatch, useSelector } from "react-redux";
import { Circles } from 'react-loader-spinner'
import HeaderFeeds from '../components/feeds/HeaderFeeds';
import { fetchNearByStores } from '../redux/slices/StoreFeedSlice';
import StoreFeedDetails from '../components/feeds/StoreFeedDetails';

function RadiusFeed() {
    const [isActive, setIsActive] = useState(1);
    const dispatch = useDispatch();
    const { loading, storeFeeds } = useSelector((state) => state.storeFeed)

    const items = [
        { id: 1, title: 'Discover', icon: 'mdi:compass' },
        { id: 2, title: 'Favorites', icon: 'mdi:favorite-outline' }
    ]

    useEffect(() => {
        dispatch(fetchNearByStores());
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
                            isActive={isActive}
                            title='Radius'
                            para='Stay updated with the latest from local businesses in your area.New arrivals,store updates and more ,all in one place.' />
                        {/* DISCOVER POSTS */}
                        {loading &&
                            (
                                <div className="flex justify-center items-center h-screen">
                                    <Circles height="80" width="80" color="#4fa94d" visible={true} />
                                </div>
                            )}
                        {isActive && (
                            <StoreFeedDetails
                                feeds={storeFeeds}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RadiusFeed
