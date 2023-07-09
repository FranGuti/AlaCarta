import { Types } from "mongoose";
import Restaurant from "../models/Restaurant";
import Product from "../models/Product";
import { RestaurantType } from "../@types/modelTypes";
import Menu from "../models/Menu";
import ProductCategory from "../models/ProductCategory";

const addProductService = async (props: {
    name: string;
    picture: string;
    description: string;
    productCategories: string[];
    price: number;
    restaurant: RestaurantType;
}) => {
    const { name, picture, description, productCategories, price, restaurant } =
        props;
    const menu = await Menu.findById(restaurant.menu);
    if (!menu) return null;
    productCategories?.forEach(async (category) => {
        const categoryExists = await ProductCategory.findOne({
            name: category,
        });
        if (!categoryExists) {
            const newCategory = new ProductCategory({ name: category });
            await newCategory.save();
            restaurant.productCategories.push(newCategory.name);
            await restaurant.save();
        }
    });
    const newProduct = new Product({
        name,
        picture,
        description,
        productCategories: productCategories || [],
        price,
        isAvailable: true,
        sells: 0,
        restaurant: restaurant._id,
    });
    await newProduct.save();
    menu.products.push(newProduct._id);
    await menu.save();
    return newProduct;
};

const updateProductService = async (props: {
    name: string;
    picture: string;
    description: string;
    productCategories: string[];
    price: number;
    isAvailable: boolean;
    restaurant: RestaurantType;
    productId: string;
}) => {
    const {
        name,
        picture,
        description,
        productCategories,
        price,
        isAvailable,
        restaurant,
        productId,
    } = props;
    const menu = await Menu.findById(restaurant.menu);
    if (!menu) return null;
    productCategories?.forEach(async (category) => {
        const categoryExists = await ProductCategory.findOne({
            name: category,
        });
        if (!categoryExists) {
            const newCategory = new ProductCategory({ name: category });
            await newCategory.save();
            restaurant.productCategories.push(newCategory.name);
            await restaurant.save();
        }
    });
    const objectId = new Types.ObjectId(productId);
    const product = await Product.findById(objectId);
    if (!product) return null;
    if (name) product.name = name;
    if (picture) product.picture = picture;
    if (description) product.description = description;
    if (productCategories) product.productCategories = productCategories;
    if (price) product.price = price;
    if (isAvailable !== undefined) product.isAvailable = isAvailable;
    await product.save();
    return product;
};

const getFilteredProducts = async (
    category: string,
    firstKPopular: number,
    restaurant: RestaurantType
) => {
    if (category && firstKPopular) {
        const products = await Product.find({
            restaurant: restaurant._id,
            productCategories: category,
        })
            .sort({ sells: -1 })
            .limit(firstKPopular);
        return products;
    } else if (category) {
        const products = await Product.find({
            restaurant: restaurant._id,
            productCategories: category,
        });
        return products;
    } else if (firstKPopular) {
        const products = await Product.find({
            restaurant: restaurant._id,
        })
            .sort({ sells: -1 })
            .limit(firstKPopular);
        return products;
    } else {
        const products = await Product.find({
            restaurant: restaurant._id,
        });
        return products;
    }
};

const getProductById = async (productId: string) => {
    const objectId = new Types.ObjectId(productId);
    const product = await Product.findById(objectId);
    return product;
};

const deleteProductById = async (productId: string) => {
    const objectId = new Types.ObjectId(productId);
    const result = await Product.deleteOne({ _id: objectId });
    return result;
};

export {
    addProductService,
    updateProductService,
    getFilteredProducts,
    getProductById,
    deleteProductById,
};
