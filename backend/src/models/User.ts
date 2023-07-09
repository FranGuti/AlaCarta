import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true,
        },
        password: {
            type: mongoose.Schema.Types.String,
        },
        userCategories: {
            type: [
                {
                    restaurant: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Restaurant",
                        required: true,
                    },
                    categoryEnum: {
                        type: mongoose.Schema.Types.Number,
                        required: true,
                    },
                },
            ],
            required: true,
        },
        changeInfoCode: {
            type: mongoose.Schema.Types.String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
