import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { activity, gift, music, cheesiness, valentineAnswer } = body

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      )
    }

    const isValentineYes = !!valentineAnswer

    const subject = isValentineYes
      ? "SHE SAID YES! Kumkum is your Valentine!"
      : "Kumkum locked in the Valentine's Date Plan!"

    const emailHtml = isValentineYes
      ? `
      <div style="font-family: 'Georgia', serif; max-width: 520px; margin: 0 auto; background: #fff5f7; padding: 40px; border-radius: 16px;">
        <h1 style="color: #e11d48; text-align: center; font-size: 32px; margin-bottom: 8px;">
          She said YES!
        </h1>
        <p style="color: #4a0519; text-align: center; font-size: 18px; line-height: 1.6; margin-bottom: 16px;">
          Kumkum just said yes to being your Valentine! Time to make it the most special day ever.
        </p>
        <div style="text-align: center; font-size: 48px; margin: 16px 0;">💖🎉</div>
        <p style="text-align: center; color: #9f1239; font-style: italic; font-size: 14px;">
          Plan locked. It feels magical.
        </p>
      </div>
      `
      : `
      <div style="font-family: 'Georgia', serif; max-width: 520px; margin: 0 auto; background: #fff5f7; padding: 40px; border-radius: 16px;">
        <h1 style="color: #e11d48; text-align: center; font-size: 28px; margin-bottom: 8px;">
          Kumkum's Valentine Plan
        </h1>
        <p style="color: #9f1239; text-align: center; font-size: 14px; margin-bottom: 32px;">
          She locked in her choices! Here's the plan:
        </p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #881337; border-bottom: 1px solid #fecdd3;">Activity</td>
            <td style="padding: 12px 16px; color: #4a0519; border-bottom: 1px solid #fecdd3;">${activity || "Surprise me!"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #881337; border-bottom: 1px solid #fecdd3;">Gift</td>
            <td style="padding: 12px 16px; color: #4a0519; border-bottom: 1px solid #fecdd3;">${gift || "All of them, obviously"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #881337; border-bottom: 1px solid #fecdd3;">Music Vibe</td>
            <td style="padding: 12px 16px; color: #4a0519; border-bottom: 1px solid #fecdd3;">${music || "Whatever makes you smile"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #881337;">Cheesiness</td>
            <td style="padding: 12px 16px; color: #4a0519;">${cheesiness || "Maximum"}</td>
          </tr>
        </table>
        
        <p style="text-align: center; color: #9f1239; font-style: italic; margin-top: 24px; font-size: 13px;">
          Plan locked. It feels magical. Time to make it happen! 💕
        </p>
      </div>
      `

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Valentine Plan <onboarding@resend.dev>",
        to: ["create12212@gmail.com"],
        subject,
        html: emailHtml,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }

    const data = await res.json()
    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
