import joi from "joi"
import { ObjectId } from "mongodb"

const validateNumberPattern = value => {
	const parsedValue = parseFloat(value)
	// const errors = []
	// let count = 0
	if (/^[0-9]{0,9}\.?[0-9]{1,2}$/.test(parsedValue)) {
		return parsedValue
		// value
		// 	.split(".")[0]
		// 	.split("")
		// 	.forEach(char => {
		// 		if (char === "0") count++
		// 		if (count > 2)
		// 			errors.push(
		// 				"Maximun number of digits zero before the decimal point is 2"
		// 			)
		// 	})
	}
	return "A number with a maximum of 9 digits and 2 decimals"
}

export const postFlowValidator = async (req, res, next) => {
	const schema = joi
		.object({
			body: joi.object({
				value: joi
					.number()
					.greater(0)
					.valid(validateNumberPattern(req.body.value))
					.required(),
				description: joi.string().required(),
				type: joi.string().valid("inflow", "outflow").required(),
			}),
			headers: joi
				.object({
					authorization: joi
						.string()
						.pattern(/^Bearer\s[a-f0-9-]{36}$/)
						.required(),
				})
				.options({ allowUnknown: true }),
		})
		.options({ allowUnknown: true })
	const { error } = schema.validate(req, { abortEarly: false })
	if (error) return res.status(422).send(error.details.map(e => e.message))
	next()
}

export const getFlowsValidator = async (req, res, next) => {
	const schema = joi
		.object({
			headers: joi
				.object({
					authorization: joi
						.string()
						.pattern(/^Bearer\s[a-f0-9-]{36}$/)
						.required(),
				})
				.options({ allowUnknown: true }),
			params: joi.object({
				limit: joi.number().min(1).integer(),
			}),
		})
		.options({ allowUnknown: true })
	const { error } = schema.validate(req, { abortEarly: false })
	if (error) return res.status(422).send(error.details.map(e => e.message))
	next()
}

const validateObjectId = id => {
	if (ObjectId.isValid(id)) if (String(new ObjectId(id)) === id) return id
	return "A valid ObjectId"
}

export const deleteFlowValidator = async (req, res, next) => {
	const schema = joi
		.object({
			headers: joi
				.object({
					authorization: joi
						.string()
						.pattern(/^Bearer\s[a-f0-9-]{36}$/)
						.required(),
				})
				.options({ allowUnknown: true }),
			params: joi.object({
				flowId: joi.string().valid(validateObjectId(req.params.flowId)),
			}),
		})
		.options({ allowUnknown: true })
	const { error } = schema.validate(req, { abortEarly: false })
	if (error) return res.status(422).send(error.details.map(e => e.message))
	next()
}

export const putFlowValidator = async (req, res, next) => {
	const schema = joi
		.object({
			body: joi.object({
				value: joi
					.number()
					.greater(0)
					.valid(validateNumberPattern(req.body.value))
					.required(),
				description: joi.string().required(),
				type: joi.string().valid("inflow", "outflow").required(),
			}),
			headers: joi
				.object({
					authorization: joi
						.string()
						.pattern(/^Bearer\s[a-f0-9-]{36}$/)
						.required(),
				})
				.options({ allowUnknown: true }),
			params: joi.object({
				flowId: joi.string().valid(validateObjectId(req.params.flowId)),
			}),
		})
		.options({ allowUnknown: true })
	const { error } = schema.validate(req, { abortEarly: false })
	if (error) return res.status(422).send(error.details.map(e => e.message))
	next()
}
