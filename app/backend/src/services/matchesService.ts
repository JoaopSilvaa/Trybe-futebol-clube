import match from '../database/models/match';
import team from '../database/models/team';
import IMatch from './IMatch';

export default class MatchService {
  listAll = async (): Promise<IMatch[]> => {
    const response = await match.findAll({
      include: [
        { model: team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return response;
  };

  listByTerm = async (term: any): Promise<IMatch[]> => {
    const key = Object.keys(term)[0];
    const value = Object.values(term)[0] !== 'false';
    const response = await match.findAll({
      where: { [key]: value },
      include: [
        { model: team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return response;
  };

  create = async (matches: IMatch): Promise<IMatch | null> => {
    const response = await match.create(matches);
    const dataId = response.getDataValue('id');
    const game = match.findByPk(dataId);
    if (!game) return null;
    return game;
  };

  finished = async (id: number): Promise<void> => {
    await match.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  update = async (id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> => {
    await match.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
  };
}
