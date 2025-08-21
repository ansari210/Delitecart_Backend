const Query = require("../models/queryModel");
const nodemailer = require("nodemailer");
const {
  getContactTemplate,
} = require("../email_templates/contact_us_template");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const register_query = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      message,
      receiver_comm_message,
      store_data,
    } = req.body;
    const newQuery = new Query({
      first_name,
      last_name,
      email,
      message,
      receiver_comm_message,
      store_data,
    });

    const response = await newQuery.save();

    if (!response)
      return res.status(304).send({
        success: false,
        message: "something went wrong try after some time",
      });
    const htmlContent = getContactTemplate(
      first_name,
      last_name,
      email,
      message
    );
    await transporter.sendMail({
      from: '"DelightCart" <Query@delightcart.com>',
      to: "shahzad201415@gmail.com",
      subject: "Query",
      html: htmlContent,
      attachments: [
        {
          filename: "logo.png",
          path: "./public/logo.png",
          cid: "logo",
        },
      ],
    });

    return res.status(201).send({
      success: true,
      message: "your query has been submitted soon we will get back to you",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
const get_all_query = async (req, res) => {
  try {
    const data = await Query.find({});
    return res.status(200).send({ success: true, data: data });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};
const get_query_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Query.findById(id);
    if (!data)
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    return res.status(200).send({ success: true, data: data });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};
module.exports = { register_query, get_all_query, get_query_by_id };
