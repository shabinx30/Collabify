import mongoose from "@/lib/mongodb";
const { Schema, models } = mongoose;

const UserSchema = new Schema(
    {
        username: String,
        email: { type: String, required: true, unique: true },
        password: String,
        role: { type: String, required: true, enum: ["brand", "creator"] },
        categories: [String],
        profile: String,
        amount: Number,
        socialLinks: [String],
        location: String,
        companyName: String,
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);
export default User;
