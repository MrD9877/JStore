"use server";
import Content from "@/app/_email/content";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { otp, user, email } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "reset@jagraongarments.in",
      to: email,
      subject: "Password Reset",
      react: Content({ otp, user }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return new Response("Hello, Next.js!", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
