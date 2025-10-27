import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

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

    const saved = await prisma.contactMessage.create({
      data: { firstName, lastName, email, phone, department, subject, message },
    })

    return NextResponse.json({ id: saved.id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}



