"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { colors } from '../../../colors'

export default function DisplayItemsCard({ array }) {
    const router = useRouter()
    const handleClickOnItem = (e, id) => {
        // todo if admin push to admin/id 
        router.push(`/products/${id}`, { scroll: false })
        e.currentTarget.style.border = `solid 2px ${colors.blue}`
        e.currentTarget.style.background = `${colors.gray}`
    }
    return (
        <div>
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {array.map((items, index) => {
                            return <li onClick={(e) => handleClickOnItem(e, items.productId)} key={index} className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={items.images[0]} alt="Neil image" />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {items.title.slice(0, 25)}...
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {items.description.slice(0, 35)}...
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ₹ {items.price}
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>

        </div>
    )
}
