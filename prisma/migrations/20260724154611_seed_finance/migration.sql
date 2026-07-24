-- SeedTransaction
INSERT INTO "Transaction" ("type", "amount", "description", "date", "category", "projectId", "createdAt", "updatedAt")
VALUES 
  ('income', 5000.00, 'Pagamento parcial - Website E-commerce', '2024-06-15', 'Projeto', 1, '2024-06-15 10:00:00', '2024-06-15 10:00:00'),
  ('expense', 1200.00, 'Servidor AWS', '2024-06-10', 'Infraestrutura', NULL, '2024-06-10 10:00:00', '2024-06-10 10:00:00'),
  ('income', 3000.00, 'Consultoria UX', '2024-06-05', 'Consultoria', NULL, '2024-06-05 10:00:00', '2024-06-05 10:00:00'),
  ('expense', 450.00, 'Licenças de software', '2024-06-01', 'Software', NULL, '2024-06-01 10:00:00', '2024-06-01 10:00:00'),
  ('income', 7500.00, 'Pagamento final - Website E-commerce', '2024-05-28', 'Projeto', 1, '2024-05-28 10:00:00', '2024-05-28 10:00:00');

-- SeedRevenue
INSERT INTO "Revenue" ("month", "amount", "projected", "createdAt", "updatedAt")
VALUES 
  ('Jan', 15000.00, 12000.00, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
  ('Fev', 18000.00, 15000.00, '2024-02-01 00:00:00', '2024-02-01 00:00:00'),
  ('Mar', 22000.00, 20000.00, '2024-03-01 00:00:00', '2024-03-01 00:00:00'),
  ('Abr', 19500.00, 18000.00, '2024-04-01 00:00:00', '2024-04-01 00:00:00'),
  ('Mai', 25000.00, 22000.00, '2024-05-01 00:00:00', '2024-05-01 00:00:00'),
  ('Jun', 25500.00, 25000.00, '2024-06-01 00:00:00', '2024-06-01 00:00:00');
