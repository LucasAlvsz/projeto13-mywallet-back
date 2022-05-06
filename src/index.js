import express from "express"
import cors from "cors"

import authRouter from "./routes/authRouter.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use(authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
