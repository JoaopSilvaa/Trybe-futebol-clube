import { NextFunction, Request, Response } from 'express';

function validationLogin(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'All fields must be filled' });
  next();
}

export default validationLogin;
