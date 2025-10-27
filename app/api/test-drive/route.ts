import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, phone, email, licenseNo, modelId, branchId, date, timeSlot } = body || {}
    if (!fullName || !phone || !modelId || !branchId || !date || !timeSlot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const saved = await prisma.testDriveBooking.create({
      data: { fullName, phone, email, licenseNo, modelId, branchId, date, timeSlot },
    })
    return NextResponse.json({ id: saved.id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}



