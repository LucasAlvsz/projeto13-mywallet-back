import joi from "joi"

export const postFlowValidator = async (req, res, next) => {
	const schema = joi.object({
		body: joi.object({
			value: joi.number().required(),
			description: joi.string().required(),
		}),
		headers: joi.object({
			authorization: joi
				.string()
				.pattern(/^Bearer\s[a-f0-9-]{36}$/)
				.required(),
		}),
	})
	const { error } = schema.validate(req, { abortEarly: false })
	if (error) res.status(422).send(error.details.map(e => e.message))
	next()
}

export const getFlowsValidator = async (req, res, next) => {
	const schema = joi.object({
		headers: joi.object({
			authorization: joi
				.string()
				.pattern(/^Bearer\s[a-f0-9-]{36}$/)
				.required(),
		}),
		params: joi.object({
			limit: joi.number().min(1).integer(),
		}),
	})
	const { error } = schema.validate(req, { abortEarly: false })
	if (error) res.status(422).send(error.details.map(e => e.message))
	next()
}
