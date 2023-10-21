import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const bob = await prisma.user.upsert({
    where: {
      email: "bob@example.com",
    },
    update: {},
    create: {
      name: "Bob",
      email: "bob@example.com",
      password: "1234",
    },
  });

  const project = await prisma.project.create({
    data: {
      name: "Another Project",
      userId: bob.id,
    },
  });

  const task = await prisma.task.create({
    data: {
      name: "Another task",
      projectId: project.id,
    },
  });

  console.log({ bob, project, task });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
