import { Express, Request, Response } from "express";
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from "./controllers/post.controller";
import { createUserSessionHandler, getUserSessionsHandler, updateUserSessionHandler } from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requiresUser from "./middleware/requiresUser";
import validateRequest from "./middleware/validateRequest";
import { createPostSchema, deletePostSchema, updatePostSchema } from "./schemas/post.schema";
import { createUserSchema, createUserSessionSchema } from "./schemas/user.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) =>
    res.status(200).send("server working fine!")
  );
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler)
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);
  app.delete("/api/sessions", requiresUser, updateUserSessionHandler);
  app.post("/api/posts", [requiresUser, validateRequest(createPostSchema)], createPostHandler)
  app.get("/api/posts/:_id", getPostHandler)
  app.put("/api/posts/:_id", [requiresUser, validateRequest(updatePostSchema)], updatePostHandler)
  app.delete("/api/posts/:_id", [requiresUser, validateRequest(deletePostSchema)], deletePostHandler)
}
