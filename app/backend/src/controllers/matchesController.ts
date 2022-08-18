import { Request, Response } from 'express';
import MatchService from '../services/matchesService';

export default class MatchController {
  constructor(private matchService: MatchService) {}

  list = async (req: Request, res: Response) => {
    const term = req.query;
    if (Object.keys(term).length === 0) {
      const matches = await this.matchService.listAll();
      return res.status(200).json(matches);
    }
    const matches = await this.matchService.listByTerm(term);
    return res.status(200).json(matches);
  };

  create = async (req: Request, res: Response) => {
    const matches = req.body;
    const game = await this.matchService.create(matches);
    return res.status(201).json(game);
  };

  finished = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.finished(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.update(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'GOOOOOOOOL' });
  };
}
