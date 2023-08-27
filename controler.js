import { generateToken, verifyToken } from "./JWT.js";
import userModel from "./schema.js";

export const signIn = async (req, res) => {
  console.log(req.body);
  const { Email, Name } = req.body;
  try {
    const existUser = await userModel.findOne({ Email, Name });
    console.log(existUser);
    if (existUser) {
      const Token = generateToken(existUser._id);
      res.status(200).json(Token);
    } else {
      res.status(404).json({ message: "user data not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (req, res) => {
  console.log(req.body);
  const { Email, Name } = req.body;
  const existEmail = await userModel.findOne({ Email });
  console.log(existEmail);

  if (existEmail) res.status(404).json({ message: "Email is already in use" });

  const userData = new userModel({
    Name,
    Email,
  });
  userData
    .save()
    .then((result) => {
      console.log(`success ${result}`);
      res.status(200).json({ success: result });
    })
    .catch((err) => console.log(err));
};

export const userVarify = async (req, res) => {
  const { authorization } = req.headers;

  const Token = authorization.split(" ")[1];

  console.log(authorization, "++++", Token);
  if (!authorization || !Token)
    return res.status(401).json({ Message: "Authorization token required" });

  const Decoded = verifyToken(Token);
  console.log(Decoded);
  const existUser = await userModel.findOne({ _id: Decoded.id });
  if (existUser) res.status(200).json({ message: "user varified" });
  else res.status(401).json({ message: "user Authorization failed" });
};
  