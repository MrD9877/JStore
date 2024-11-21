import AdminNavBottom from '@/app/_navbars/AdminNavBottom'
import AddProduct from '@/app/components/AddProduct'
import React from 'react'

export default function page() {
    return (
        <>
            <div className='mb-20'>
                <AddProduct />
            </div>
            <AdminNavBottom />
        </>
    )
}
