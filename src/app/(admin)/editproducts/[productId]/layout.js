export default async function layout({ children, params }) {
    const id = await params
    const { productId } = id
    return (
        <div>
            {children}
        </div>
    )
}
