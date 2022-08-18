import * as Router from 'express';
import validationToken from '../middlewares/validationTokenMiddleware';
import MatchController from '../controllers/matchesController';
import MatchService from '../services/matchesService';
import validationMatches from '../middlewares/validationMatches';

const router = Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

router.get('/matches', matchController.list);
router.post('/matches', validationToken, validationMatches, matchController.create);
router.patch('/matches/:id/finish', matchController.finished);
router.patch('/matches/:id', matchController.update);

export default router;
