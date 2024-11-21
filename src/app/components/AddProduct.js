"use client"
import { useState } from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import Loading from './Loading.js';


export default function AddProduct() {
    const [file, setFile] = useState([])
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
    } = useForm()

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

    const submit = async (data) => {
        if (file.length < 2) return popTost('Atleast 2 images...')
        setLoading(true)
        const formData = new FormData();
        file.forEach((pic) => {
            formData.append("image", pic)
        })
        const arrayData = Object.entries(data);
        arrayData.forEach((entry) => {
            if (entry[0] === 'colors') {
                const colors = entry[1].split(",")
                formData.append(`${entry[0]}`, colors)
            } else {
                formData.append(`${entry[0]}`, entry[1])
            }
        })
        try {
            const res = await fetch(`${process.env.SERVER_URL}/product`, { method: "POST", credentials: "include", body: formData })
            if (res.status === 201) popTost("Done", true); setLoading(false)
        } catch {
            popTost("oppps somthing went wrong try again..")
        }

    }

    const fileSelected = event => {
        const temp = event.target.files
        setFile([...temp])
        console.log(temp)
    }

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {loading ? <Loading /> : <div className="bg-gray-100">
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 md:p-8">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Product</h1>
                        <form onSubmit={handleSubmit(submit)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* <!-- Product Title --> */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                                    <input {...register("title")} type="text" id="title" name="title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 " placeholder='Black Ripped Jenns...' required />
                                </div>

                                {/* <!-- Price --> */}
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input {...register("price")} type="number" id="price" name="price" step="0.01"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='500' required />
                                </div>

                                {/* <!-- Stock --> */}
                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input {...register("stock")} type="number" id="stock" name="stock"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='10' required />
                                </div>

                                {/* <!-- Color --> */}
                                <div>
                                    <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors</label>
                                    <input {...register("colors")} type="text" id="colors" name="colors"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='(optional)  black,white,gray' />
                                </div>
                                {/* category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <input {...register("category")} type="text" id="category" name="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='jeens' />
                                </div>
                            </div>

                            {/* <!-- Product Details --> */}
                            <div className="mt-4 mb-6 h-16">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Details</label>
                                <input {...register("description")} id="description" name="description" rows="4"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='This is top of line jeens with staight fit design' required />
                            </div>

                            {/* <!-- Upload Images --> */}
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Atleast 2 images</p>
                                    </div>
                                    <input id="dropzone-file" className="hidden" onChange={fileSelected} type="file" accept="image/*" multiple></input>
                                </label>
                            </div>

                            {/* <!-- Submit Button --> */}
                            <div className="mt-6">
                                <button type="submit"
                                    className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }

        </div>
    )
}