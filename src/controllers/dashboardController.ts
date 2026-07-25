import { Request, Response } from 'express';
import { DashboardStats } from '../types/dashboard';
import prisma from '../config/prisma';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Mês anterior
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  // Helper para verificar se uma data está em um mês específico
  const isInMonth = (dateString: string, month: number, year: number) => {
    const date = new Date(dateString);
    return date.getMonth() === month && date.getFullYear() === year;
  };

  // Buscar todas as transações
  const transactions = await prisma.transaction.findMany();
  
  // Calcular receitas do mês atual e anterior
  const currentMonthRevenue = transactions
    .filter(t => t.type === 'income' && isInMonth(t.date, currentMonth, currentYear))
    .reduce((sum, t) => sum + t.amount, 0);
  
  const lastMonthRevenue = transactions
    .filter(t => t.type === 'income' && isInMonth(t.date, lastMonth, lastMonthYear))
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcular lucro do mês atual e anterior (receitas - despesas)
  const currentMonthIncome = transactions
    .filter(t => t.type === 'income' && isInMonth(t.date, currentMonth, currentYear))
    .reduce((sum, t) => sum + t.amount, 0);
  
  const currentMonthExpenses = transactions
    .filter(t => t.type === 'expense' && isInMonth(t.date, currentMonth, currentYear))
    .reduce((sum, t) => sum + t.amount, 0);
  
  const currentMonthProfit = currentMonthIncome - currentMonthExpenses;

  const lastMonthIncome = transactions
    .filter(t => t.type === 'income' && isInMonth(t.date, lastMonth, lastMonthYear))
    .reduce((sum, t) => sum + t.amount, 0);
  
  const lastMonthExpenses = transactions
    .filter(t => t.type === 'expense' && isInMonth(t.date, lastMonth, lastMonthYear))
    .reduce((sum, t) => sum + t.amount, 0);
  
  const lastMonthProfit = lastMonthIncome - lastMonthExpenses;

  // Buscar clientes criados no último mês
  const clients = await prisma.client.findMany();
  const lastMonthClients = clients.filter(c => isInMonth(c.createdAt.toISOString(), lastMonth, lastMonthYear)).length;

  // Buscar projetos criados no último mês
  const projects = await prisma.project.findMany();
  const lastMonthProjects = projects.filter(p => isInMonth(p.createdAt.toISOString(), lastMonth, lastMonthYear)).length;

  // Calcular porcentagens de mudança
  const calculatePercentageChange = (current: number, previous: number): string => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  const stats: DashboardStats = {
    revenueChange: calculatePercentageChange(currentMonthRevenue, lastMonthRevenue),
    projectsChange: `+${lastMonthProjects}`,
    clientsChange: `+${lastMonthClients}`,
    profitChange: calculatePercentageChange(currentMonthProfit, lastMonthProfit),
  };

  res.json(stats);
};
