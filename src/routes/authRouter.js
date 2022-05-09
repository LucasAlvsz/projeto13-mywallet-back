import { Router } from "express"
import { signUp, signIn, signOut } from "../controllers/authController.js"
import { tokenValidator } from "../middlewares/tokenMiddleware.js"
import {
	signUpValidator,
	signInValidator,
} from "../middlewares/authMiddleware.js"

const authRouter = Router()
authRouter.post("/signUp", signUpValidator, signUp)
authRouter.post("/signIn", signInValidator, signIn)
authRouter.post("/signOut", tokenValidator, signOut)

export default authRouter
