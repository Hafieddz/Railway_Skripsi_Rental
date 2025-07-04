const Joi = require("joi");

const updateCarSchema = Joi.object({
  details: Joi.optional().required().messages({
    "any.required": "Detail kendaraan wajib diisi",
    "string.empty": "Detail kendaraan wajib diisi",
  }),
  price_per_day: Joi.number().positive().required().messages({
    "any.required": "Harga sewa per hari wajib diisi",
    "number.base": "Harga sewa wajib berupa angka",
    "number.positive": "Harga sewa wajib bernilai positif",
  }),
  is_available: Joi.boolean().required().messages({
    "any.required": "Status ketersediaan wajib diisi",
    "boolean.base": "Format 'is_available' salah",
  }),
  image_url: Joi.string().uri().required().messages({
    "any.required": "URL gambar wajib diisi",
    "string.empty": "URL gambar wajib diisi",
    "string.uri": "URL gambar tidak valid",
  }),
});

const createCarSchema = Joi.object({
  license_plate: Joi.string()
    .pattern(/^[A-Z]{1,2}\s\d{1,4}\s?[A-Z]{0,3}$/)
    .required()
    .messages({
      "any.required": "Plat nomor wajib diisi",
      "string.empty": "Plat nomor wajib diisi ",
      "string.pattern.base": "Format plat nomor salah",
    }),
  name: Joi.string().required().messages({
    "any.required": "Nama kendaraan wajib diisi",
    "string.empty": "Nama kendaraan wajib diisi",
  }),
  brand: Joi.string().required().messages({
    "any.required": "Brand kendaraan wajib diisi",
    "string.empty": "Brand kendaraan wajib diisi",
  }),
  details: Joi.string().required().messages({
    "any.required": "Detail kendaraan wajib diisi",
    "string.empty": "Detail kendaraan wajib diisi",
  }),
  manufacture_year: Joi.number().integer().required().messages({
    "any.required": "Tahun pembuatan wajib diisi",
    "number.base": "Tahun pembuatan wajib berupa angka",
  }),
  color: Joi.string().required().messages({
    "any.required": "Warna mobil wajib diisi",
    "string.empty": "Warna mobil wajib diisi",
  }),
  transmission_type: Joi.string()
    .valid("Manual", "Automatic")
    .required()
    .messages({
      "any.required": "Tipe transmisi wajib diisi",
      "string.empty": "Tipe tranmisi wajib diisi",
      "any.only": "Tipe tranmisi harus 'Automatic' atau 'Manual'",
    }),
  price_per_day: Joi.number().positive().required().messages({
    "any.required": "Harga sewa per hari wajib diisi",
    "number.base": "Harga sewa wajib berupa angka",
    "number.positive": "Harga sewa wajib bernilai positif",
  }),
  is_available: Joi.boolean().required().messages({
    "any.required": "Status ketersediaan wajib diisi",
    "boolean.base": "Format 'is_available' salah",
  }),
  type: Joi.string().valid("Sedan", "MPV", "SUV").required().messages({
    "any.required": "Tipe kendaraan wajib diisi",
    "string.empty": "Tipe kendaraan wajib diisi",
    "any.only": "Tipe kendaraan harus 'Sedan','MPV', atau 'SUV'",
  }),
  passenger_capacity: Joi.number().integer().min(1).required().messages({
    "any.required": "Kapasitas penumpang wajib diisi",
    "number.base": "Kapasitas penumpang harus berupa angka",
    "number.min": "Kapasitas penumpang harus lebih dari 1",
  }),
  image_url: Joi.optional(),
});

module.exports = {
  createCarSchema,
  updateCarSchema,
};
