const Joi = require("joi");

const allowedRoles = ['admin', 'faculty', 'student'];

const registerSchema = Joi.object({
  role: Joi.string().valid(...allowedRoles).lowercase().required(),
  username: Joi.string().min(3).max(255).lowercase().required(),
  password: Joi.string().min(6).max(1024).required(),
});

module.exports = {
  registerSchema,
}

