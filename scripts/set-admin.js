const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const email = 'enovazone@arwaeduc.com'.toLowerCase();
    console.log('Updating role to ADMIN for', email);
    const res = await prisma.user.updateMany({ where: { email }, data: { role: 'ADMIN' } });
    console.log('Matched:', res.count);
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      console.log('User:', { id: user.id, email: user.email, role: user.role });
    } else {
      console.log('User not found.');
    }
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
