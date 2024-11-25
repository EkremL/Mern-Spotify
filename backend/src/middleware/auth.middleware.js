import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";

dotenv.config();

export const protectRoute = async (req, res, next) => {
  if (!req.auth?.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized- you must be logged in!" });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL?.toLowerCase() ===
      currentUser.primaryEmailAddress?.emailAddress.toLowerCase();
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized, Forbidden- you must be an admin!" });
    }

    next();
  } catch (error) {
    console.error(error);
    // res
    //   .status(500)
    //   .json({ message: "An error occurred while verifying admin status." });
    next(error);
  }
};
