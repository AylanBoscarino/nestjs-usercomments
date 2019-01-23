import { ObjectID } from 'typeorm';

export interface JwtPayload {
    id: ObjectID;
    email: string;
    nome: string;
}
