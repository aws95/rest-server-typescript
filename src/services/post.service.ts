import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import Post, { PostDocument } from "../models/post.model";


export const createPost = async (input: DocumentDefinition<PostDocument>) => {
    return await Post.create(input)
}


export const findPost = async (query: FilterQuery<PostDocument>) => {
    return await Post.findOne(query).lean()
}

export const updatePost = async (query: FilterQuery<PostDocument>, update: UpdateQuery<PostDocument>) => {
    return await Post.findOneAndUpdate(query, update, { new: true })
}

export const deletePost = async (query: FilterQuery<PostDocument>) => {
    return await Post.deleteOne(query)
}