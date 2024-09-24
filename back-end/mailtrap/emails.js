import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailsTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) =>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Verification"
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`,error);
        throw new Error(`Error sending verification: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) =>{
    const recipient = [{email}];

    try {
         const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "4a07f7d6-d5c3-4d78-98c2-57aceb9fbc29",
            template_variables: {
              "company_info_name": "Auth Company",
              "name": name
            }
        });

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error(`Error sending welcome email`,error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) =>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: "Password Reset"
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`,error);
        throw new Error(`Error sending verification: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email) =>{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset success email`,error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
}