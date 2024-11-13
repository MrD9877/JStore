export default function FetchGet({ url }) {
    const data = async () => {
        try {
            const res = await fetch(url)
            const jres = await res.json()
            console.log(jres)
            return jres
        } catch (err) {
            console.log(`${err.message}`)
            return "error"
        }
    }
    return data
}
