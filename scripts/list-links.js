const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const students = await prisma.student.findMany({
        select: {
            name: true,
            surname: true,
            studentLink: true
        }
    });

    console.log('--- DATA START ---');
    students.forEach(s => {
        console.log(`${s.name} ${s.surname}: ${s.studentLink}`);
    });
    console.log('--- DATA END ---');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
