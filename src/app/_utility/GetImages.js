export default async function GetImages(images) {
    let urls
    try {
        const res = await fetch(`${process.env.SERVER_URL}/productimages`, { method: 'POST', body: JSON.stringify({ images: images }) })
        if (res.status === 200) {
            urls = await res.json()
        }
    } catch { console.log("error") }
    return urls
}
