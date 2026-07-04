import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.user.upsert({
    where: {
      email: "demo@hiretrack.dev",
    },
    update: {},
    create: {
      email: "demo@hiretrack.dev",
      passwordHash: "temporary_hash",
      firstName: "Demo",
      lastName: "User",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });