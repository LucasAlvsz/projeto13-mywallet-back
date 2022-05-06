import db from "../db/db.js"
import { getDate } from "../usables/getDaysjs.js"

export const PostInflows = async (req, res) => {
	const { value, description } = req.body
	const { userId } = res.locals
	try {
		await db
			.collection("inflows")
			.insertOne({ userId, value, description, date: getDate() })
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
}

export const getInflows = async (req, res) => {
	const { userId } = res.locals
	const { limit } = req.params
	const options = { limit }
	try {
		const inflows = await db
			.collection("inflows")
			.find({ _id: userId }, options)
			.toArray()
		res.send(inflows)
	} catch (err) {
		console.log(err)
		res.statusSend(500)
	}
}
