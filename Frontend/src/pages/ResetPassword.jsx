import React, { useEffect, useState } from 'react'
import CommonHeader from '../components/CommonHeader'
import CommonButton from '../components/CommonButton'
import hidden from '../assets/icons/hidden.png'
import show from '../assets/icons/show.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { setPassword } from "../api/auth.api";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'Password must be atleast 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm your Password'),
})

function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const navigate = useNavigate()
    const { token: resetToken } = useParams();

    useEffect(() => {
        if (!resetToken) {
            navigate("/forget-password");
        }
    }, [resetToken, navigate]);

    const {
        register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const submitForm = async (data) => {
        try {
            await setPassword({
                resetToken,
                newPassword: data.password
            });

            alert("Password updated successfully");
            navigate("/login");

        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };
    return (
        <div className='bg-linear-to-b from-[#ffffff] to-[#ceeaf4] bg-cover flex  items-center justify-center min-h-screen shadow-2xs hover:shadow-2xl '>
            <div className='bg-white px-8 py-6 flex flex-col rounded-lg space-y-4 w-fit'>
                <CommonHeader title='Set New Password?' para={`Enter and confirm your account password.`} />
                <form className='flex flex-col flex-start my-2 space-y-6' onSubmit={handleSubmit(submitForm)}>
                    <div className='relative'>
                        <input type={showPassword ? "text" : "password"} placeholder='Password' {...register("password")} className={`w-70 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border ${errors.password ? "border-red-500" : "border-gray-600"} text-md border-gray-500`} />
                        <img src={`${showPassword ? hidden : show}`} alt="..." className='absolute size-4 right-6 cursor-pointer top-3 ' onClick={() => setShowPassword(prev => !prev)} />
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                                              ${errors.password ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                            {errors.password?.message}
                        </p>
                    </div>
                    <div className='relative'>
                        <input type={confirmPassword ? "text" : "password"} placeholder='Confirm Password' {...register("confirmPassword")} className={`w-70 h-8 outline-none cursor-pointer rounded-md px-3 py-4 border ${errors.password ? "border-red-500" : "border-gray-600"} text-md border-gray-500`} />
                        <img src={`${confirmPassword ? hidden : show}`} alt="..." className='absolute size-4 right-6 cursor-pointer top-3 ' onClick={() => setConfirmPassword(prev => !prev)} />
                        <p className={`text-red-500 text-sm transition-all duration-300 overflow-hidden 
                                              ${errors.confirmPassword ? "opacity-100 max-h-10 mt-1" : "opacity-0 max-h-0"}`} >
                            {errors.confirmPassword?.message}
                        </p>
                    </div>
                    <CommonButton text2='Save Password' text1='Saving...' isSubmitting={isSubmitting} />
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
