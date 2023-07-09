import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        products: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Product",
            required: true,
        },
        table: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        statusEnum: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },
        price: {
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

export default mongoose.model("Order", OrderSchema);
