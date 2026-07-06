import { PrismaClient, Role, ProjectStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing data
  await prisma.workspaceSettings.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.report.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create users
  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@company.com',
      name: 'Admin User',
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const member = await prisma.user.create({
    data: {
      email: 'member@company.com',
      name: 'Teammate 4',
      passwordHash,
      role: Role.MEMBER,
    },
  });

  console.log('Users created:', { admin: admin.email, member: member.email });

  // 3. Create workspace settings
  await prisma.workspaceSettings.create({
    data: {
      userId: member.id,
      routerTransitions: true,
      routerTelemetry: true,
      routerCache: false,
    },
  });

  await prisma.workspaceSettings.create({
    data: {
      userId: admin.id,
      routerTransitions: true,
      routerTelemetry: false,
      routerCache: true,
    },
  });

  // 4. Create projects
  const projectsData = [
    { name: 'Navbar & Header Modules', ownerId: admin.id, status: ProjectStatus.IN_REVIEW, progress: 85 },
    { name: 'Drawer & Drawer Transition animations', ownerId: admin.id, status: ProjectStatus.IN_PROGRESS, progress: 45 },
    { name: 'Responsive Layout & Grid System', ownerId: admin.id, status: ProjectStatus.NOT_STARTED, progress: 10 },
    { name: 'Router & SPA Dynamic Area', ownerId: member.id, status: ProjectStatus.ACTIVE_CODING, progress: 99 },
    { name: 'Global Palette Switcher & Integration', ownerId: member.id, status: ProjectStatus.NOT_STARTED, progress: 5 }
  ];

  for (const proj of projectsData) {
    await prisma.project.create({
      data: proj,
    });
  }

  console.log('Projects created successfully.');
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
