
const getOtpTemplate=(name,email, otp)=> {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DelightCart OTP</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .header { background-color: #0d6efd; padding: 20px; text-align: center; }
    .header img { max-width: 150px; }
    .content { padding: 30px 20px; text-align: center; color: #333; }
    .content h1 { font-size: 24px; margin-bottom: 10px; }
    .content p { font-size: 16px; margin-bottom: 20px; }
    .otp { display: inline-block; font-size: 28px; font-weight: bold; color: #0d6efd; padding: 15px 30px; border: 2px dashed #0d6efd; border-radius: 8px; letter-spacing: 5px; margin-bottom: 20px; }
    .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888; }
  </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="cid:logo" alt="DelightCart">
      </div>
      <div class="content">
        <h1>Hello!</h1>
        <p> Hi <strong> ${name} </strong> We received a request to reset your DelightCart account password (${email}).</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
        <p>Stay delighted,<br><strong>The DelightCart Team</strong></p>
      </div>
      <div class="footer">
        &copy; 2025 DelightCart. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}

module.exports = { getOtpTemplate };
