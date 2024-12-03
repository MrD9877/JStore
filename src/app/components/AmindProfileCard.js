"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Gif from "../_images/check.gif"
import Image from 'next/image'
import ShipRocketLogin from './ShipRocketLogin'
import PickupAddress from './PickupAddress'
import toast, { Toaster } from 'react-hot-toast';
import GetAvatar from '../customhooks/GetAvatar'



export default function AdminProfileCard({ user }) {
    const [shipRocket, setShipRocket] = useState(false)
    const [loading, setLoading] = useState(false)
    const [avatarSrc, setAvatarSrc] = useState("")

    const popTost = (msg, success) => {
        let emote = "❌";
        if (success) emote = "✅"
        toast(`${msg}`,
            {
                icon: `${emote}`,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    }
    const getToken = async (data, setLoading) => {
        let token;
        try {
            const headers = { 'Content-Type': 'application/json' }
            const res = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", { method: "POST", headers, body: JSON.stringify(data) })
            const msg = await res.json()
            res.status === 200 ? token = msg.token : popTost(`${msg.message}`)
        } catch {
            setLoading(false)
            return popTost("somthing is not working try reloading or check for connection")
        }
        try {
            const shiprocket = {
                email: data.email,
                password: data.password,
                token: token
            }
            console.log(shiprocket)
            const res = await fetch(`${process.env.SERVER_URL}/user`, { method: "POST", body: JSON.stringify({ shiprocket: shiprocket }), credentials: "include" })
            if (res.status === 201) {
                setShipRocket(true)
                setLoading(false)
            }
        } catch {
            setLoading(false)
            return popTost("somthing is not working try reloading or Login...")
        }
    }

    const reloadToken = () => {
        setLoading(true)
        const data = {
            email: user.shiprocket.email,
            password: user.shiprocket.password
        }
        getToken(data, setLoading)
    }

    useEffect(() => {
        if (user.shiprocket.email) {
            setShipRocket(true)
        }
    }, [])

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {user && <GetAvatar user={user} setAvatarSrc={setAvatarSrc} />}
            <div class="h-full bg-gray-200 rounded-lg py-4 px-2 sm:p-8">
                <div class="bg-white rounded-lg shadow-xl pb-8">
                    <div x-data="{ openSettings: false }" class="absolute right-12 mt-4 rounded">
                    </div>
                    <div class="w-full h-[250px]">
                        <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div class="flex flex-col items-center -mt-20">
                        <img
                            // src = {user.avatar}
                            src={avatarSrc}
                            class="w-40 border-4 border-white rounded-full" />
                        <div class="flex items-center space-x-2 mt-2">
                            <p class="text-2xl">{user.name}</p>
                            <span class="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                        <div class="flex items-center space-x-4 mt-2">
                            {user.admin && <Link href={"/"}>
                                <button class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2.5 rounded text-sm space-x-2 transition duration-100">
                                    <svg className="-ms-0.5 me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path d="M22 2.00001L11.75 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21.9998 6.49999L21.9998 1.99999L17.0568 1.99999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>WebPage</span>
                                </button>
                            </Link>}
                            <button class="flex items-center bg-red-600 hover:bg-red-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                <svg className="-ms-0.5 me-1.5 h-6 w-6" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z" fill="#FFFFFF" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div class="w-full flex flex-col 2xl:w-1/3">
                        <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
                            <ul class="mt-2 text-gray-700">
                                <li class="flex border-y py-2">
                                    <span class="font-bold w-24">Full name:</span>
                                    <span class="text-gray-700">{user.name}</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Role:</span>
                                    <span class="text-gray-700">Admin</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Email:</span>
                                    <span class="text-gray-700 ml-2 overflow-scroll">{user.email ? user.email : "Not provided"}</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Country:</span>
                                    <span class="text-gray-700"> INDIA</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Languages:</span>
                                    <span class="text-gray-700">English</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {shipRocket ? <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div class="w-full flex flex-col 2xl:w-1/3">
                        <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 class="text-xl text-gray-900 font-bold">ShipRocket Info</h4>
                            <ul class="mt-2 text-gray-700">
                                <li class="flex border-y py-2">
                                    <span class="font-bold w-24">Email:</span>
                                    <span class="text-gray-700 ml-3 overflow-scroll">{user.shiprocket.email}</span>
                                </li>
                                <li class="flex border-y py-2">
                                    <span class="font-bold w-24">Token:</span>
                                    <div class="flex text-gray-700">

                                        {loading ? (
                                            <svg aria-hidden="true" className="w-4 h-4 mt-1 ml-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                        ) : (<spa className="flex">
                                            <Image className='ml-2' width={20} height={20} src={Gif.src} />
                                            <button onClick={reloadToken} className='ml-4'>
                                                <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="#555" d="M19.295346,12 C19.683732,11.997321 20,12.315434 20,12.7087815 L20,15.9132194 C20,16.3046684 19.6866632,16.6220005 19.3001428,16.6220005 C18.9136223,16.6220005 18.6002855,16.3046684 18.6002855,15.9132194 L18.6006646,14.7880072 C16.7783174,17.8441657 13.3981233,20 9.75558622,20 C5.34669464,20 1.65005079,17.2790232 0.0473577091,13.0847914 C-0.0921406706,12.7197255 0.0869918429,12.3092534 0.447461376,12.1679763 C0.80793091,12.0266992 1.21323498,12.2081158 1.35273336,12.5731817 C2.75210409,16.2353209 5.94083219,18.5824378 9.75558622,18.5824378 C13.1270432,18.5824378 16.2763668,16.4010153 17.7430824,13.4292559 L16.2715084,13.4386023 C15.884997,13.4412853 15.56952,13.1261356 15.566854,12.7346958 C15.5642216,12.343256 15.8754035,12.0237564 16.2619149,12.0210734 L19.295346,12 Z M10.2444138,0 C14.6533054,0 18.3499492,2.72097676 19.9526423,6.9152086 C20.0921407,7.28027447 19.9130082,7.69074656 19.5525386,7.83202368 C19.1920691,7.9733008 18.786765,7.79188418 18.6472666,7.4268183 C17.2478959,3.76467906 14.0591678,1.4175622 10.2444138,1.4175622 C6.87295684,1.4175622 3.72363319,3.59898468 2.25691759,6.57074409 L3.72849164,6.56139765 C4.11500304,6.5587147 4.43048002,6.87386439 4.43314598,7.26530419 C4.43577836,7.65674399 4.12459654,7.97624361 3.73808514,7.97892656 L0.704653993,8 C0.316268039,8.00267895 4.36983782e-13,7.68456603 4.36983782e-13,7.29121854 L4.36983782e-13,4.0867806 C4.36983782e-13,3.69533161 0.31333676,3.3779995 0.699857241,3.3779995 C1.08637772,3.3779995 1.39971448,3.69533161 1.39971448,4.0867806 L1.39933538,5.21199282 C3.22168264,2.1558343 6.60187665,0 10.2444138,0 Z" />
                                                </svg>
                                            </button>
                                        </spa>
                                        )}
                                    </div>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Role:</span>
                                    <span class="text-gray-700">Admin</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Country:</span>
                                    <span class="text-gray-700"> INDIA</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Languages:</span>
                                    <span class="text-gray-700">English</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> : <ShipRocketLogin getToken={getToken} />}
                {shipRocket && <PickupAddress user={user} />}
            </div>
        </div>

    )
}
