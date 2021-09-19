import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("name is required!"),
    password: string().required("password is require!"),
    passwordConfirmation: string().oneOf(
      [ref("pasword"), null],
      "password must match!"
    ),
    email: string()
      .email("must be valid email!")
      .required("email must exist!"),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string().required("must provide password!"),
    email: string()
      .email("must be valid email")
      .required("must provide email"),
  }),
});
