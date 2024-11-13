import { results } from "../../product"


export default function FetchProduct(products) {
    const productsDetailArray = () => {
        const temp = []
        for (let i = 0; i < results.length; i++) {
            for (let j = 0; j < products.length; j++) {
                console.log(products[j].productId)
                if (products[j].productId === results[i].id) {
                    temp.push({
                        count: products[j].count,
                        product: results[i]
                    })
                }
            }
        }
        return temp
    }

    return productsDetailArray()
}
