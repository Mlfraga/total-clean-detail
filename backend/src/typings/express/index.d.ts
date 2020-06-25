import UserRepository from '../../repositories/UserRepositry';
import { User } from '../../../prisma/Studio/-Projetos-TotalCleanDetail-backend';

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}