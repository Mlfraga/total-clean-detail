import { Request, Response, NextFunction } from 'express';

class HeaderMiddleware {
    async Header(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            console.log('passou');
            return response
                .status(400)
                .json({ error: "The authorization header was not passed." })
        }
        next();
    }
}
export default new HeaderMiddleware();
