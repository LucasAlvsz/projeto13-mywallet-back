import { Router } from "express"

import {
	postFlowValidator,
	getFlowsValidator,
	deleteFlowValidator,
	putFlowValidator,
} from "../middlewares/flowsMiddleware.js"
import { tokenValidator } from "../middlewares/tokenMiddleware.js"
import {
	postFlows,
	getFlows,
	deleteFlow,
	putFlow,
} from "../controllers/flowsController.js"

const flowsRouter = Router()

flowsRouter.post("/flows", postFlowValidator, tokenValidator, postFlows)
flowsRouter.get("/flows", getFlowsValidator, tokenValidator, getFlows)
flowsRouter.delete(
	"/flows/:flowId",
	deleteFlowValidator,
	tokenValidator,
	deleteFlow
)
flowsRouter.put("/flows/:flowId", putFlowValidator, tokenValidator, putFlow)

export default flowsRouter
