"use client"
import React, { useEffect, useState } from "react";
var qrcode = require("qrcode")
export default function QRImg({userId}){
    
    const [data, setData] = useState('')

    async function generateQR(){
      const response = await fetch('https://mfaecho-1-n7940582.deta.app/api/auth/otp/generate',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId
        })
      })
      .then(res => res.json())
      .then(r => {
        if('otpauth_url' in r){
          qrcode.toDataURL(r.otpauth_url, function(err, qrdata){
            setData(qrdata)
          })
        }
      })
    }

    useEffect(() => {
      generateQR()
    }, [])

    return(
     <div>
        <img src = {data}></img>
     </div>   
    )
}