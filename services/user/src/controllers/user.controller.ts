import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/isAuth.js";
import User from "../model/user.model.js";
import TryCatch from "../utils/tryCatch.js";

export const loginUser = TryCatch(async (req, res) => {
  const { email, name, image } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      image,
    });
  }
  const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
    expiresIn: "5d",
  });
  res.status(200).json({
    message: "Login Success",
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
  const user = req.user;

  res.json(user);
});

export const getUserProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  res.json(user);
});

export const updateUser = TryCatch(async (req: AuthenticatedRequest, res) => {
  const { name, instagram, facebook, linkedin, bio } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      name,
      instagram,
      facebook,
      linkedin,
      bio,
    },
    { new: true }
  );

  const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
    expiresIn: "5d",
  });

  res.json({
    message: "User Updated",
    token,
    user,
  });
});
