import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import Header from '../components/feeds/Header'
import { useDispatch, useSelector } from "react-redux";
import { Circles } from 'react-loader-spinner'
import HeaderFeeds from '../components/feeds/HeaderFeeds';
import { fetchAllJobs } from '../redux/slices/JobFeedSlice';
import JobsDetails from '../components/feeds/JobsDetails';

function JobsFeed() {
  const items = [
    {}
  ]
  const [isActive, setIsActive] = useState(1)
  const dispatch = useDispatch();
  const { loading, feeds } = useSelector(
    (state) => state.jobsFeed
  );

  useEffect(() => {
    dispatch(fetchAllJobs())
  }, [])



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

            <JobsDetails feeds={feeds} />

          </div>
        </div>
      </div>
    </>

  )
}

export default JobsFeed
