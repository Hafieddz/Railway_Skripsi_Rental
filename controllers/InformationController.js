const ApiError = require("../lib/ApiError");
const { FAQ, TermsAndCondition } = require("../models");
const { v4: uuidv4 } = require("uuid");

const getFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findAll();

    if (!faq) {
      throw new ApiError(
        404,
        "Data tidak ada... Silahkan isi data terlebih dahulu!"
      );
    }

    res.status(200).json({
      is_success: true,
      data: faq,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getTnC = async (req, res, next) => {
  try {
    const tnc = await TermsAndCondition.findAll();
    if (!tnc) {
      throw new ApiError(
        404,
        "Data tidak ada... Silahkan isi data terlebih dahulu!"
      );
    }

    res.status(200).json({
      is_success: true,
      data: tnc,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const createFAQ = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const faq_id = uuidv4();

    const createFAQ = await FAQ.create({
      faq_id,
      title,
      description,
    });

    (createFAQ);

    res.status(201).json({
      is_success: true,
      message: "Data berhasil dibuat",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const createTnC = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const tnc_id = uuidv4();

    const createTnC = await TermsAndCondition.create({
      tnc_id,
      title,
      description,
    });

    (createTnC);

    res.status(201).json({
      is_success: true,
      message: "Data berhasil dibuat",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const updateFaq = async (req, res, next) => {
  const { faq_id } = req.params;
  const { title, description } = req.body;
  try {
    let values = {};

    if (title) {
      values.title = title;
    }
    if (description) {
      values.description = description;
    }
    const updateFaq = await FAQ.update(values, {
      where: {
        faq_id,
      },
    });

    res.status(201).json({
      is_success: true,
      message: "Data berhasil diedit",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFAQ = async (req, res, next) => {
  const { faq_id } = req.params;
  try {
    const faq = await FAQ.findByPk(faq_id);

    if (faq) {
      await faq.destroy();
    } else {
      throw new ApiError(404, "Data tidak ada...");
    }

    res.status(200).json({
      is_success: true,
      message: "Data berhasil dihapus",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFAQ,
  getTnC,
  createFAQ,
  createTnC,
  updateFaq,
  deleteFAQ,
};
