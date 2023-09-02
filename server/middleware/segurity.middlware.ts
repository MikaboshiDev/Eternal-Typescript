import { NextFunction, Request, Response } from 'express';

const checkSegurity = (req: Request, res: Response, next: NextFunction) => {
     const header = req.headers;
     const userAuth = header['user-agent'];
     const user = req.params.user;
     if (user !== "Horus") return "RUT_REDIRECT_INVALID"
};

export { checkSegurity };
