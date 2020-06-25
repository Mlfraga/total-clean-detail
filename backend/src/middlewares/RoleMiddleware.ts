import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

import { User } from '../../prisma/Studio/-Projetos-TotalCleanDetail-backend';

import * as dotenv from "dotenv";
import { decode } from 'querystring';

dotenv.config();

class RoleMiddleware {

    async isAdmin(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        const decoded: any = JWT.decode(String(token), { complete: true });

        const role = decoded.payload.user.role;

        if (role !== "ADMIN") {
            return response
                .status(403)
                .json({ error: "User does not have admin permission." })
        }

        next();
    }

    async isManager(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        const decoded: any = JWT.decode(String(token), { complete: true });

        const role = decoded.payload.user.role;

        if (role !== "MANAGER") {
            return response
                .status(403)
                .json({ error: "User does not have manager permission." })
        }

        next();
    }

    async isManagerOrAdmin(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        const decoded: any = JWT.decode(String(token), { complete: true });

        const role = decoded.payload.user.role;

        if (role !== "MANAGER" && role !== "ADMIN") {
            return response
                .status(403)
                .json({ error: "User does not have manager or admin permission." })
        }

        next();
    }

    async isManagerOrSeller(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        const decoded: any = JWT.decode(String(token), { complete: true });

        const role = decoded.payload.user.role;

        if (role !== "MANAGER" && role !== "SELLER") {
            return response
                .status(403)
                .json({ error: "User does not have manager or seller permission." })
        }

        next();
    }



}

export default new RoleMiddleware();