import { FilterQuery, UpdateQuery } from "mongoose";
import config from "../config/default";
import Session, { SessionDocument } from "../models/session.model";
import { sign } from "../utils/jwt.utils";

export async function createSession(userID: string, userAgent: string) {
  const session = await Session.create({ user: userID, userAgent });
  return session.toJSON();
}

export async function createAccessToken({ user, session }: any) {
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.accessTokenTtl }
  );
  return accessToken;
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.findOne(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}
