import prisma from '../../config/database';

export const generateTeacherLink = async (name: string, phone?: string): Promise<string> => {
    const cleanName = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "")
        .trim();

    // Use last 4 of phone if available, else random chars
    const suffix = phone ? phone.slice(-4) : Math.random().toString(36).substring(2, 6);
    const randomTag = Math.random().toString(36).substring(2, 8);

    return `teacher-${cleanName}-${suffix}-${randomTag}`;
};

export interface CreateTeacherData {
    name: string;
    email?: string;
    phone?: string;
    cin?: string;
    dob?: Date | string;
    gender?: string;
    picture?: string;
    status?: string;
    socialMedia?: any;
    hourlyRate?: number;
    paymentType?: string;
    commission?: number;
    specialties?: string[];
    levels?: string[];
}

export const createTeacher = async (data: CreateTeacherData) => {
    const teacherLink = await generateTeacherLink(data.name, data.phone);
    return await prisma.teacher.create({
        data: {
            ...data,
            teacherLink
        }
    });
};

export const getAllTeachers = async () => {
    return await prisma.teacher.findMany({
        orderBy: { name: 'asc' },
        include: {
            _count: {
                select: { groups: true }
            }
        }
    });
};

export const updateTeacher = async (id: string, data: Partial<CreateTeacherData>) => {
    return await prisma.teacher.update({
        where: { id },
        data
    });
};

export const deleteTeacher = async (id: string) => {
    return await prisma.teacher.delete({
        where: { id }
    });
};

export const calculateMonthlyTeacherExpenses = async () => {
    // Get all teachers with their groups
    const teachers = await prisma.teacher.findMany({
        include: {
            groups: {
                include: {
                    students: true,
                    _count: {
                        select: { students: true }
                    }
                }
            }
        }
    });

    let totalExpenses = 0;

    for (const teacher of teachers) {
        let teacherExpense = 0;

        if (teacher.paymentType === 'FIXED') {
            // Fixed salary - pay the hourlyRate as monthly salary
            teacherExpense = teacher.hourlyRate || 0;
        } else if (teacher.paymentType === 'HOURLY') {
            // Hourly rate - estimate based on groups
            // Assume each group has 8 hours per month (2 hours/week * 4 weeks)
            const totalHours = teacher.groups.length * 8;
            teacherExpense = totalHours * (teacher.hourlyRate || 0);
        } else if (teacher.paymentType === 'PERCENTAGE') {
            // Percentage based - calculate from student count
            // This is an estimate - actual would need inscription amounts
            const totalStudents = teacher.groups.reduce((sum, group) => sum + group._count.students, 0);
            // Estimate: 500 MAD per student * commission percentage
            const estimatedRevenue = totalStudents * 500;
            teacherExpense = estimatedRevenue * ((teacher.commission || 0) / 100);
        }

        totalExpenses += teacherExpense;
    }

    return {
        totalTeacherExpenses: totalExpenses,
        teacherCount: teachers.length
    };
};

export const getTeacherByLink = async (link: string) => {
    const teacher = await prisma.teacher.findUnique({
        where: { teacherLink: link },
        include: {
            groups: {
                include: {
                    students: {
                        select: {
                            id: true,
                            name: true,
                            surname: true,
                            photo: true,
                            schoolLevel: true
                        }
                    }
                }
            }
        }
    });

    if (!teacher) {
        throw new Error('Teacher not found');
    }

    // Return restricted data for public/teacher portal
    const { hourlyRate, commission, cin, ...restrictedData } = teacher as any;
    return restrictedData;
};

