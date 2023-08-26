'use client'
import RegisterForm from "@/components/Register"
import QRCode from "@/components/Qrview";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function EnterOTP(){

    const [userId, setUserId] = useState(
        window.localStorage.getItem('user_id') || ''
    )

    const [token, setToken] = useState(
        window.localStorage.getItem('access_token') || ''
    )
const router = useRouter()
    if(userId == '' || token == '') {
        alert('User ID or Token not found. Please Login first!')
        router.push('/')
    }

    
    return (
    <div className="grid place-items-center h-screen" >
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">Login Success</h1>

            <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2"
                onClick={() => {window.location.href = '/'}}
            >Home</button>
        </div>
    </div>
    ) ;
}