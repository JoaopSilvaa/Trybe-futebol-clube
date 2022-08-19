import match from '../database/models/match';
import ITeam from './ITeam';
import IMatch from './IMatch';

const valueGoalsHome = (home: IMatch[]):number => {
  const value = home.reduce((total: number, game: IMatch): number => {
    if (game.homeTeamGoals !== 0) {
      const acc = total + game.homeTeamGoals;
      return acc;
    }
    return total;
  }, 0);
  return value;
};

const valueGoalsAway = (away: IMatch[]): number => {
  const value = away.reduce((total: number, game: IMatch) => {
    if (game.awayTeamGoals !== 0) {
      const acc = total + game.awayTeamGoals;
      return acc;
    }
    return total;
  }, 0);
  return value;
};

const favorGoalsHome = async (time: ITeam): Promise<number> => {
  const { id } = time;
  const home = await match.findAll({ where: { homeTeam: id, inProgress: false } });
  const quantityHome = valueGoalsHome(home);
  return quantityHome;
};

const favorGoalsAway = async (time: ITeam): Promise<number> => {
  const { id } = time;
  const away = await match.findAll({ where: { awayTeam: id, inProgress: false } });
  const quantityAway = valueGoalsAway(away);
  return quantityAway;
};

const favorGoals = async (time: ITeam): Promise<number> => {
  const quantityHome = await favorGoalsHome(time);
  const quantityAway = await favorGoalsAway(time);
  return quantityHome + quantityAway;
};

const ownGoalsHome = async (time: ITeam): Promise<number> => {
  const { id } = time;
  const home = await match.findAll({ where: { homeTeam: id, inProgress: false } });
  const quantityHome = valueGoalsAway(home);
  return quantityHome;
};

const ownGoalsAway = async (time: ITeam): Promise<number> => {
  const { id } = time;
  const away = await match.findAll({ where: { awayTeam: id, inProgress: false } });
  const quantityAway = valueGoalsHome(away);
  return quantityAway;
};

const ownGoals = async (time: ITeam): Promise<number> => {
  const quantityHome = await ownGoalsHome(time);
  const quantityAway = await ownGoalsAway(time);
  return quantityHome + quantityAway;
};

export { favorGoalsHome, favorGoalsAway, favorGoals, ownGoalsHome, ownGoalsAway, ownGoals };
