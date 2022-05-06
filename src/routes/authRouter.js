import { Router } from "express"
import { singUp, singIn } from "../controllers/authController.js"
import { validSingUp, validSingIn } from "../middlewares/authMiddleware.js"

const authRouter = Router()

authRouter.post("/singUp", validSingUp, singUp)
authRouter.post("/singIn", validSingIn, singIn)

export default authRouter
