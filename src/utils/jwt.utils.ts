import config from "../config/default";
import jwt from "jsonwebtoken";

const privateKey = config.privateKey as string;

export function sign(object: Object, options: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return {
      valid: true,
      expires: false,
      decoded,
    };
  } catch (error:any) {
    return {
      valid: false,
      expires: error.message === "jwt expired",
      decoded: null,
    };
  }
}
