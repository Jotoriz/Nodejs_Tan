import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name_category: {
      type: String,
      required: true,
      trim: true,
    },
    slug_category: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
