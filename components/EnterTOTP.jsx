'use client'
import RegisterForm from "@/components/Register"
import QRCode from "@/components/Qrview";
import { useState } from "react";
import { useRouter } from "next/navigation";
import QRImg from "@/components/Qrview";
import { Result } from "postcss";
export default function EnterOTP(){

    const [userId, setUserId] = useState(
        window.localStorage.getItem('user_id') || ''
    )
    const router = useRouter()
    if(userId == '') {
       
        alert('User ID not found. Please Login first!')
        router.push('/')
    }

    const [OTP, setOTP] = useState('')

    async function validate(){
        const response = await fetch('https://mfaecho-1-n7940582.deta.app/api/auth/otp/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                token: OTP
            })
        })
        response.json().then(res => {
            if('otp_valid' in res){
                if(res.otp_valid == true){
                    window.localStorage.setItem('access_token', userId)
                    window.location.href = '/success'
                }
            }
        })
    }

    const [modal, setModal] = useState(false)

    function Modal({ modal, setModal }){
        if(modal) return (
        <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 100 + '%',
            height: 100 + '%'
         }}>
        <div class="relative bg-white rounded-lg shadow light:bg-gray-800">
            
            <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 light:text-black">
                    
                </h3>
                <QRImg userId={userId}/>
                </div>
                <div class="p-6 space-y-6">

                </div>
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button 
                        onClick={() => {setModal(false)}}
                    >
                        Close
                    </button>
                </div>
            </div>
            </div>
        )
    }
    
    return (
    <div className="grid place-items-center h-screen" >
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">Enter OTP Code</h1>

            <form style={{ 
                marginBottom: 2 + 'vh'
             }}>
                <input type='text' placeholder="Enter OTP"
                    value={OTP}
                    onChange={(e) => {
                        setOTP(e.target.value)
                    }}
                />
            </form>
            <button data-modal-target="small-modal" data-modal-toggle="small-modal" style={{ 
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <a className="underline"
                        onClick={() => {setModal(true)}}
                    >
                        Regenerate QR Code?
                    </a>
            </button>


                <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {/* <button className="bg-gray-600 text-white font-bold cursor-pointer px-6 py-2"
                        onClick={() => {window.location.href = '/viewQR'}}
                    >Back</button> */}
                    <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2"
                        onClick={validate}
                    >Next</button>
                </div>
        </div>

        <Modal modal={modal} setModal={setModal} />

    </div>
    ) ;
}