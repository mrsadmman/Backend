const twilio = require("twilio");

const accountSid = "AC050e91061904614952d1824fe5ff2fc8";
const authToken = process.env.AUTHTOKEN

const client = twilio(accountSid, authToken);

const sendPhoneMsg = async (num) => {
  try {
    const message = await client.messages.create({
      body: "Su pedido se ha recibido y se encuentra en proceso",
      from: "+12766630301",
      /* to: `+${num}`, */
      to: "+541133468166"
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

const sendWhatsAppMsg = async (body) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491133468166",
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {sendPhoneMsg, sendWhatsAppMsg}