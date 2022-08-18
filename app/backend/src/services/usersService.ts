import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import user from '../database/models/user';
import IUser from './IUser';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const doToken = (response: IUser): string => {
  const { email } = response;
  const token = jwt.sign(
    { data: email },
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
  login = async (email: string, password: string): Promise<string | null> => {
    const response = await user.findOne({ where: { email } });
    if (!response) return null;
    const result = bcrypt.compareSync(password, response.password);
    if (!result) return null;
    const token = doToken(response);
    return token;
  };

  validate = async (token: string): Promise<string | null> => {
    const { data } = decriptToken(token);
    if (!data) return null;
    const response = await user.findOne({ where: { email: data } });
    if (!response) return null;
    const { role } = response;
    return role;
  };
}
