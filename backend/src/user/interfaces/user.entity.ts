import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";

type typeUser = "aluno" | "professor"

@Entity({name: 'user'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;
    
    @Column({name: 'email', nullable: false, unique: true})
    email: string;

    @Column({name: 'cpf', nullable: false, unique: true})
    cpf: string;

    @Column({name: 'password', nullable: false})
    password: string;

    @Column({name: 'phone', nullable: true})
    phone: string;

    @Column({name: 'type', nullable: false})
    type:  typeUser;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at'}) 
    updated_at: Date;
}