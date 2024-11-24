"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "./Loading";

export default function ShipRocketLogin({ getToken }) {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
    } = useForm()


    const onSubmit = async (data) => {
        setLoading(true)
        getToken(data, setLoading)
    }

    return (
        <>

            <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                <div class="w-full flex flex-col 2xl:w-1/3">
                    <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 class="text-xl text-gray-900 font-bold">ShipRocket Login</h4>
                        {loading ? <Loading /> : <form class="mt-2 text-gray-700" onSubmit={handleSubmit(onSubmit)}>
                            <li class="flex border-y py-2">
                                <label htmlFor='eamil' class="font-bold w-24">Email:</label>
                                <input {...register("email")} type='text' name='email' class="text-gray-700 border px-2 rounded-md" required />
                            </li>
                            <li class="flex py-2">
                                <label htmlFor='password' class="font-bold w-24">password:</label>
                                <input {...register("password")} type='text' name='password' class="text-gray-700 border px-2 rounded-md" required />
                            </li>
                            <button class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-1.5 rounded text-sm space-x-2 transition duration-100">
                                <span>Login</span>
                            </button>
                        </form>}
                    </div>
                </div>
            </div>
        </>
    )
}
