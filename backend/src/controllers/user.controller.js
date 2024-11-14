import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } }); // not equal to current user yani kendimiz dışındaki herkesi çekiyoruz aktivitelerde gözükmemesi için
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getting all users", error);
    next(error);
  }
};
