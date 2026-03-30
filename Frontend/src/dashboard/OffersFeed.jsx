import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import Header from '../components/feeds/Header'
import { useDispatch, useSelector } from "react-redux";
import { Circles } from 'react-loader-spinner'
import HeaderFeeds from '../components/feeds/HeaderFeeds';
import OfferFeedDetails from '../components/feeds/OfferFeedDetails';
import { fetchAllOffers, fetchLocalOffers, fetchMyOffers } from '../redux/slices/OfferFeedSlice';

function OffersFeed() {
    const [isActive, setIsActive] = useState(2);
    
    const dispatch = useDispatch();
    const { loading, localFeeds, globalFeeds, myFeeds } = useSelector(
        (state) => state.offerFeed
    );

    const items = [
        { id: 1, title: 'Local Offers', icon: 'mdi:location-outline' },
        { id: 2, title: 'Global Offers', icon: 'mdi:globe-outline' },
        { id: 3, title: 'My Posts', icon: 'mdi:notebook' },
    ]

    useEffect(() => {
        if (isActive === 1 && localFeeds.length === 0) {
            dispatch(fetchLocalOffers("Kakinada"));
        } else if (isActive === 2 && globalFeeds.length === 0) {
            dispatch(fetchAllOffers());
        } else if (isActive === 3 && myFeeds.length === 0) {
            dispatch(fetchMyOffers());
        }
    }, [dispatch, isActive]);
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
                            title='Offers'
                            para='Discover the latest offers nearby stores & businesses.' />
                        {/*  POSTS */}
                        {loading &&
                            (
                                <div className="flex justify-center items-center h-screen">
                                    <Circles height="80" width="80" color="#4fa94d" visible={true} />
                                </div>
                            )}
                        <OfferFeedDetails isActive={isActive}
                            feeds={
                                isActive === 1
                                    ? localFeeds
                                    : isActive === 2
                                        ? globalFeeds :
                                        myFeeds
                            }
                        />

                    </div>
                </div>
            </div>
        </>
    )
}

export default OffersFeed
