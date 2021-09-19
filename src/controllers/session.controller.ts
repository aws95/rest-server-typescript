import { Request, Response } from "express";
import { get } from "lodash";
import { createAccessToken, createSession, findSessions, updateSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("invalid username or password!");
    }

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = await createAccessToken({ user, session });

    return res.send({ accessToken });
}

export async function updateUserSessionHandler(req: Request, res: Response) {
    const sessionID = req.get("user.session");
    await updateSession({ _id: sessionID }, { valid: false })
    return res.status(200).send(true)
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
}
