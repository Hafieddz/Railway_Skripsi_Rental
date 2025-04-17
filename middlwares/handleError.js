const handleError = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  res.status(status).json({
    is_success: false,
    message: err.message,
    status_code: status || 500,
  });
};

module.exports = handleError;
