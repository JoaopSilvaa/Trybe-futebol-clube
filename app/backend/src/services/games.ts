import match from '../database/models/match';
import ITeam from './ITeam';

const gamesHome = async (time: ITeam): Promise <number> => {
  const { id } = time;
  const quantityHome = await match.findAndCountAll({
    where: { homeTeam: id, inProgress: false },
  });
  return quantityHome.count;
};

const gamesAway = async (time: ITeam): Promise <number> => {
  const { id } = time;
  const quantityAway = await match.findAndCountAll({
    where: { awayTeam: id, inProgress: false },
  });
  return quantityAway.count;
};

const games = async (time: ITeam): Promise<number> => {
  const quantityHome = await gamesHome(time);
  const quantityAway = await gamesAway(time);
  return quantityHome + quantityAway;
};

export { gamesHome, gamesAway, games };
