import * as Joi from 'joi';

export const registerSchema = Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    age: Joi.number().min(18).required(),
    gender: Joi.number().min(0).max(1).required(),
    about: Joi.string().optional()
});