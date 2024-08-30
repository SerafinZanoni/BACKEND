import nodemailer from "nodemailer";
import envsConfig from "../config/envs.config.js";

export const sendEmail = async (email, subjet, message) =>{
    console.log(message)
    const transporter = nodemailer.createTransport(
        {
            service: "gmail",
            port: 587,
            auth: {
                user: envsConfig.GMAIL_EMAIL,
                pass: envsConfig.GMAIL_PASS,
            }
        })
    await transporter.sendMail(
        {
            from: envsConfig.GMAIL_EMAIL,
            to: email,
            subject: subjet,
            text: message
        }
    )
}