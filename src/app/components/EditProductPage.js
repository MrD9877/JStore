"use client"
import ACTIONS from '@/lib/action';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Loading from './Loading';
import EditProductsBtn from '../_utility/EditProductsBtn';

export default function EditProductPage({ productId }) {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState()
    const [color, setColor] = useState()
    const [size, setSize] = useState()
    const [inputs, setInputs] = useState()
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

    const deleteProduct = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/`, {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({ productId: productId })
            })
            if (res.ok) popTost("done")
        } catch {
            popTost("Opps Somthing went wrong try again!!")
        }
    }

    const fetchProduct = async (productId) => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/product?productId=${productId}`)
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setProduct(data)
                setInputs({ title: data.title, description: data.description, price: data.price, category: data.category })
            }
        } catch {
            popTost("Opps Somthing went wrong try reloading the page!!")
        }
    }

    const patchProduct = async (data, action, e) => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/product`, {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify(data)
            })
            if (res.status !== 201) popTost(`Error ${res.status}`)
            if (res.status === 201) fetchProduct(product.productId)
        } catch {
            if (action === ACTIONS.SUBTRACT) e.target.innerHTML = "×"
            popTost("Somthing went wrong try again")
        }
    }

    const handleEdit = async (area, content, action, e) => {
        setLoading(true)
        const data = { patch: area, productId: product.productId }
        const arr = product[area] ? product[area] : []
        if (action === ACTIONS.SUBTRACT) {
            const index = arr.findIndex((value) => value === content)
            e.target.innerHTML = ""
            const editedArr = [...arr.slice(0, index), ...arr.slice(index + 1)]
            data.content = editedArr
            console.log(editedArr)
        } else if (action === ACTIONS.ADD) {
            const addArray = content.split(",")
            data.content = [...arr, ...addArray]
        } else if (action === ACTIONS.PUT) {
            data.content = content
        }
        await patchProduct(data, action, e)
        setLoading(false)
    }


    useEffect(() => {
        if (!productId) return
        fetchProduct(productId)
    }, [productId])
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {loading && <div className='absolute w-screen mt-20 pointer-events-none'>
                <div className='mx-auto'>
                    <Loading width='100vw' height='0px' />
                </div>
            </div>
            }
            <div className=" flex mt-10 mb-28  justify-center p-4">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Edit Product</h1>
                    <div >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* <!-- Product Title --> */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                                <div className='flex justify-between'>
                                    <input type="text" id="title" name="title"
                                        value={inputs && inputs.title} onChange={(e) => setInputs({ ...inputs, title: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 " placeholder='Black Ripped Jenns...' />
                                    <button onClick={() => handleEdit("title", inputs.title, ACTIONS.PUT)}
                                        className="w-2/5 ml-3 bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none  ">
                                        Change
                                    </button>
                                </div>
                            </div>

                            {/* <!-- Price --> */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                <div className='flex justify-between'>
                                    <input type="number" id="price" name="price" step="0.01"
                                        value={inputs && inputs.price} onChange={(e) => setInputs({ ...inputs, price: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='500' />
                                    <button onClick={() => handleEdit("price", inputs.price, ACTIONS.PUT)}
                                        className="w-2/5 ml-3 bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none  ">
                                        Change
                                    </button>
                                </div>
                            </div>

                            {/* <!-- Stock --> */}
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                                <div className="bg-gray-50 mt-2 border-gray-300 text-gray-900 text-sm justify-start focus:ring-blue-500 focus:border-blue-500 w-full" placeholder='10'>
                                    {product && <EditProductsBtn product={product} />}
                                </div>
                            </div>
                            {/* category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <div className='flex justify-between'>
                                    <input type="text" id="category" name="category"
                                        value={inputs && inputs.category} onChange={(e) => setInputs({ ...inputs, category: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='jeens' />
                                    <button onClick={() => handleEdit("category", inputs.category, ACTIONS.PUT)}
                                        className="w-2/5 ml-3 bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none  ">
                                        Change
                                    </button>
                                </div>
                            </div>
                            {/* <!-- Color --> */}
                            <div>
                                <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors</label>
                                <div className='flex justify-between'>
                                    <input onChange={(e) => setColor(e.target.value)} type="text" id="colors" name="colors"
                                        value={color} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='black,white,gray' />
                                    <button onClick={() => handleEdit("colors", color, ACTIONS.ADD)}
                                        className="w-2/5 ml-3 bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none  ">
                                        Add
                                    </button>
                                </div>
                                <div className='flex mt-1 overflow-x-auto'>
                                    {product && product.colors.length > 0 ? product.colors.map((color) => {
                                        return <span key={color} className='py-0.5 px-2 w-20 justify-between rounded-md bg-gray-400 text-white flex mr-1'>
                                            <span style={{ color: color }}>{color}</span> <button onClick={(e) => handleEdit("colors", color, ACTIONS.SUBTRACT, e)} className='ml-1 text-black'>×</button>
                                        </span>
                                    }) : "..."}
                                </div>
                            </div>
                            {/* size  */}
                            <div>
                                <label htmlFor="size" className="block text-sm font-medium text-gray-700">Sizes</label>
                                <div className='flex justify-between'>
                                    <input onChange={(e) => setSize(e.target.value)} type="text" id="size" name="size"
                                        value={size} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='m,l,xl...' />
                                    <button onClick={() => handleEdit("size", size, ACTIONS.ADD)}
                                        className="w-2/5 ml-3 bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none  ">
                                        Add
                                    </button>
                                </div>
                                <div className='flex mt-1'>
                                    {product && product.size.length > 0 ? product.size.map((size) => {
                                        return <span key={size} className='py-0.5 px-2 w-10 rounded-md bg-gray-400 text-white flex mr-1'>
                                            {size} <button onClick={(e) => handleEdit("size", size, ACTIONS.SUBTRACT, e)} className='ml-1 text-black'>×</button>
                                        </span>
                                    }) : "..."}
                                </div>
                            </div>

                        </div>

                        {/* <!-- Product Details --> */}
                        <div className="mt-2 mb-6 h-24">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Details</label>
                            <div>
                                <input id="description" name="description" rows="4"
                                    value={inputs && inputs.description} onChange={(e) => setInputs({ ...inputs, description: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder='This is top of line jeens with staight fit design' />
                                <button onClick={() => handleEdit("description", inputs.description, ACTIONS.PUT)}
                                    className="w-40 my-3 block bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none  ">
                                    Change
                                </button>
                            </div>
                        </div>
                        {/* <!-- delete Button --> */}
                    </div>
                    <div className="h-16  w-full mt-12">
                        <div className='flex justify-center'>
                            <button onClick={() => handleEdit("description", inputs.description, ACTIONS.PUT)}
                                className="w-40 bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none  ">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
