import { validate, Joi } from "express-validation";

export default validate({
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
    }),
});