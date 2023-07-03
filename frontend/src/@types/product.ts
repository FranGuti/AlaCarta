import { Category } from "./category"
import { Record } from "./record"

export interface Product {
    id: string
    name: string
    price: number
    description: string
    img: string
    categories: Category[] 
    isAvailable: boolean
    sales: Record[] 
}