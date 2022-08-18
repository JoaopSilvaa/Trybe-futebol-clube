import team from '../database/models/team';
import ITeam from './ITeam';

export default class TeamService {
  listAll = async (): Promise<ITeam[]> => {
    const response = await team.findAll();
    return response;
  };

  listById = async (id: number): Promise<ITeam | null> => {
    const response = await team.findByPk(id);
    if (!response) return null;
    return response;
  };
}
