import * as Router from 'express';
import LeaderboardController from '../controllers/leaderboardsController';
import LeaderboardService from '../services/leaderboardsService';

const router = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/leaderboard/home', leaderboardController.listHome);
router.get('/leaderboard/away', leaderboardController.listAway);
router.get('/leaderboard/', leaderboardController.listAll);

export default router;
