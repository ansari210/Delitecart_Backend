const getContactTemplate = (
  first_name,
  last_name,
  email,
  message
) => {
 
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Query - DelightCart</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background-color: #0d6efd; padding: 20px; text-align: center; color: #fff; }
    .header img { max-width: 150px; margin-bottom: 10px; }
    .content { padding: 30px 20px; color: #333; }
    .content h1 { font-size: 22px; margin-bottom: 15px; }
    .details { margin: 20px 0; }
    .details p { margin: 8px 0; font-size: 15px; }
    .details strong { color: #0d6efd; }
    .message-box { background-color: #f9f9f9; border-left: 4px solid #0d6efd; padding: 15px; margin-top: 10px; font-size: 14px; border-radius: 5px; }
    .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888; }
  </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="cid:logo" alt="DelightCart">
        <h2>New Contact Query</h2>
      </div>
      <div class="content">
        <h1>You’ve received a new query from a user:</h1>
        <div class="details">
          <p><strong>Name:</strong> ${first_name} ${last_name}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
        <div class="message-box">
          <strong>Message:</strong>
          <p>${message}</p>
        </div>
        <p style="margin-top:20px;">Please respond to the user as soon as possible.</p>
      </div>
      <div class="footer">
        &copy; 2025 DelightCart. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = { getContactTemplate };
