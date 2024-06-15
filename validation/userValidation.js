import Joi from 'joi';

const passwordComplexity = Joi.string()
  .pattern(
    new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};\'\\":,.<>/?]).{8,}$',
    ),
  )
  .required()
  .messages({
    'string.pattern.base': `Password not strong enough.`,
  });

const userValidation = Joi.object({
  email: Joi.string().email().required(),
  password: passwordComplexity,
  first_name: Joi.string().min(5).required(),
  last_name: Joi.string().min(5).required(),
});

export { userValidation };
