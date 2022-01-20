import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProduct1641976687494 implements MigrationInterface {
    name = 'CreateProduct1641976687494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_6445f71e09c4942ed552e66d13d" UNIQUE ("image"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
