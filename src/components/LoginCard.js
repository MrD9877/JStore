"use client"
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Form from './Form';

export default function LoginPage({ welcome = true }) {
    const [style, setStyle] = useState();
    const navigate = useRouter()
    const redInputStyle = {
        background: 'rgba(225, 0, 0, 0.2)',
        border: '2px solid red',
        // color: 'red',
    }

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

    const navigateTOlogin = (url, delay) => {
        setTimeout(() => {
            navigate.push(url)
        }, delay)
    }
    const onSubmit = async (data) => {
        try {
            const checkUser = await fetch(`http://localhost:3000/login`, {
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            console.log(checkUser)
            if (checkUser.status === 401) {
                popTost("Envalid Username or password", false)
                setStyle(redInputStyle)
                return
            }
            console.log(checkUser)
            if (checkUser.status === 200) {
                popTost('You are now loged in', true)
                navigateTOlogin("/", 1000)
            }
        } catch (err) {
            console.log(err)
            popTost('Sorry server is down', false)
        }
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div style={{ background: "rgba(0, 10,20,0.9)" }} className="m-auto mb-52 p-6 w-5/6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link style={welcome ? { display: "" } : { display: "none" }} href="/">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Welcome to J-shop</h5>
                </Link>
                <p className="font-normal mb-5 text-white dark:text-gray-400">To start shoping please Login:</p>
                <div className='w-full'>
                    <Form onSubmit={onSubmit} style={style} />
                </div>
            </div>
        </>
    )
}