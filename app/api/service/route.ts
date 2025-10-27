import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, phone, email, vehicle, serviceId, branchId, notes } = body || {}
    if (!fullName || !phone || !vehicle || !serviceId || !branchId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const saved = await prisma.serviceBooking.create({
      data: { fullName, phone, email, vehicle, serviceId, branchId, notes },
    })
    return NextResponse.json({ id: saved.id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}

