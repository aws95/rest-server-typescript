import { object, string, ref } from "yup";

const payload = {
    body: object({
        title: string().required("title required!"),
        body: string().required("body required!")
    })
}

const params = {
    params: object({
        _id: string().required("post id required!")
    })
}

export const createPostSchema = object({
    ...payload,
})

export const updatePostSchema = object({
    ...params,
    ...payload
})

export const deletePostSchema = object({
    ...params
})