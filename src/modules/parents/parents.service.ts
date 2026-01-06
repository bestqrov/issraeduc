import prisma from '../../config/database';

// Function to generate unique parent link
export const generateParentLink = async (name: string, phone: string): Promise<string> => {
    const cleanName = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "")
        .trim();

    const last4Phone = phone.slice(-4);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomPart = '';
    for (let i = 0; i < 6; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const baseLink = `parent-${cleanName}-${last4Phone}-${randomPart}`;
    return baseLink;
};

export const getAllParents = async () => {
    return await prisma.parent.findMany({
        include: {
            students: true,
        },
        orderBy: {
            name: 'asc',
        },
    });
};

export const getParentById = async (id: string) => {
    const parent = await prisma.parent.findUnique({
        where: { id },
        include: {
            students: true,
        },
    });

    if (!parent) {
        throw new Error('Parent not found');
    }

    return parent;
};

export const createParent = async (data: any) => {
    if (!data.parentLink) {
        data.parentLink = await generateParentLink(data.name, data.phone);
    }
    return await prisma.parent.create({
        data,
    });
};

export const updateParent = async (id: string, data: any) => {
    return await prisma.parent.update({
        where: { id },
        data,
    });
};

export const deleteParent = async (id: string) => {
    return await prisma.parent.delete({
        where: { id },
    });
};

export const findParentByPhone = async (phone: string) => {
    return await prisma.parent.findUnique({
        where: { phone },
    });
};

export const getParentByLink = async (link: string) => {
    const parent = await prisma.parent.findUnique({
        where: { parentLink: link },
        include: {
            students: {
                include: {
                    inscriptions: true,
                    payments: true,
                    attendances: true
                }
            }
        },
    });

    if (!parent) {
        throw new Error('Parent not found');
    }

    return parent;
};
