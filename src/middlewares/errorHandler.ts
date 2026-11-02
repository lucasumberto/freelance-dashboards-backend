import { ErrorRequestHandler, RequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

// Prisma lança P2025 quando update/delete não encontra o registro
export const isRecordNotFound = (error: unknown): boolean =>
  error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025';

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Dados inválidos',
      details: err.issues.map(issue => ({ field: issue.path.join('.'), message: issue.message })),
    });
    return;
  }

  // JSON malformado no body (lançado pelo express.json)
  if (err?.type === 'entity.parse.failed') {
    res.status(400).json({ error: 'JSON inválido' });
    return;
  }

  if (isRecordNotFound(err)) {
    res.status(404).json({ error: 'Registro não encontrado' });
    return;
  }

  // Detalhes só no log do servidor, nunca na resposta
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
};
