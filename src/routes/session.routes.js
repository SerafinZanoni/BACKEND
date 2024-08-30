import { Router } from "express";
import passport from "passport";
import {passportCall} from "../middlewares/passport.middleware.js";
import sessionControllers from "../controllers/session.controllers.js";


const router = Router();

router.post("/register", passportCall("register"), sessionControllers.register);

router.post("/login", passportCall("login"), sessionControllers.login);

router.post("/auth", sessionControllers.auth);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  sessionControllers.googleauth
);

router.get("/current", passportCall("current"), async (req, res) => {
  res.status(200).json({ status: "ok", user: req.user });
});

export default router;