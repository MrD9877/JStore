export default async function FetchAddress(token) {
    console.log("hi")
    let address;
    try {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        // Make the request
        const res = await fetch('https://apiv2.shiprocket.in/v1/external/settings/company/pickup', {
            headers
        });
        console.log("res", res)
        if (res.ok) {
            const data = await res.json()
            console.log("data", data)
            address = data.data.shipping_address
        }
    } catch (err) {
        console.log(err)
        address = undefined
    }
    return address
}
