import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import user from '../database/models/user';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const message = 'Token must be a valid token';

const decriptToken = (token: string): undefined | any => {
  try {
    const decode = jwt.verify(token, secret);
    return decode;
  } catch (err) {
    return {};
  }
};

async function validationToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message });
  const { data } = decriptToken(token);
  if (!data) return res.status(401).json({ message });
  const response = await user.findOne({ where: { email: data } });
  if (!response) return res.status(401).json({ message });
  next();
}

export default validationToken;
