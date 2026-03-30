import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyOtp from './pages/VerifyOtp'
import LocalFeeds from './dashboard/LocalFeeds'
import GlobalFeeds from './dashboard/GlobalFeeds'
import RadiusFeed from './dashboard/RadiusFeed'
import OffersFeed from './dashboard/OffersFeed'
import JobsFeed from './dashboard/JobsFeed'
import MyStore from './dashboard/MyStore'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path='/' element={<LocalFeeds />} />
        <Route path='/global_feeds' element={<GlobalFeeds />} />
        <Route path='/radius' element={<RadiusFeed />} />
        <Route path='/offers' element={<OffersFeed />} />
        <Route path='/jobs' element={<JobsFeed />} />
        <Route path='/mystore' element={<MyStore />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
