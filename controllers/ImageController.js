const imageKit = require("../config/imagekit");
const ApiError = require("../lib/ApiError");
const path = require("path");

const uploadImage = async (req, res, next) => {
  const { user_id } = req.user;
  const { type } = req.query;

  try {
    if (!req.file) {
      throw new ApiError(
        404,
        "Tidak dapat mendapatkan file yang akan diupload"
      );
    }

    const originalName = req.file.originalname;

    const fileExtension = path.extname(originalName);
    const timestamp = Date.now();
    let customFileName;
    let folderUpload;

    if (type === "User") {
      customFileName = `UserImage-${user_id}-${timestamp}${fileExtension}`;
      folderUpload = "/user";
    } else if (type === "Vehicle") {
      customFileName = `Vehicle-${timestamp}${fileExtension}`;
      folderUpload = "/vehicle";
    }

    console.log({ customFileName });

    const uploadResult = await imageKit.upload({
      file: req.file.buffer,
      fileName: customFileName,
      folder: folderUpload,
    });

    if (type === "User") {
      res.locals.userImgFilename = uploadResult.name;
    } else {
      res.locals.vehicleImgFilename = uploadResult.name;
    }

    next();

  } catch (error) {
    next(error);
  }
};

module.exports = uploadImage;
