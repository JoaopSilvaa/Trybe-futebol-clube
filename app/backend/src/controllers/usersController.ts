import { Request, Response } from 'express';
import UserService from '../services/usersService';

export default class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.userService.login(username, password);
    if (!token) return res.status(401).json({ message: 'Incorrect email or password' });
    return res.status(200).json({ token });
  };

  validate = (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const role = this.userService.validate(token);
    return res.status(200).json({ role });
  };
}
