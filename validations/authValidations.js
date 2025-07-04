const Joi = require("joi");

const registerUserSchema = Joi.object({
  firstname: Joi.string().required().messages({
    "any.required": "Nama depan wajib diisi",
    "string.empty": "Nama depan wajib diisi",
  }),
  lastname: Joi.optional(),
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
  gender: Joi.string().valid("Male", "Female").required().messages({
    "string.empty": "Gender tidak boleh kosong",
    "any.required": "Gender tidak boleh kosong",
    "any.only": "Gender harus 'Male' atau 'Female'",
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
