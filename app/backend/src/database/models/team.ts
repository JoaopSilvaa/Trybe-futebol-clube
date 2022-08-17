import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class team extends Model {
  public id!: number;
  public teamName!: string;
}

team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default team;
