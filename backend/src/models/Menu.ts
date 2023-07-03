import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        banner: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        color: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        products: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Product",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Menu", MenuSchema);
