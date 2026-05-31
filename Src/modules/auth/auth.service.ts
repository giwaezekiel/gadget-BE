import mongoose, { Model } from "mongoose";
import { IAuth } from "./auth.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authSchema } from "./auth.validation";
import { config } from "../../../shared/config/config";

export class authService {
  constructor(private model: Model<IAuth>) {}
  signUp = async (data: IAuth) => {
    //validate user inputs
    const { error } = authSchema.validate(data);
    if (error) {
      throw new Error(error?.message);
    }
    // check if user exists
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
    const { error } = authSchema.validate(data);
    if (error) {
      throw new Error(error?.message);
    }
    //check if user exists
    const userExist = await this.model.findOne({ email: data?.email });
    if (!userExist) {
      throw new Error("Incorrect credentials");
    }
    //check if user is verified
    const verify = userExist?.isVerified;
    if (verify === true) {
      //compare input from db password
      const compare = bcrypt.compare(data?.password, userExist?.password);
      if (!compare) {
        throw new Error("Incorrect credentials");
      }
    } else {
      throw new Error("User is not  verified");
    }
    return;
  };
  verify = async (data: IAuth, verify: boolean) => {
    const { isVerified } = data;
    const user = await this.model.findOneAndUpdate(
      { email: data?.email },
      { isVerified: verify },
    );
    return user;
  };
  payload = async (data: IAuth) => {
    const exists = await this.model.findOne({ email: data?.email });
    // token generation
    const payload = {
      email: exists?.email,
      name: exists?.name,
    };
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
  };
}
