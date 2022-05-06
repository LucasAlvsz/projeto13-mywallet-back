import { Router } from "express"

import {
	postFlowValidator,
	getFlowsValidator,
} from "../middlewares/flowsMiddleware.js"
import { tokenValidator } from "../middlewares/tokenMiddleware"
import { postInflows, getInflows } from "../controllers/flowsController.js"

const flowsRouter = Router()

flowsRouter.post("/inflows", postFlowValidator, tokenValidator, postInflows)
flowsRouter.get("/inflows", getFlowsValidator, tokenValidator, getInflows)
