import { Router } from "express"
import { singUp, singIn, singOut } from "../controllers/authController.js"
import { tokenValidator } from "../middlewares/tokenMiddleware.js"
import {
	singUpValidator,
	singInValidator,
} from "../middlewares/authMiddleware.js"

const authRouter = Router()
authRouter.get("/", (req, res) => res.send("Hello World!"))
authRouter.post("/singup", singUpValidator, singUp)
authRouter.post("/singin", singInValidator, singIn)
authRouter.post("/singout", tokenValidator, singOut)

export default authRouter
