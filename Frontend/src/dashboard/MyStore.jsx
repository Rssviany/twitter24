import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import Header from '../components/feeds/Header'
import { useDispatch, useSelector } from "react-redux";
import { Circles } from 'react-loader-spinner'
import HeaderFeeds from '../components/feeds/HeaderFeeds';
import { fetchStores } from '../redux/slices/MyStoreSlice';
import MyStoreDetails from '../components/feeds/MyStoreDetails';
import EditStore from '../components/feeds/EditMyStoreDetails';


function MyStore() {
  const [isActive, setIsActive] = useState(1);

  const dispatch = useDispatch();
  const { loading, stores } = useSelector(
    (state) => state.stores
  );

  const items = [
    { id: 1, title: 'My Store Page', icon: 'mdi:store-outline' },
    { id: 2, title: 'Edit Store Page', icon: 'mdi:edit-outline' },
  ]

  useEffect(() => {
    dispatch(fetchStores())

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
              title='My Store Page'
              para='See how your store page look to customers and edit your store information.' />
            {/*  POSTS */}
            {loading &&
              (
                <div className="flex justify-center items-center h-screen">
                  <Circles height="80" width="80" color="#4fa94d" visible={true} />
                </div>
              )}
            {isActive === 1 ? (
              <MyStoreDetails feeds={stores} />
            ) : (
              <EditStore />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyStore
