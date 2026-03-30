import React, { useEffect, useRef, useState } from 'react'
import CommonHeader from '../components/CommonHeader'
import CommonButton from '../components/CommonButton'
import { useLocation } from "react-router-dom";
import { verifyOTP } from "../api/auth.api";

import { useNavigate } from 'react-router-dom';


function VerifyOtp() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState(Array(6).fill(""))
    const [loading, setLoading] = useState(false)
    const inputsRef = useRef([])

    useEffect(() => {
        inputsRef.current[0]?.focus()
    }, []);


    const email = localStorage.getItem("resetEmail");

    useEffect(() => {
        if (!email) {
            navigate("/forget-password");
        }
    }, [email, navigate]);

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            inputsRef.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6)

        if (!/^\d+$/.test(pasteData)) return

        const newOtp = pasteData.split("")
        const updatedOtp = [...otp]

        for (let i = 0; i < 6; i++) {
            updatedOtp[i] = newOtp[i] || ""
        }

        setOtp(updatedOtp)

        const lastIndex = newOtp.length - 1
        if (lastIndex < 6) {
            inputsRef.current[lastIndex]?.focus()
        }
    }

    const submitOtp = async (e) => {
        e.preventDefault();

        const finalOtp = otp.join("");

        if (finalOtp.length < 6) {
            alert("Please enter complete OTP");
            return;
        }

        try {
            setLoading(true);

            const response = await verifyOTP({
                email,
                otp: finalOtp
            });

            const resetToken = response.data.resetToken;

            navigate(`/reset-password/${resetToken}`);

        } catch (error) {
            console.log("FULL ERROR:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else if (error.request) {
                alert("No response from server. Is backend running?");
            } else {
                alert(error.message);
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className='bg-linear-to-b from-[#ffffff] to-[#ceeaf4] bg-cover flex  items-center justify-center min-h-screen shadow-2xs hover:shadow-2xl '>
            <div className='bg-white px-8 py-6 flex flex-col rounded-lg space-y-4 w-fit'>
                <CommonHeader title='Verify OTP' para={`Enter the 6 digit code that sent to your Email address.`} />
                <form className='flex flex-col flex-start my-2 space-y-2' onSubmit={submitOtp}>
                    <div className='flex gap-3' onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                ref={(el) => (inputsRef.current[index] = el)}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className='w-12 h-12 text-center text-xl font-semibold border border-gray-400 rounded-md focus:outline-none focus:border-[#9c62ee] transition'
                            />
                        ))}
                    </div>
                    <CommonButton text1='Verifying...' text2='Verify' isSubmitting={loading} />
                </form>
                <div className='flex flex-col items-center gap-y-2 mt-5'>
                    <h4 className='items-center text-sm text-gray-800 '>Didn't receive the code?</h4>
                    <button className='w-full py-2 rounded-md items-center text-sm border text-[#b621f5] border-[#b621f5]' onClick={() => navigate('/login')}>Resend</button>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp
