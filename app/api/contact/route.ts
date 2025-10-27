import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      department,
      subject,
      message,
    } = body || {}

    if (!firstName || !lastName || !email || !phone || !department || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // No database: accept and return ok
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}



