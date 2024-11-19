"use client"
import Loading from './Loading.js'
import Link from 'next/link.js'

export default function CategoriesCard({ array, reviewStars = 4 }) {

    return (
        <>
            <div className='flex flex-wrap justify-center mb-20 p-3'>
                {array ? array.map((item) => {
                    if (item.image.slice(0, 19) == `https://i.imgur.com` || item.image.slice(0, 27) == "https://images.unsplash.com") {
                        return <div key={item.category} className="w-full mb-2 itemcard m-auto  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <Link href={`/categories/${item.category}`}>
                                <img className="p-2 rounded-t-lg" src={item.image} alt="product image" />
                            </Link>
                            <div className="px-2 pb-2">
                                <div className='w-full'>
                                    <Link href={`/categories/${item.category}`}>
                                        <h5 className="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">{item.category}</h5>
                                    </Link>
                                </div>
                                {/* rateing */}
                            </div>
                        </div >
                    }
                }) : <Loading />}
            </div>
        </>
    )
}
