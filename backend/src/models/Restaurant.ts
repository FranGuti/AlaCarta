import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        urlSuffix: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true,
        },
        paymentInfo: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        employees: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required: true,
        },
        menu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
        },
        productCategories: {
            type: [mongoose.Schema.Types.String],
            required: true,
        },
        orders: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Order",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Restaurant", RestaurantSchema);
