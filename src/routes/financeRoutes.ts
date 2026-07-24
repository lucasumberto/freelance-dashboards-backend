import { Router } from 'express';
import { getFinancialSummary, getTransactions, getRevenue } from '../controllers/financeController';

const router = Router();

router.get('/summary', getFinancialSummary);
router.get('/transactions', getTransactions);
router.get('/revenue', getRevenue);

export default router;
