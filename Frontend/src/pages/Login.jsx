import React, { useState } from 'react'
import hidden from '../assets/icons/hidden.png'
import show from '../assets/icons/show.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CommonHeader from '../components/CommonHeader';
import CommonButton from '../components/CommonButton';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { getCurrentUser, loginUser } from '../api/auth.api';
import { setUser } from '../redux/slices/AuthSlice';


const schema = yup.object().shape({
    number: yup
        .string()
        .matches(/^[0-9]{10}$/, "phone number must be 10 digits ")
        .required("Phone number is required"),

    password: yup
        .string()
        .min(6, 'Password must be atleast 6 characters ')
        .required('Password is required')
})
function Login() {
    const dispatch=useDispatch()
    const [showPassword, setShowPassword] = useState(false);
     const navigate=useNavigate()

    const {
        register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });


    const submitForm = async(data) => {
        try {
            await loginUser(data);
            const response=await getCurrentUser();

            dispatch(setUser(response.data))

            navigate('/');
        } catch (error) {
            console.log("Login Failed:", error.response?.data?.message);
            alert('Phone Number or Password is Invalid');
        }
    }
    return (
       
        <>

            <div className='bg-linear-to-b from-[#ffffff] to-[#ceeaf4] bg-cover flex  items-center justify-center min-h-screen shadow-2xs hover:shadow-2xl '>
                <div className='bg-white px-8 py-6 flex flex-col rounded-lg space-y-4 w-fit'>
                   <CommonHeader title='Welcome Back!' para='Sign in to discover businesses near you'/>
                    <form className='flex flex-col flex-start my-2' onSubmit={handleSubmit(submitForm)}>
                        <input type="phone Number" placeholder='Phone Number'{...register("number")} className={`w-70 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border text-gray-600 text-md ${errors.number ? "border-red-500" : "border-gray-600"}`} />
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                          ${errors.number ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                            {errors.number?.message}
                        </p>
                        <div className='relative'>
                            <input type={showPassword ? "text" : "password"} placeholder='Password' {...register("password")} className={`w-70 mt-2 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border ${errors.password ? "border-red-500" : "border-gray-600"} text-md border-gray-500`} />
                            <img src={`${showPassword ? hidden : show}`} alt="..." className='absolute size-4 right-2 cursor-pointer top-4 ' onClick={() => setShowPassword(prev => !prev)} />
                            <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                          ${errors.password ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                                {errors.password?.message}
                            </p>
                        </div>
                        <div className='flex flex-row-reverse my-2'>
                            <p className='text-gray-700 text-md self-end font-semibold font-sans cursor-pointer' onClick={()=>navigate('/forget-password')}>Forgot Password?</p>
                        </div>
                       <CommonButton isSubmitting={isSubmitting} text1='Loading...' text2='Log In' />
                    </form>
                    <div className='flex items-center space-y-1 flex-col mt-2'>
                        <h4 className='items-center text-sm text-gray-800 '>Don't have an account?</h4>
                        <button className='w-full py-2 rounded-md items-center text-sm border text-[#b621f5] border-[#b621f5]' onClick={()=>navigate('/sign-up')}>Sign Up Now!</button>
                        <div className='flex flex-row gap-x-2 mt-2'>
                            <p className='text-gray-600 text-sm font-semibold'>Terms & Conditions</p>
                            <span className='text-gray-600 text-sm text-bold'>|</span>
                            <p className='text-gray-600 text-sm font-semibold'>Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
