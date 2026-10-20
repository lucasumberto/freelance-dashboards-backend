import { Request, Response } from 'express';
import { DashboardStats } from '../types/dashboard';
import prisma from '../config/prisma';

// Chave "YYYY-MM" usada para comparar com as datas das transações ("YYYY-MM-DD").
// Comparar o texto evita o new Date('YYYY-MM-DD'), que é interpretado em UTC
// e desloca o dia 1º para o mês anterior em fusos negativos (ex.: UTC-3).
const toMonthKey = (year: number, month: number): string =>
  `${year}-${String(month + 1).padStart(2, '0')}`;

const sumByType = async (monthKey: string, type: 'income' | 'expense'): Promise<number> => {
  const result = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type, date: { startsWith: monthKey } }
  });
  return result._sum.amount ?? 0;
};

const calculatePercentageChange = (current: number, previous: number): string => {
  if (previous === 0) return current > 0 ? '+100%' : '0%';
  // Math.abs mantém o sinal correto quando o valor anterior é negativo (prejuízo)
  const change = ((current - previous) / Math.abs(previous)) * 100;
  return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
};

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Mês anterior
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthKey = toMonthKey(currentYear, currentMonth);
  const lastMonthKey = toMonthKey(lastMonthYear, lastMonth);

  const [currentMonthIncome, currentMonthExpenses, lastMonthIncome, lastMonthExpenses] = await Promise.all([
    sumByType(currentMonthKey, 'income'),
    sumByType(currentMonthKey, 'expense'),
    sumByType(lastMonthKey, 'income'),
    sumByType(lastMonthKey, 'expense'),
  ]);

  const currentMonthProfit = currentMonthIncome - currentMonthExpenses;
  const lastMonthProfit = lastMonthIncome - lastMonthExpenses;

  // Clientes e projetos criados no último mês (intervalo no horário local do servidor)
  const lastMonthRange = {
    gte: new Date(lastMonthYear, lastMonth, 1),
    lt: new Date(currentYear, currentMonth, 1),
  };

  const [lastMonthClients, lastMonthProjects] = await Promise.all([
    prisma.client.count({ where: { createdAt: lastMonthRange } }),
    prisma.project.count({ where: { createdAt: lastMonthRange } }),
  ]);

  const stats: DashboardStats = {
    revenueChange: calculatePercentageChange(currentMonthIncome, lastMonthIncome),
    projectsChange: `+${lastMonthProjects}`,
    clientsChange: `+${lastMonthClients}`,
    profitChange: calculatePercentageChange(currentMonthProfit, lastMonthProfit),
  };

  res.json(stats);
};
