import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const DEMO_USER_EMAIL = "demo@nasa-fan.test";
const DEMO_USER_PASSWORD = "password123";
const BCRYPT_ROUNDS = 10;

const MISSIONS = [
  {
    name: "Artemis I",
    agency: "NASA",
    launchDate: new Date("2022-11-16"),
    description: "Uncrewed Orion flight test around the Moon.",
  },
  {
    name: "Perseverance",
    agency: "NASA",
    launchDate: new Date("2020-07-30"),
    description: "Mars rover searching for signs of ancient life.",
  },
  {
    name: "James Webb Space Telescope",
    agency: "NASA",
    launchDate: new Date("2021-12-25"),
    description: "Infrared space observatory studying the early universe.",
  },
] as const;

async function main() {
  for (const mission of MISSIONS) {
    const existing = await prisma.mission.findFirst({
      where: { name: mission.name },
    });

    if (!existing) {
      await prisma.mission.create({ data: mission });
    }
  }

  const passwordHash = await bcrypt.hash(DEMO_USER_PASSWORD, BCRYPT_ROUNDS);

  await prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    update: { passwordHash },
    create: {
      email: DEMO_USER_EMAIL,
      passwordHash,
    },
  });

  console.log("Seeded missions:", await prisma.mission.count());
  console.log("Seeded demo user:", DEMO_USER_EMAIL);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
