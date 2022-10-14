// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendMessage = async (phone) => {
  const messageBody = {
    from: process.env.TWILIO_NUMBER,
    body: "Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/",
    to: "whatsapp:" + phone,
  }
  console.log(messageBody);
  const message = await client.messages
    .create(messageBody)
    console.log(message.sid);
    return message;
};
module.exports = sendMessage;
