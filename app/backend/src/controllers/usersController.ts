import { Request, Response } from 'express';
import UserService from '../services/usersService';

export default class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.userService.login(username, password);
    if (!token) return res.status(404).json({ message: 'foi triste' });
    return res.status(200).json({ token });
  };
}
