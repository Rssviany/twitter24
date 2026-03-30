import React from 'react'
import CommonHeader from '../components/CommonHeader'
import CommonButton from '../components/CommonButton'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../api/auth.api';
import { useDispatch } from 'react-redux'


const schema = yup.object().shape({
    email: yup
        .string()
        .email('Enter a valid email address')
        .required('Email is required'),
})

function ForgetPassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const submitForm = async (data) => {
        try {
            await forgotPassword(data);
            localStorage.setItem("resetEmail", data.email);

            navigate('/verify-otp', {
                state: { email: data.email }
            });

        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };
    return (
        <div className='bg-linear-to-b from-[#ffffff] to-[#ceeaf4] bg-cover flex  items-center justify-center min-h-screen shadow-2xs hover:shadow-2xl '>
            <div className='bg-white px-8 py-6 flex flex-col rounded-lg space-y-4 w-fit'>
                <CommonHeader title='Forget Password?' para={`Don't worry.We will help you recover it.`} />
                <form className='flex flex-col flex-start my-2 space-y-2' onSubmit={handleSubmit(submitForm)}>
                    <div>
                        <input type="email" placeholder='Email' {...register("email")} className={`w-70 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border text-gray-600 text-md ${errors.email ? "border-red-500" : "border-gray-600"}`} />
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                          ${errors.email ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                            {errors.email?.message}
                        </p>
                    </div>
                    <CommonButton text2='Send OTP' text1='Sending OTP...' isSubmitting={isSubmitting} />
                </form>
                <div className='flex flex-col items-center gap-y-2 mt-5'>
                    <h4 className='items-center text-sm text-gray-800 '>Remembered your password?</h4>
                    <button className='w-full py-2 rounded-md items-center text-sm border text-[#b621f5] border-[#b621f5]' onClick={() => navigate('/login')}>Log In Now</button>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
