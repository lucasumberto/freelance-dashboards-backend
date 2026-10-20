import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Não sobrescreve dados existentes
  const existingProjects = await prisma.project.count();
  if (existingProjects > 0) {
    console.log('Banco já possui dados, seed ignorado.');
    return;
  }

  const project = await prisma.project.create({
    data: {
      name: 'Website E-commerce',
      client: 'Tech Solutions Ltd',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      budget: 50000,
      actualCost: 32500,
      progress: 65,
      description: 'Desenvolvimento completo de plataforma e-commerce com integração de pagamentos e gestão de inventário.',
    }
  });

  await prisma.transaction.createMany({
    data: [
      { type: 'income', amount: 5000, description: 'Pagamento parcial - Website E-commerce', date: '2024-06-15', category: 'Projeto', projectId: project.id },
      { type: 'expense', amount: 1200, description: 'Servidor AWS', date: '2024-06-10', category: 'Infraestrutura' },
      { type: 'income', amount: 3000, description: 'Consultoria UX', date: '2024-06-05', category: 'Consultoria' },
      { type: 'expense', amount: 450, description: 'Licenças de software', date: '2024-06-01', category: 'Software' },
      { type: 'income', amount: 7500, description: 'Pagamento final - Website E-commerce', date: '2024-05-28', category: 'Projeto', projectId: project.id },
    ]
  });

  await prisma.revenue.createMany({
    data: [
      { month: 'Jan', year: 2024, monthNumber: 1, amount: 15000, projected: 12000 },
      { month: 'Fev', year: 2024, monthNumber: 2, amount: 18000, projected: 15000 },
      { month: 'Mar', year: 2024, monthNumber: 3, amount: 22000, projected: 20000 },
      { month: 'Abr', year: 2024, monthNumber: 4, amount: 19500, projected: 18000 },
      { month: 'Mai', year: 2024, monthNumber: 5, amount: 25000, projected: 22000 },
      { month: 'Jun', year: 2024, monthNumber: 6, amount: 25500, projected: 25000 },
    ]
  });

  console.log('Seed concluído.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
