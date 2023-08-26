import Link from "next/link";
import { useState } from "react";

export default function LoginForm({setToken}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function onLogin(){
        const res = await fetch('https://mfaecho-1-n7940582.deta.app/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        res.json().then(result => {
            if('user' in result){
                if('id' in result.user){
                    window.localStorage.setItem('user_id', result.user.id)
                    window.location.href= "/enterOTP"
                }
            }
        })
    }

    return (
    <div className="grid place-items-center h-screen" >
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">MFA Project</h1>

        <form className="flex flex-col gap-3">
            <input type="text" placeholder="Email" 
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
            <input type="password" placeholder="Password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2"
                type="button"
                onClick={onLogin}
            >
                Login 
                </button>



            <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span 
            className ="underline">Register</span>
                </Link>
                {/* <Link className="text-sm mt-3 text-right" href={"/Phone Number"}>
            Login With Phone Number? <span 
            className ="underline">Phone Number</span>
                </Link> */}

             </form>
            </div>
        </div>
    );
}