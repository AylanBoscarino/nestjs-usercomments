import { Entity, Column, ObjectID, ObjectIdColumn, Index} from 'typeorm';

@Entity('users')
export class User {
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
