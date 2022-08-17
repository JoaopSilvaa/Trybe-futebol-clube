import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import user from '../database/models/user';
import IUser from './IUser';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const doToken = (response: IUser): string => {
  const { username, role, email } = response;
  const token = jwt.sign(
    { data: username, role, email },
    secret,
    { expiresIn: '7d', algorithm: 'HS256' },
  );
  return token;
};

const decriptToken = (token: string): undefined | any => {
  const decode = jwt.verify(token, secret);
  return decode;
};

export default class UserService {
  login = async (username: string, password: string): Promise<string | null> => {
    const response = await user.findOne({ where: { username } });
    if (!response) return null;
    const result = bcrypt.compareSync(password, response.password);
    if (!result) return null;
    const token = doToken(response);
    return token;
  };

  validate = (token: string): any => {
    const response = decriptToken(token);
    if (!response) return null;
    const { role } = response;
    return role;
  };
}
