const indicative = require("indicative").validator;
const Client = require("../models/clients");
const { sendError} = require("../utils/utils");

exports.addClient = async (req, res) => {
  let params = req.body;
  try{
    console.log(params);
    await new Client(params).save();
    return res.status(200).json({
      status: "success"
    });
  } catch (err) {
    console.log(err);
    return sendError(req, res, 400, `fail`);
  }
}
