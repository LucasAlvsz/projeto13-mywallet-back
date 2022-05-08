import express from "express"
import cors from "cors"

import authRouter from "./routes/authRouter.js"
import flowsRouter from "./routes/flowsRouter.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use(authRouter)
app.use(flowsRouter)
// const PORT = process.env.PORT || 5000
app.listen(process.env.PORT, () => {
	console.log(`Server started on port ${process.env.PORT}`)
})
