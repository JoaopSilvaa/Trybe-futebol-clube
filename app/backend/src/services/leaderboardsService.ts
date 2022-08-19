import team from '../database/models/team';
import ITeam from './ITeam';
import ILeaderBoard from './ILeaderboard';
import { games, gamesAway, gamesHome } from './games';
import { victories, victoriesAway, victoriesHome } from './victories';
import { draws, drawsAway, drawsHome } from './draws';
import { losses, lossesAway, lossesHome } from './losses';
import {
  favorGoals,
  favorGoalsAway,
  favorGoalsHome,
  ownGoals,
  ownGoalsAway,
  ownGoalsHome,
} from './valuesGoals';

const transformLeaderBoardAll = async (time: ITeam) => {
  const totalGames = await games(time);
  const totalVictories = await victories(time);
  const totalDraws = await draws(time);
  const totalLosses = await losses(time);
  const goalsFavor = await favorGoals(time);
  const goalsOwn = await ownGoals(time);
  const totalPoints = (totalVictories * 3) + totalDraws;
  return { name: time.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
  };
};

const transformLeaderBoardHome = async (time: ITeam) => {
  const totalGames = await gamesHome(time);
  const totalVictories = await victoriesHome(time);
  const totalDraws = await drawsHome(time);
  const totalLosses = await lossesHome(time);
  const goalsFavor = await favorGoalsHome(time);
  const goalsOwn = await ownGoalsHome(time);
  const totalPoints = (totalVictories * 3) + totalDraws;
  return { name: time.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
  };
};

const transformLeaderBoardAway = async (time: ITeam) => {
  const totalGames = await gamesAway(time);
  const totalVictories = await victoriesAway(time);
  const totalDraws = await drawsAway(time);
  const totalLosses = await lossesAway(time);
  const goalsFavor = await favorGoalsAway(time);
  const goalsOwn = await ownGoalsAway(time);
  const totalPoints = (totalVictories * 3) + totalDraws;
  return { name: time.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
  };
};

const sortTimes = (times: ILeaderBoard[]) => {
  const leaderboard = times
    .sort((timeA: ILeaderBoard, timeB: ILeaderBoard) => timeA.goalsOwn - timeB.goalsOwn)
    .sort((timeA: ILeaderBoard, timeB: ILeaderBoard) => timeB.goalsFavor - timeA.goalsFavor)
    .sort((timeA: ILeaderBoard, timeB: ILeaderBoard) => timeB.goalsBalance - timeA.goalsBalance)
    .sort((timeA: ILeaderBoard, timeB: ILeaderBoard) => timeB.totalPoints - timeA.totalPoints);
  return leaderboard;
};

export default class LeaderboardService {
  listAll = async (): Promise<ILeaderBoard[]> => {
    const teams = await team.findAll();
    const newTeams = Promise.all(teams.map(async (time: ITeam) => transformLeaderBoardAll(time)));
    const leaderboard = sortTimes(await newTeams);
    return leaderboard;
  };

  listHome = async (): Promise<ILeaderBoard[]> => {
    const teams = await team.findAll();
    const newTeams = Promise.all(teams.map(async (time: ITeam) => transformLeaderBoardHome(time)));
    const leaderboard = sortTimes(await newTeams);
    return leaderboard;
  };

  listAway = async (): Promise<ILeaderBoard[]> => {
    const teams = await team.findAll();
    const newTeams = Promise.all(teams.map(async (time: ITeam) => transformLeaderBoardAway(time)));
    const leaderboard = sortTimes(await newTeams);
    return leaderboard;
  };
}
