import { Resend } from "resend";

import EmailTemplate from "@/components/emailTemplate";

import { env } from "@/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(
  { name = "John Doe", email, token }: {
    name: string;
    email: string;
    token: string;
  },
) {
  const confirmLink = `http://localhost:3000/verify-email?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: "AuthNext <onboarding@resend.dev>",
      to: ["ra.devweb.io@gmail.com"],
      subject: "Confirm your email",
      react: EmailTemplate({ name, confirmLink }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
