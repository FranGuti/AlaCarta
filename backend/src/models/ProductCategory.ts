import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
});

export default mongoose.model("ProductCategory", ProductCategorySchema);
