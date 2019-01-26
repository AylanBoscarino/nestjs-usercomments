import { Entity, Column, ObjectID, ObjectIdColumn} from 'typeorm';

@Entity('comments')
export class Comment {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    autor: string;

    @Column()
    nomeAutor: string;

    @Column()
    corpo: string;

    @Column()
    dataCriacao: number;

    @Column({ default: true })
    ativo: boolean;

}
