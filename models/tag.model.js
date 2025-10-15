import mongoose from "mongoose"

const TagSchema = new mongoose.Schema(
  {
  name: {
    type: String,
    required: true,
    trim: true
  }
},
{
  timestamps: true
}
)

export default mongoose.model("Tag", TagSchema)