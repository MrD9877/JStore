import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { createRocketOrder } from './CreateRocketOrder';
import Loading from './Loading';

export default function PackageForm({ order, customer, handleRocket }) {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
    } = useForm()
    const onSubmit = async (data) => {
        setLoading(true)
        const packageDetails = { ...data }
        await createRocketOrder({ order, customer, packageDetails, handleRocket })
        setLoading(false)
    }
    return (

        <div className='w-screen h-screen absolute flex flex-col justify-center align-middle'>
            {loading ? <Loading width='100%' height='100%' /> : <div className='mx-auto rounded-lg'>
                <div className="max-w-xl mx-auto p-6 bg-slate-300 shadow-md rounded-md">
                    <div className=' w-full flex justify-between mb-4 '>
                        <h2 className="text-2xl font-bold ">Shipping Details</h2>
                        <button className='p-2' onClick={() => handleRocket("close")}>
                            <svg width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Pickup Location */}
                        <div>
                            <label htmlFor="pickupLocation" className="block font-medium mb-2">
                                Pickup Location
                            </label>
                            <input
                                {...register("pickupLocation")}
                                type="text"
                                id="pickupLocation"
                                name="pickupLocation"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter pickup location"
                            />
                        </div>

                        {/* Dimensions */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="length" className="block font-medium mb-2">
                                    Length (cm)
                                </label>
                                <input
                                    {...register("length")}
                                    type="number"
                                    id="length"
                                    name="length"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Length"
                                />
                            </div>
                            <div>
                                <label htmlFor="breadth" className="block font-medium mb-2">
                                    Breadth (cm)
                                </label>
                                <input
                                    {...register("breadth")}
                                    type="number"
                                    id="breadth"
                                    name="breadth"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Breadth"
                                />
                            </div>
                            <div>
                                <label htmlFor="height" className="block font-medium mb-2">
                                    Height (cm)
                                </label>
                                <input
                                    {...register("height")}
                                    type="number"
                                    id="height"
                                    name="height"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Height"
                                />
                            </div>
                        </div>

                        {/* Weight */}
                        <div>
                            <label htmlFor="weight" className="block font-medium mb-2">
                                Weight (kg)
                            </label>
                            <input
                                {...register("weight")}
                                type="number"
                                id="weight"
                                name="weight"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter weight"
                            />
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label htmlFor="method" className="block font-medium mb-2">
                                Payment Method
                            </label>
                            <select
                                {...register("method")}
                                id="method"
                                name="method"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="COD">COD</option>
                                <option value="Prepaid">Prepaid</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}
