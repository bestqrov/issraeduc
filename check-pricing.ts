
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const pricing = await prisma.pricing.findMany();
    console.log('Total Pricing Items:', pricing.length);
    const summary = pricing.reduce((acc: any, item: any) => {
        const key = `${item.category} - ${item.level}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    console.log('Pricing Summary (Category - Level):', JSON.stringify(summary, null, 2));

    const soutiens = pricing.filter(p => p.category === 'SOUTIEN');
    console.log('Unique Levels for SOUTIEN:', [...new Set(soutiens.map(p => p.level))]);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
