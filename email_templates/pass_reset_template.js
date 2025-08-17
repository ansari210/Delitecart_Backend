const pass_reset_template = (name, user_email) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DelightCart Password Reset Reminder</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .header { background-color: #0d6efd; padding: 20px; text-align: center; border-top-left-radius:10px; border-top-right-radius:10px; }
    .header img { max-width: 150px; }
    .content { padding: 30px 20px; color: #333; text-align: center; }
    .content h1 { font-size: 24px; margin-bottom: 15px; color: #0d6efd; }
    .content p { font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
    .btn { display: inline-block; padding: 12px 25px; font-size: 16px; color: #fff; background-color: #0d6efd; text-decoration: none; border-radius: 5px; margin-bottom: 20px; }
    .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888; border-bottom-left-radius:10px; border-bottom-right-radius:10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
     <img src="cid:logo" alt="DelightCart">
    </div>
    <div class="content">
      <h1>Hello ${name}!</h1>
      <p>We noticed a request to reset the password for your DelightCart account (${user_email}).</p>
      <p>If you initiated this request, please click the button below to securely reset your password and regain access to your account.</p>
      <a href="YOUR_PASSWORD_RESET_LINK_HERE" class="btn">Reset Your Password</a>
      <p>If you did <strong>not</strong> request a password reset, there is no need to worry. Your account remains safe, but we recommend changing your password to something strong and secure to ensure your account is fully protected.</p>
      <p>We’re always here to help! If you have any questions or need assistance, please reach out to our support team.</p>
      <p>Warm regards,<br><strong>The DelightCart Team</strong></p>
    </div>
    <div class="footer">
      &copy; 2025 DelightCart. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

module.exports = { pass_reset_template };
