import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

export default class TeamController {
  constructor(private teamService: TeamService) {}

  listAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.listAll();
    return res.status(200).json(teams);
  };

  listById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.listById(Number(id));
    return res.status(200).json(team);
  };
}
