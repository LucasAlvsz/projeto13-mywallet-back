import db from "../db/db.js"

export const tokenValidator = async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1]
	try {
		const session = await db
			.collection("sessions")
			.findOne({ token, loggedIn: true })
		if (!session) return res.status(401).send("Invalid or expired token")
		res.locals.userId = session.userId
		next()
	} catch (err) {
		res.sendStatus(500)
	}
}
