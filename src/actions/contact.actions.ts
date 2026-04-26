"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = formData;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "Tüm alanları doldurun." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send to yourself
    replyTo: email,
    subject: `[ruhadam.dev] ${subject}: ${name}`,
    text: `İsim: ${name}\nE-posta: ${email}\nKonu: ${subject}\n\nMesaj:\n${message}`,
    html: `
      <h3>Yeni İletişim Formu Mesajı</h3>
      <p><strong>İsim:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Konu:</strong> ${subject}</p>
      <p><strong>Mesaj:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin." };
  }
}
