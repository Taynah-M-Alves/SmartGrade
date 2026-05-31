import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1776917204323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE public."user" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar NOT NULL,
    "email" varchar NOT NULL UNIQUE,
    "cpf" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    "phone" varchar,
    "type" varchar NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now()
)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE public.user`);
    }

}
