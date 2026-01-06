import prisma from '../../config/database';

interface CreatePaymentData {
    studentId: string;
    amount: number;
    method: string;
    credit?: number;
    note?: string;
    date?: Date;
}

import { createTransaction, getMonthlyTransactionStats } from '../transactions/transactions.service';
import { calculateMonthlyTeacherExpenses } from '../teachers/teachers.service';

export const createPayment = async (data: CreatePaymentData) => {
    const { studentId, amount, method, credit = 0, note, date } = data;

    // Check if student exists
    const student = await prisma.student.findUnique({
        where: { id: studentId },
    });

    if (!student) {
        throw new Error('Student not found');
    }

    const payment = await prisma.payment.create({
        data: {
            studentId,
            amount,
            method,
            credit,
            note,
            date: date || new Date(),
        },
        include: {
            student: true,
        },
    });

    // Automatically create an INCOME transaction (amount minus credit)
    const netAmount = amount - credit;
    if (netAmount > 0) {
        await createTransaction({
            type: 'INCOME',
            amount: netAmount,
            category: 'Paiement Scolarité',
            description: `Paiement de ${student.name} ${student.surname} (${method}) - Crédit appliqué: ${credit} MAD`,
            date: date || new Date(),
        });
    }

    return payment;
};

export const getAllPayments = async () => {
    const payments = await prisma.payment.findMany({
        include: {
            student: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return payments;
};

export const getPaymentById = async (id: string) => {
    const payment = await prisma.payment.findUnique({
        where: { id },
        include: {
            student: true,
        },
    });

    if (!payment) {
        throw new Error('Payment not found');
    }

    return payment;
};

export const getPaymentAnalytics = async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    console.log('--- Payment Analytics Debug ---');
    console.log('Start Date:', startOfMonth);
    console.log('End Date:', endOfMonth);

    // Get total payments this month (amount minus credit applied)
    const paymentsThisMonth = await prisma.payment.findMany({
        where: {
            date: {
                gte: startOfMonth,
                lte: endOfMonth
            }
        },
        select: {
            amount: true,
            credit: true
        }
    });

    console.log('Payments this month:', paymentsThisMonth.length);
    paymentsThisMonth.forEach(p => console.log(`Payment: ${p.amount}, Credit: ${p.credit}`));

    const totalReceived = paymentsThisMonth.reduce((sum, payment) => sum + (payment.amount - payment.credit), 0);

    console.log('Total Received (after credits):', totalReceived);

    // Get transaction stats for this month
    const transactionStats = await getMonthlyTransactionStats();

    // Get teacher expenses
    const teacherExpenses = await calculateMonthlyTeacherExpenses();

    // Total expenses should simply be the tracked EXPENSE transactions
    // We should NOT add theoretical teacher expenses to the "Actual Cash Out"
    const totalExpenses = transactionStats.totalExpense;

    return {
        totalReceivedMonth: totalReceived,
        totalExpenses: totalExpenses,
        totalIncome: transactionStats.totalIncome,
        teacherExpenses: teacherExpenses.totalTeacherExpenses, // Keep this as "Projected" or "Liabilities"
        otherExpenses: transactionStats.totalExpense
    };
};
