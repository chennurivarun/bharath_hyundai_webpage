import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body || {}
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })
    const saved = await prisma.newsletter.upsert({
      where: { email },
      update: {},
      create: { email },
    })
    return NextResponse.json({ id: saved.id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}



