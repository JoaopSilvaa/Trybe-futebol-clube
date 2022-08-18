import { NextFunction, Request, Response } from 'express';
import team from '../database/models/team';

async function validationMatches(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(401).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  const verifyHomeTeam = await team.findByPk(homeTeam);
  const verifyAwayTeam = await team.findByPk(awayTeam);

  if (!verifyHomeTeam || !verifyAwayTeam) {
    return res.status(404).json(
      { message: 'There is no team with such id!' },
    );
  }
  next();
}

export default validationMatches;
