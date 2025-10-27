import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, phone, email, vehicle, serviceId, branchId, notes } = body || {}
    if (!fullName || !phone || !vehicle || !serviceId || !branchId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}

