import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({ orderBy: { name: 'asc' } })
    return NextResponse.json(branches)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}



