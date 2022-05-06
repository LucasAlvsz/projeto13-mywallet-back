import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"

import db from "../db/db.js"
import { getTime } from "../usables/getTime.js"
export const singUp = async (req, res) => {
	const { name, email, password } = req.body
	try {
		const encryptedPassword = bcrypt.hashSync(password, 10)
		await db
			.collection("users")
			.insertOne({ name, email, password: encryptedPassword })

		res.sendStatus(201)
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}

export const singIn = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await db.collection("users").findOne({ email })
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = uuid()
			const session = await db
				.collection("sessions")
				.findOne({ userId: user._id, loggedIn: true })
			if (session) {
				await db
					.collection("sessions")
					.update(
						{ userId: user._id },
						{ $set: { loggedIn: false, loggoutDate: getTime() } }
					)
				return res
					.status(409)
					.send(
						"Sua conta MyWallet está conectada a outro dispositivo!Por segurança todas as outras contas MyWallets foram desconectadas!"
					)
			}
			await db.collection("sessions").insertOne({
				userId: user._id,
				token,
				loggedIn: true,
				loginDate: getTime(),
				loggoutDate: null,
			})
			return res.send({ token })
		}
		res.status(401).send("Email e/ou Senha incorreto(os)")
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
}
