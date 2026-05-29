// import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";

// dotenv.config();

// sgMail.setApiKey(process.env.SEND_GRID_API);

// const fromEmail = process.env.FROM_EMAIL;

// export const sendEmail = async (to, subject, html) => {
//   const msg = {
//     to,
//     from: `TaskHub <${fromEmail}>`,
//     subject,
//     html,
//   };

//   try {
//     await sgMail.send(msg);
//     console.log("Email sent successfully");

//     return true;
//   } catch (error) {
//     console.error("Error sending email:", error);

//     return false;
//   }
// };


import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const sendGridApiKey = process.env.SENDGRID_API_KEY || process.env.SEND_GRID_API;
const fromEmail = process.env.FROM_EMAIL;

if (!sendGridApiKey) {
  console.error(
    "[send-email] Missing SendGrid API key. Set SENDGRID_API_KEY or SEND_GRID_API in .env"
  );
}

if (!fromEmail) {
  console.error("[send-email] Missing FROM_EMAIL in .env");
}

if (sendGridApiKey) {
  sgMail.setApiKey(sendGridApiKey);
}

export const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: `TaskHub <${fromEmail}>`,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error);
    return false;
  }
};