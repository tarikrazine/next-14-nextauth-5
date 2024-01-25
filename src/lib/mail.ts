import { Resend } from "resend";

import EmailTemplate from "@/components/emailTemplate";

import { env } from "@/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

const domain = env.NEXT_PUBLIC_APP_URL;

export async function sendTwoFactorAuthTokenEmail(
  { name, email, token }: {
    name: string;
    email: string;
    token: string;
  },
) {
  try {
    const data = await resend.emails.send({
      from: "AuthNext <onboarding@resend.dev>",
      to: [email],
      subject: "2FA code",
      react: EmailTemplate({ name, token }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}

export async function sendPasswordResetEmail(
  { name, email, token }: {
    name: string;
    email: string;
    token: string;
  },
) {
  const confirmLink = `${domain}/new-password?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: "AuthNext <onboarding@resend.dev>",
      to: [email],
      subject: "Reset your password",
      react: EmailTemplate({ name, confirmLink }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}

export async function sendVerificationEmail(
  { name, email, token }: {
    name: string;
    email: string;
    token: string;
  },
) {
  const confirmLink = `${domain}/verify-email?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: "AuthNext <onboarding@resend.dev>",
      to: [email],
      subject: "Confirm your email",
      react: EmailTemplate({ name, confirmLink }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
