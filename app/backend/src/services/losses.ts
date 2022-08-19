import match from '../database/models/match';
import ITeam from './ITeam';
import IMatch from './IMatch';

const lossesHome = async (time: ITeam): Promise<number> => {
  const { id } = time;
  const home = await match.findAll({
    where: { homeTeam: id, inProgress: false },
  });
  const quantityHome = home.filter((game: IMatch): IMatch | null => {
    const victory = game.homeTeamGoals < game.awayTeamGoals ? game : null;
    return victory;
  });
  return quantityHome.length;
};

const lossesAway = async (time: ITeam): Promise<number> => {
  const { id } = time;
  const away = await match.findAll({
    where: { awayTeam: id, inProgress: false },
  });
  const quantityAway = away.filter((game: IMatch): IMatch | null => {
    const victory = game.awayTeamGoals < game.homeTeamGoals ? game : null;
    return victory;
  });
  return quantityAway.length;
};

const losses = async (time: ITeam): Promise<number> => {
  const quantityHome = await lossesHome(time);
  const quantityAway = await lossesAway(time);
  return quantityHome + quantityAway;
};

export { lossesHome, lossesAway, losses };
