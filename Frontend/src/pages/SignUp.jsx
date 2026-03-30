import React, { useState } from 'react'
import hidden from '../assets/icons/hidden.png'
import show from '../assets/icons/show.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CommonHeader from '../components/CommonHeader';
import CommonButton from '../components/CommonButton';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signUpUser } from '../api/auth.api';
import {setUser} from '../redux/slices/AuthSlice' 

const schema = yup.object().shape({
    name: yup
        .string()
        .required('User Name should be provide'),
    number: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Phone number should be valid')
        .required('Phone Number is required'),
    email: yup
        .string()
        .email('Enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be atleast 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm your Password'),
    checkbox: yup
        .boolean()
        .oneOf([true], 'You must agree to the terms & conditions')
})

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch()
   
    const {
        register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const submitForm = async(data) => {
     try {
        const response=await signUpUser(data);

        dispatch(setUser(response.data));

        navigate('/login')
     } catch (error) {
         console.log("Login Failed:", error.response?.data?.message);
     }
    }
    return (

        <div className='bg-linear-to-b from-[#ffffff] to-[#ceeaf4] bg-cover flex  items-center justify-center min-h-screen shadow-2xs hover:shadow-2xl '>
            <div className='bg-white px-8 py-6 flex flex-col rounded-lg space-y-4 w-fit'>
                <CommonHeader title='Create An Account' para='Join to explore local businesses near you' />
                <form className='flex flex-col flex-start space-y-3' onSubmit={handleSubmit(submitForm)}>
                    <div>
                        <input type="text" placeholder='Name'{...register("name")} className={`w-70 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border text-gray-600 text-md ${errors.number ? "border-red-500" : "border-gray-600"}`} />
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                          ${errors.name ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                            {errors.name?.message}
                        </p>
                    </div>
                    <div>
                        <input type="phone Number" placeholder='Phone Number'{...register("number")} className={`w-70 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border text-gray-600 text-md ${errors.number ? "border-red-500" : "border-gray-600"}`} />
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                          ${errors.number ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                            {errors.number?.message}
                        </p>
                    </div>
                    <div>
                        <input type="email" placeholder='Email'{...register("email")} className={`w-70 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border text-gray-600 text-md ${errors.email ? "border-red-500" : "border-gray-600"}`} />
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                          ${errors.email ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                            {errors.email?.message}
                        </p>
                    </div>
                    <div className='relative'>
                        <input type={showPassword ? "text" : "password"} placeholder='Password' {...register("password")} className={`w-70 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border ${errors.password ? "border-red-500" : "border-gray-600"} text-md border-gray-500`} />
                        <img src={`${showPassword ? hidden : show}`} alt="..." className='absolute size-4 right-3 cursor-pointer top-3 ' onClick={() => setShowPassword(prev => !prev)} />
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                          ${errors.password ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                            {errors.password?.message}
                        </p>
                    </div>
                    <div className='relative'>
                        <input type={confirmPassword ? "text" : "password"} placeholder='Confirm Password' {...register("confirmPassword")} className={`w-70 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border ${errors.password ? "border-red-500" : "border-gray-600"} text-md border-gray-500`} />
                        <img src={`${confirmPassword ? hidden : show}`} alt="..." className='absolute size-4 right-3 cursor-pointer top-3 ' onClick={() => setConfirmPassword(prev => !prev)} />
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                          ${errors.confirmPassword ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                            {errors.confirmPassword?.message}
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex  flex-row gap-x-2 items-center'>
                            <input type="checkbox" {...register('checkbox')} className='size-4 ' />
                            <p className='text-sm text-gray-700 bg-green font-semibold'>I agree to the terms & conditions</p>
                        </div>
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden `} >
                            {errors.checkbox?.message}
                        </p>

                    </div>
                    <CommonButton isSubmitting={isSubmitting} text1='Loading...' text2='Create Account' />
                </form>
                <div className='flex items-center space-y-1 flex-col mt-2'>
                    <h4 className='items-center text-sm text-gray-800 '>Already have an account?</h4>
                    <button className='w-full py-2 rounded-md items-center text-sm border text-[#b621f5] border-[#b621f5]' onClick={() => navigate('/login')}>Log In</button>
                    <div className='flex flex-col items-center mt-3'>
                        <p className='text-sm text-gray-600'>By Signing Up you agree to</p>
                        <div className='flex flex-row gap-x-2 mt-1'>
                            <p className='text-gray-600 text-sm font-semibold'>Terms & Conditions</p>
                            <span className='text-gray-600 text-sm text-bold'>|</span>
                            <p className='text-gray-600 text-sm font-semibold'>Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
