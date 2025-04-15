const index_page = (req, res) => {
  try {
    res.status(200).json({
      is_success: true,
      message: "server online",
      status_code: 200,
    });
  } catch (error) {
    res.status(200).json({
      is_success: false,
      message: error.message,
      status_code: 400,
    });
  }
};

module.exports = {
  index_page,
};
