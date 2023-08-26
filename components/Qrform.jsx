'use client'
import RegisterForm from "@/components/Register"
import QRCode from "@/components/Qrview";
import { useState } from "react";
import { useRouter } from "next/navigation";
import QRImg from "@/components/Qrview";
export default function ViewQR(){

    const [userId, setUserId] = useState(
        window.localStorage.getItem('user_id') || ''
    )
    
    const router = useRouter()
    if(userId == '') {
        
        alert('User ID not found. Please Login first!')
        router.push('/')
    }

    
    return (
    <div className="grid place-items-center h-screen" >
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">Scan QR Code</h1>
                <QRImg userId={userId}/>
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    {/* <button className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2">Back</button> */}
                    <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2"
                        onClick={() => {window.location.href = '/enterOTP'}}
                    >Next</button>
                </div>
        </div>
    </div>
    ) ;
}