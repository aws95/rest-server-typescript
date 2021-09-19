import { Response, Request } from "express";
import { get } from "lodash";
import { createPost, deletePost, findPost, updatePost } from "../services/post.service";

export const createPostHandler = async (req: Request, res: Response) => {
    const userID = get(req, "user._id")
    const body = req.body

    const post = await createPost({ ...body, user: userID })
    return res.send(post)
}

export const updatePostHandler = async (req: Request, res: Response) => {
    const postId = get(req, "params._id");
    const update = req.body;
    const post = await findPost({ postId });
    if (!post) {
        return res.sendStatus(404);
    }

    const updatedPost = await updatePost({ postId }, update);

    return res.send(updatedPost);

}

export async function getPostHandler(req: Request, res: Response) {
    const postId = get(req, "params._id");
    const post = await findPost({ postId });

    if (!post) {
        return res.sendStatus(404);
    }

    return res.send(post);
}

export async function deletePostHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const postId = get(req, "params._id");

    const post = await findPost({ postId });

    if (!post) {
        return res.sendStatus(404);
    }

    await deletePost({ postId });

    return res.sendStatus(200);
}