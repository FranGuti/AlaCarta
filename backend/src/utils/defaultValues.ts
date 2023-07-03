import ProductCategory from "../models/ProductCategory";

const defaultProductCategories = [
    "Appetizers",
    "Beverages",
    "Desserts",
    "Entrees",
    "Sides",
];

const getDefaultProductCategories = async () => {
    const productCategories = [];
    for (const category of defaultProductCategories) {
        const existingCategory = await ProductCategory.findOne({
            name: category,
        });
        if (existingCategory) {
            productCategories.push(existingCategory.name);
        } else {
            const newCategory = new ProductCategory({ name: category });
            await newCategory.save();
            productCategories.push(newCategory.name);
        }
    }
    return productCategories;
};

export { getDefaultProductCategories };
