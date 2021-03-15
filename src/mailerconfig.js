import { config } from 'dotenv';
import nodemailer from "nodemailer"

config();

export default ()=> nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    auth: {
      user: process.env.USER_AUTH_MAIL,
      pass: process.env.PASS_AUTH_MAIL,
    },
  });