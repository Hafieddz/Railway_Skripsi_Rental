const Joi = require("joi");

const registerUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email tidak boleh kosong",
    "any.required": "Email tidak boleh kosong",
    "string.email": "Format email salah",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password tidak boleh kosong",
    "any.required": "Password tidak boleh kosong",
  }),
  confirm_password: Joi.string().required().messages({
    "string.empty": "Konfimasi password tidak boleh kosong",
    "any.required": "Konfirmasi password tidak boleh kosong",
  }),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email tidak boleh kosong",
    "any.required": "Email tidak boleh kosong",
    "string.email": "Format email salah",
  }),
  otp: Joi.string().required().min(6).max(6).messages({
    "string.base": "Format OTP Salah",
    "string.empty": "OTP tidak boleh kosong",
    "string.min": "OTP harus berjumlah 6 karakter",
    "string.max": "OTP harus berjumlah 6 karakter",
    "any.required": "OTP tidak boleh kosong",
  }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email tidak boleh kosong",
    "any.required": "Email tidak boleh kosong",
    "string.email": "Format email salah",
  }),
});

module.exports = {
  registerUserSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
};
