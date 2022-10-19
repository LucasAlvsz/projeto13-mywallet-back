import db from "../db/db.js"
import { ObjectId } from "mongodb"
import { getDate } from "../utils/getDaysjs.js"

export const postFlows = async (req, res) => {
	const { description, type } = req.body
	const value = parseFloat(req.body.value)
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
	const { limit } = req.params
	const options = { limit }
	try {
		const inflows = await db.collection("flows").find({ userId: userId }, options).toArray()
		res.send(
			inflows.map(({ _id, value, description, type, date }) => ({
				flowId: _id,
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

export const putFlows = async (req, res) => {
	const { value, description, type } = req.body
	const { userId } = res.locals
	const { flowId } = req.params
	try {
		await db
			.collection("flows")
			.updateOne({ _id: flowId, userId }, { $set: { value, description, type } })
		res.sendStatus(200)
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}

export const deleteFlow = async (req, res) => {
	const { userId } = res.locals
	const { flowId } = req.params
	try {
		const { deletedCount } = await db
			.collection("flows")
			.deleteOne({ _id: ObjectId(flowId), userId })
		if (!deletedCount) return res.status(404).send("Flow not found")
		res.sendStatus(200)
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}

export const putFlow = async (req, res) => {
	const { value, description, type } = req.body
	const { userId } = res.locals
	const { flowId } = req.params
	try {
		const flow = await db.collection("flows").findOne({ _id: ObjectId(flowId), userId })

		if (!flow) return res.status(404).send("Flow not found")
		const { modifiedCount } = await db
			.collection("flows")
			.updateOne({ _id: ObjectId(flowId), userId }, { $set: { value, description, type } })
		if (!modifiedCount) return res.status(409).send("A nova entrada/saida é igual a anterior")
		res.sendStatus(200)
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}
