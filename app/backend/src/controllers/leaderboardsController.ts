import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardsService';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  listHome = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.listHome();
    return res.status(200).json(leaderboard);
  };

  listAway = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.listAway();
    return res.status(200).json(leaderboard);
  };

  listAll = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.listAll();
    return res.status(200).json(leaderboard);
  };
}
