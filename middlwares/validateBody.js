module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        is_success: false,
        message: error.details.map((err) => err.message),
        status_code: 400,
      });
    }
    ("Next Validate Body");

    next();
  };
};
