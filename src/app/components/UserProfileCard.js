import Link from 'next/link'
import React from 'react'

export default function UserProfileCard({ user }) {
    return (
        <div>
            {/* user info  */}
            <div className="py-4 md:py-8">
                <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <img className="h-16 w-16 rounded-lg" src={user.avatar} alt="Helene avatar" />
                            <div className='items-center flex'>
                                <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">{user.name}</h2>
                            </div>
                        </div>
                        <dl className="">
                            <dt className="font-semibold text-gray-900 dark:text-white">Email Address</dt>
                            <dd className="text-gray-500 dark:text-gray-400">{user.email ? user.email : "Not provided"}</dd>
                        </dl>
                        <dl>
                            <dt className="font-semibold text-gray-900 dark:text-white">Delivery Address</dt>
                            <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                <svg className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>
                                <div style={{ maxWidth: "100vw" }} className='flex flex-col'>
                                    <span>
                                        {user.deliveryaddress.housenumber},{user.deliveryaddress.streetname},{user.deliveryaddress.city}
                                    </span>
                                    <span>
                                        {user.deliveryaddress.state}
                                    </span>
                                    <span>
                                        PIN : {user.deliveryaddress.pin}
                                    </span>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div className="space-y-4">
                        <dl>
                            <dt className="font-semibold text-gray-900 dark:text-white">Phone Number</dt>
                            <dd className="text-gray-500 dark:text-gray-400">{user.phonenumber}</dd>
                        </dl>
                    </div>
                </div>
                {/* editdata btn  */}
                <Link href={"/profile/delivery"}>
                    <button type="button" data-modal-target="accountInformationModal2" data-modal-toggle="accountInformationModal2" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto">
                        <svg className="-ms-0.5 me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"></path>
                        </svg>
                        Edit your data
                    </button>
                </Link>
            </div>
        </div>

    )
}
