import mongoose, { Model } from "mongoose";
import { IAuth } from "./auth.types";
import bcrypt from "bcrypt";
import { schema } from "./auth.validation";

export class authService {
  constructor(private model: Model<IAuth>) {}
  signUp = async (data: IAuth) => {
    //check if user exists
    const { error } = schema.validate(data);
    if (error) {
      throw new Error(error?.message);
    }
    const userExist = await this.model.findOne({ email: data?.email });
    if (userExist) {
      throw new Error("Incorrect credentials");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(data?.password, salt);

    //create user
    const newUser = await this.model.create({
      name: data?.name,
      email: data?.email,
      password: hashpassword,
    });
    return newUser;
  };
  signIn = async (data: IAuth) => {
    // validate input
    const { error } = schema.validate(data);
    if (error) {
      throw new Error(error?.message);
    }
    //check if user exists
    const userExist = await this.model.findOne({ email: data?.email });
    if (!userExist) {
      throw new Error("Incorrect credential");
    }
    //compare input from db password
    const compare = bcrypt.compare(data?.password, userExist?.password);
    if (!compare) {
      throw new Error("Incorrect credentilas");
    }
    return;
  };
  verify = async (data: IAuth) => {
    const user = await this.model.findOneAndUpdate({ email: data?.email });
    return user;
  };
}
