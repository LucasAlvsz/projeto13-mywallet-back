import { Router } from "express"
import { singUp, singIn } from "../controllers/authController.js"
import {
	singUpValidator,
	singInValidator,
} from "../middlewares/authMiddleware.js"

const authRouter = Router()

authRouter.post("/singUp", singUpValidator, singUp)
authRouter.post("/singIn", singInValidator, singIn)

export default authRouter
