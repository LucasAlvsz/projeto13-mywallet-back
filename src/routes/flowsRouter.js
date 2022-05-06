import { Router } from "express"

import {
	postFlowValidator,
	getFlowsValidator,
} from "../middlewares/flowsMiddleware.js"
import { tokenValidator } from "../middlewares/tokenMiddleware.js"
import { postFlows, getFlows } from "../controllers/flowsController.js"

const flowsRouter = Router()

flowsRouter.post("/flows", postFlowValidator, tokenValidator, postFlows)
flowsRouter.get("/flows", getFlowsValidator, tokenValidator, getFlows)

export default flowsRouter
