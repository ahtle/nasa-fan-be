import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mission.createMany({
    data: [
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
    ],
    skipDuplicates: true,
  });

  console.log("Seeded missions:", await prisma.mission.count());
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
