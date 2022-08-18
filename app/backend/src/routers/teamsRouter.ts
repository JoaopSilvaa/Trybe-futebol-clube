import * as Router from 'express';
import TeamController from '../controllers/teamsController';
import TeamService from '../services/teamsService';

const router = Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

router.get('/teams', teamController.listAll);
router.get('/teams/:id', teamController.listById);

export default router;
