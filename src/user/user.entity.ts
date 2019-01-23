import { Entity, Column, ObjectID, ObjectIdColumn, Index} from 'typeorm';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Entity('users')
export class User implements JwtPayload {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    nome: string;

    @Index({ unique: true })
    @Column()
    email: string;

    @Column()
    hash: string;

    @Column()
    salt: string;

    @Column({ default: false })
    admin: boolean;
}
