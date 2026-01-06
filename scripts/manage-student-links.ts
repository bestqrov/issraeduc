import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateStudentLink(name: string, surname: string, year: number): Promise<string> {
    const cleanName = `${name} ${surname}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "")
        .trim();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const baseLink = `enovazoneacadimeca${cleanName}${year}${id}`;
    let link = baseLink;
    let attempts = 0;
    while (attempts < 10) {
        const existingStudent = await prisma.student.findUnique({
            where: { studentLink: link }
        });
        if (!existingStudent) break;
        id = '';
        for (let i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
        link = `enovazoneacadimeca${cleanName}${year}${id}`;
        attempts++;
    }
    return link;
}

async function main() {
    const students = await prisma.student.findMany();
    console.log(`Found ${students.length} students.`);

    for (const student of students) {
        if (!student.studentLink) {
            const year = student.createdAt.getFullYear();
            const link = await generateStudentLink(student.name, student.surname, year);
            await prisma.student.update({
                where: { id: student.id },
                data: { studentLink: link }
            });
            console.log(`Generated link for ${student.name} ${student.surname}: ${link}`);
        } else {
            console.log(`Student ${student.name} ${student.surname} already has link: ${student.studentLink}`);
        }
    }

    const allStudents = await prisma.student.findMany({
        select: {
            name: true,
            surname: true,
            studentLink: true
        }
    });

    console.log('\n--- STUDENT LINKS LIST ---');
    allStudents.forEach(s => {
        console.log(`${s.name} ${s.surname}: ${s.studentLink}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
