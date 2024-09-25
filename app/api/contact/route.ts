import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { firstName, name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "mail.infomaniak.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const customMessage = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #7947FF; border-radius: 5px;">
          <h2>🍀 Nouveau message de <span style="color: #7947FF;">${firstName} ${name}</span></h2>
          <p style="font-size: 16px;">Vous avez reçu un nouveau message depuis votre formulaire de contact :</p>
          <table style="width: 100%;">
            <tr>
              <td style="font-weight: bold; padding: 5px 0;">Nom : ${firstName} ${name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 5px 0;">Email : ${email}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 5px 0;">Message :</td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <div style="background-color: #f9f9f9; padding: 10px; border-left: 5px solid #7947FF; margin: 0;">
                  ${message}
                </div>
              </td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Cordialement,</p>
          <p style="margin: 0;">Votre site web</p>
        </div>
      </body>
    </html>
    `;

    const mailOptions = {
      from: "hello@gael-dev.fr",
      replyTo: `${firstName} ${name} <${email}>`,
      to: "hello@gael-dev.fr",
      subject: `🚀 Nouveau message de ${firstName} ${name}.`,
      html: customMessage,
    };

    const confirmationMessage = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #7947FF; border-radius: 5px;">
          <h2>Merci, ${firstName} ${name}!</h2>
          <p style="font-size: 16px;">Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          <p style="margin-top: 20px;">Cordialement,</p>
          <p style="margin: 0;">Votre site web</p>
        </div>
      </body>
    </html>
    `;

    const confirmationMailOptions = {
      from: "hello@gael-dev.fr",
      to: email,
      subject: "Confirmation de réception de votre message",
      html: confirmationMessage,
    };

    // Envoyer l'email à vous-même
    let info = await transporter.sendMail(mailOptions);
    console.log("🍀 Email envoyé avec succès : ", info.response);

    // Envoyer l'email de confirmation au destinataire
    let confirmationInfo = await transporter.sendMail(confirmationMailOptions);
    console.log(
      "🍀 Email de confirmation envoyé avec succès : ",
      confirmationInfo.response
    );

    return NextResponse.json(
      { message: "🚀 Email envoyé avec succès !" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("🛑 Erreur lors de l'envoi : ", error);
    return NextResponse.json(
      { error: `🛑 Erreur lors de l'envoi : ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
