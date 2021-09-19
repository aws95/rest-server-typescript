import { model, Schema, Document } from "mongoose";
import User, { UserDocument } from "./user.model";

export interface PostDocument extends Document {
    title: string;
    body: string;
    user: UserDocument["_id"];
    creaedAt: Date;
    updatedAt: Date
}

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    body: { type: String, required: true }
}, { timestamps: true })

const Post = model<PostDocument>("Post", PostSchema)

export default Post