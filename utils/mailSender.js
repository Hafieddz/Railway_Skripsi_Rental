require("dotenv").config();

const nodemailer = require("nodemailer");

const sender_email = process.env.MAIL_HOST;
const pass_email = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: sender_email,
    pass: pass_email,
  },
});

const htmlRegister = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email C3 Collection - Register</title>
</head>
<body
    style="display: flex; justify-content: center; background-color: #4fa2fe; padding: 20px; font-family: 'Roboto', Arial, sans-serif;">
    <div style="border-radius: 10px; background-color: white; padding: 20px; width: 80%;">
        <h1> C3 Collection </h1>
        <h3> Halo</h3>
        <h4> Berikut adalah kote OTP kamu : </h4>
        <div style="margin-top: 20px; margin-bottom: 10px; display: flex; gap: 10px;">
             ${otp
               .split("")
               .map(
                 (digit) => `
                <div style=" display: flex; gap: 10px;">
                    <h2>${digit}</h2>
                </div>
                `
               )
               .join("")}
        </div>
        <h4> Kode ini berlaku selama 30 menit.</h4>
        <h4> Jika kamu tidak merasa meminta kode ini, silakan abaikan email ini.</h4>
    </div>
</body>
</html>`;
};

const htmlForgotPassword = (token) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email C3 Collection - Ganti Password </title>
</head>
<body
    style="display: flex; justify-content: center; background-color: #4fa2fe; padding: 20px; font-family: 'Roboto', Arial, sans-serif;">
    <div style="border-radius: 10px; background-color: white; padding: 20px; width: 80%;">
        <h1> C3 Collection </h1>
        <h3> Halo</h3>
        <h4> Berikut adalah link untuk ganti password : </h4>
        <a href="http://localhost:5173/forgot-password/change-password?token=${token}"> http://localhost:5173/forgot-password/change-password?token=${token}.com </a>
        <h4> Kode ini berlaku selama 30 menit.</h4>
        <h4> Jika kamu tidak merasa meminta kode ini, silakan abaikan email ini.</h4>
    </div>
</body>
</html>`;
};

const htmtInvalidEmail = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email C3 Collection - Invalid Email </title>
</head>
<body
    style="display: flex; justify-content: center; background-color: #4fa2fe; padding: 20px; font-family: 'Roboto', Arial, sans-serif;">
    <div style="border-radius: 10px; background-color: white; padding: 20px; width: 80%;">
        <h1> C3 Collection </h1>
        <h4> Halo </h4>
        <h3> Anda telah meminta untuk ganti password di website C3 Rental, akan tetapi kami tidak mempunyai akun yang sesuai dengan email yang anda berikan.</h3>
    </div>
</body>
</html>`;
};

module.exports = {
  sender_email,
  pass_email,
  transporter,
  htmlRegister,
  htmtInvalidEmail,
  htmlForgotPassword,
};
