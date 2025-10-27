import { PrismaClient } from "@/lib/generated/prisma"

const prisma = new PrismaClient()

async function main() {
  const branches = [
    {
      slug: "gachibowli",
      name: "Gachibowli",
      address: "#3,4,5,6 Survey No 58/1, Gowliddodi, Gopanpally, Financial District, Gachibowli – 500075",
      phone: "7997806806",
      email: "gachibowli@bharathyundai.com",
      services: ["Sales","Service","Parts","Insurance"],
      hoursJson: JSON.stringify({ sales: "9:00 AM - 7:00 PM", service: "8:00 AM - 6:00 PM", sunday: "10:00 AM - 6:00 PM" }),
      features: ["Showroom","Service Center","Parts Store","Test Drive Track"],
    },
    {
      slug: "gopanpally",
      name: "Gopanpally",
      address: "Gopanpally, Hyderabad, Telangana",
      phone: "7997582582",
      email: "gopanpally@bharathyundai.com",
      services: ["Sales","Service"],
      hoursJson: JSON.stringify({ sales: "9:00 AM - 7:00 PM", service: "8:00 AM - 6:00 PM", sunday: "10:00 AM - 6:00 PM" }),
      features: ["Showroom","Service Center"],
    },
  ]

  for (const b of branches) {
    await prisma.branch.upsert({ where: { slug: b.slug }, update: b, create: b })
  }

  console.log("Seed complete")
}

main().finally(async () => {
  await prisma.$disconnect()
})



