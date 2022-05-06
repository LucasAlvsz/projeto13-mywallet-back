import db from "../db/db.js"
import { getDate } from "../usables/getDaysjs.js"

export const postFlows = async (req, res) => {
	const { value, description, type } = req.body
	const { userId } = res.locals
	try {
		await db
			.collection("flows")
			.insertOne({ userId, value, description, type, date: getDate() })
		res.sendStatus(201)
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
}

export const getFlows = async (req, res) => {
	const { userId } = res.locals
	console.log(userId)
	const { limit } = req.params
	const options = { limit }
	try {
		const inflows = await db
			.collection("flows")
			.find({ userId: userId }, options)
			.toArray()
		res.send(
			inflows.map(({ value, description, type, date }) => ({
				value,
				description,
				type,
				date,
			}))
		)
	} catch (err) {
		console.log(err)
		res.status(500)
	}
}
