"use client"
import LoginForm from "@/src/components/LoginForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState(
    window.localStorage.getItem('access_token') || ''
  )
  const [userId, setUserId] = useState(
    window.localStorage.getItem('user_id')  || ''
  )

  useEffect(() => {
    window.localStorage.setItem('access_token', token)
  }, [token])

  if(token == ''){
    return ( 
      <main>
       <LoginForm 
          setToken = {setToken}
        />
      </main> 
    )
  }

  return ( 

    <div className="flex flex-col gap-20">
      <div className="flex h-screen">
      <aside className="bg-gray-800 text-white w-1/5 py-6 px-4">
        <nav className="text-center">
          <ul>
            <li className="mb-4">
              <a href="#" className="block">MFA PROJECT</a>
            </li>
            <li className="mb-4">
              <button className="bg-red-600 text-white font-bold cursor-pointer px-5 py-2"
          type='button'
          onClick={() => {
            window.localStorage.removeItem('access_token')
            window.localStorage.removeItem('user_id')
            window.location.reload()
          }}
        >
          Logout
        </button>
            </li>
          </ul>
        </nav>
      </aside>  
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-2xl font-semibold mb-4">Code OTP Access</h1>
        <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"

          onClick={()=>{window.location.href = '/viewQR'}}
        >
          
          Show QrCode
</button>
        <div className="grid grid-cols-2 gap-4">
        </div>
      </main>
    </div>
    </div>
  );
}