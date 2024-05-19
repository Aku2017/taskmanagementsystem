/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';;
const prisma = new PrismaClient();

async function main() {
  // Define the default start and end dates
  const defaultStartDate = new Date('2024-01-01T00:00:00.000Z');
  const defaultEndDate = new Date('2024-12-31T23:59:59.999Z');

  // Fetch all tasks
  const tasks = await prisma.task.findMany();

  // Update each task with the default start and end dates
  for (const task of tasks) {
    await prisma.task.update({
      where: { id: task.id },
      data: {
        startDate: task.startDate || defaultStartDate,
        endDate: task.endDate || defaultEndDate,
      },
    });
    console.log(`Updated task ${task.id} with startDate and endDate`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
