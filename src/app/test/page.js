import React from 'react'
import FetchAddress from '../_utility/FetchAddress'

export default async function page() {
    const address = await FetchAddress()
    console.log(address)
    return (<>{address}</>)
}
