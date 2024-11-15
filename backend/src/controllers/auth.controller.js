import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    let user = await User.findOne({ clerkId: id });

    if (!user) {
      //signUp
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in Auth Callback", error);
    // res.status(500).json({ message: "Internal Server Error", error });
    next(error);
  }
};
