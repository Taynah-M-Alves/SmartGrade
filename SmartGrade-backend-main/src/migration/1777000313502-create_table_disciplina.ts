import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableDisciplina1777000313502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE public."disciplina" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar NOT NULL,
    "professor_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "FK_professor_user"
      FOREIGN KEY ("professor_id")
      REFERENCES public."user"(id)
      ON DELETE CASCADE
)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE public.disciplina`);
    }

}