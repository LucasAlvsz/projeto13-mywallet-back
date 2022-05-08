import db from "../db/db.js"
import joi from "joi"

export const tokenValidator = async (req, res, next) => {
	const tokenSchema = joi
		.object({
			authorization: joi
				.string()
				.pattern(/^Bearer\s[a-f0-9-]{36}$/)
				.required(),
		})
		.options({ allowUnknown: true })
	const { error } = tokenSchema.validate(req.headers, { abortEarly: false })
	if (error) return res.status(422).send(error.details.map(e => e.message))
	const token = req.headers.authorization.split(" ")[1]
	try {
		const session = await db
			.collection("sessions")
			.findOne({ token, loggedIn: true })
		if (!session) return res.status(498).send("Invalid or expired token")
		res.locals.userId = session.userId
		next()
	} catch (err) {
		res.sendStatus(500)
	}
}
