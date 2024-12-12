import { Router } from "express";
import { googleLogin, jwtLogin } from "../controllers/authController.js";
const router = Router();

router.get("/", function (req, res, next) {
  return res.json("Get all route");
});

router.post("/google-login", googleLogin);
router.post("/signin", jwtLogin);

export default router;
