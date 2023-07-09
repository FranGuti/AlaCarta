export interface Product {
    _id: string
    name: string
    picture: string
    price: number
    description: string
    productCategories: string[] 
    isAvailable: boolean
    sells: number 
    createdAt: Date
    updatedAt: Date
}

