const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: { email: true, name: true, role: true }
    });
    console.log('Users in database:');
    users.forEach(u => console.log(`- ${u.email} (${u.role}) - ${u.name}`));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();