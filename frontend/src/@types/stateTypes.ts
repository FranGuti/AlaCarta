interface UserCategoryType {
    restaurant: RestaurantType;
    categoryEnum: number;
}

interface UserType {
    _id: string;
    name: string;
    email: string;
    userCategories: UserCategoryType[];
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface RestaurantType {
    _id: string;
    name: string;
    productCategories: string[];
    urlSuffix: string;
    paymentInfo: string;
    employees: string[];
    orders: string[];
    menu?: string[] | undefined;
    createdAt: Date;
    updatedAt: Date;
}

interface OrderType {
    _id: string;
    products: string[];
    table: string;
    statusEnum: number;
    price: number;
    restaurant: number;

}


export type { UserType, RestaurantType, OrderType };
