import { Router } from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

//alttaki routelerin controllerinin başına tekrar tekrar yazmaktanse hepsini bu şekilde kontrol ettirebiliriz yani clean code
router.use(protectRoute, requireAdmin);

//check for admin
// router.get("/check", protectRoute, requireAdmin, checkAdmin);
router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
