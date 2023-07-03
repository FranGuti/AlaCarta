import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        products: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Product",
            required: true,
        },
        status: {
            type: mongoose.Schema.Types.Boolean,
            required: true,
        },
        price: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
