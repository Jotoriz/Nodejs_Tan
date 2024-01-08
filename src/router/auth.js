import express from "express";
import {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} from "../validators/auth.js";
import { signin, signinAdmin, signup } from "../controller/auth.js";
const router = express.Router();

router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post(
  "/admin/signin",
  validateSigninRequest,
  isRequestValidated,
  signinAdmin
);

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

export default router;
