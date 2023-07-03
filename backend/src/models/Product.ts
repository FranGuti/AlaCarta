import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        picture: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        description: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        productCategories: {
            type: [mongoose.Schema.Types.String],
        },
        price: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },
        isAvailable: {
            type: mongoose.Schema.Types.Boolean,
            required: true,
        },
        sells: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
