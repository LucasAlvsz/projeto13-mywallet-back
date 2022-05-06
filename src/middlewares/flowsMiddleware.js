import joi from "joi"

export const postFlowValidator = async (req, res, next) => {
	const schema = joi
		.object({
			body: joi.object({
				value: joi.number().required(),
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
