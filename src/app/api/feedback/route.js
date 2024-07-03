import { EmailTemplate } from "@/components/EmailTemplate.jsx";
import { Resend } from "resend";
export const revalidate = 0;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email, comment } = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["szuhan.eng@gmail.com"],
      subject: "Feedback from running 4 life",
      react: EmailTemplate({ email: email ? email : "", comment: comment })
    });

    if (error) {
      console.error(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
