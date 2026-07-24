import { Request, Response } from 'express';
import { FinancialSummary, Transaction, Revenue } from '../types/finance';
import prisma from '../config/prisma';

export const getFinancialSummary = async (req: Request, res: Response): Promise<void> => {
  const transactions = await prisma.transaction.findMany();
  const monthlyRevenue = await prisma.revenue.findMany({
    orderBy: { month: 'asc' }
  });

  const totalRevenue = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalRevenue - totalExpenses;
  const pendingPayments = transactions
    .filter(t => t.type === 'income' && t.description.toLowerCase().includes('pendente'))
    .reduce((sum, t) => sum + t.amount, 0);

  const summary: FinancialSummary = {
    totalRevenue,
    totalExpenses,
    netProfit,
    pendingPayments,
    monthlyRevenue: monthlyRevenue.map(r => ({
      month: r.month,
      amount: r.amount,
      projected: r.projected
    }))
  };

  res.json(summary);
};

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  });

  res.json(transactions);
};

export const getRevenue = async (req: Request, res: Response): Promise<void> => {
  const revenue = await prisma.revenue.findMany({
    orderBy: { month: 'asc' }
  });

  res.json(revenue.map(r => ({
    month: r.month,
    amount: r.amount,
    projected: r.projected
  })));
};
