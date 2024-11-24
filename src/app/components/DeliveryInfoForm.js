"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import avatar from "../_images/avatars/avatar.png"


export default function DeliveryInfoForm({ linkAfterDone = "/profile" }) {
    const router = useRouter()
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
    const {
        register,
        handleSubmit,
    } = useForm()

    const uploadForm = async (data) => {
        console.log(data)
        try {
            const res = await fetch(`${process.env.SERVER_URL}/user`, { method: "POST", credentials: "include", body: JSON.stringify(data) })
            return res.status
        } catch (err) {
            console.log(err)
            return false
        }
    }

    const submitForm = async (data) => {
        const user = { name: data.name, phonenumber: data.phonenumber, email: data.email, avatar: avatar.src };
        const deliveryaddress = { state: data.state, pin: data.pin, city: data.city, streetname: data.streetname, housenumber: data.housenumber, }
        const res = await uploadForm({ user: user, deliveryaddress: deliveryaddress })
        if (res === 201) router.back()
        if (res === 406) popTost("opps!Somthing went Wrong!! try again.", false)
        if (res === 401) router.push('/login')
        if (!res) popTost("opps!Somthing went Wrong!! try again.", false)
    }
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <section className=" py-8 antialiased bg-gray-900 md:py-16">
                <form onSubmit={handleSubmit(submitForm)} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-white">Delivery Details</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-white"> Your name </label>
                                        <input {...register("name")} type="text" id="your_name" className="block w-full rounded-sm   px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="Bonnie Green" required />
                                    </div>

                                    <div>
                                        <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-white"> Your email <span className='text-gray-500'>(optional)</span> </label>
                                        <input {...register("email")} type="email" id="your_email" className="block w-full rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="name@flowbite.com" />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-country-input-3" className="block text-sm font-medium text-white"> State</label>
                                        </div>
                                        <select {...register("state")} id="select-country-input-3" className="block w-full rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500">
                                            <option defaultValue={"Punjab"}>Punjab</option>
                                            <option value="AS">Haryana</option>
                                            <option value="FR">Delhi</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="your_city" className="mb-2 block text-sm font-medium text-white"> City </label>
                                        <input {...register("city")} type="text" id="your_city" className="block w-full rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="name@flowbite.com" required />
                                    </div>

                                    <div>
                                        <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-white"> Phone Number</label>
                                        <div className="flex items-center">
                                            <span id="dropdown-phone-button-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border  border-gray-600 bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-700" type="button">
                                                +91
                                            </span>
                                            <div className="relative w-full">
                                                <input {...register("phonenumber")} type="number" id="phone-input" className="z-20 block w-full rounded-e-lg border border-s-0  border-gray-600 border-s-gray-700  bg-gray-700 text-white placeholder:text-gray-400 focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-white"> PIN-Code </label>
                                        <input {...register("pin")} type="number" id="pincode" className="block w-full rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="142026" required />
                                    </div>

                                    <div>
                                        <label htmlFor="housenumber" className="mb-2 block text-sm font-medium text-white"> House No</label>
                                        <input {...register("housenumber")} type="text" id="housenumber" className="block w-full rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="House Number:2002" required />
                                    </div>

                                    <div>
                                        <label htmlFor="streetname" className="mb-2 block text-sm font-medium text-white">Street Name</label>
                                        <input {...register("streetname")} type="text" id="streetname" className="block w-full rounded-sm  px-3 border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400  focus:border-primary-500 focus:ring-primary-500" placeholder="Pashim marg...." required />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-gray-700">
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                            </svg>
                                            Add new address
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}
