import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFiles1650155490013 implements MigrationInterface {
  name = 'createFiles1650155490013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "files_type_enum" AS ENUM('file', 'folder')`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying(255) NOT NULL, "absolute_path" character varying NOT NULL, "type" "files_type_enum" NOT NULL DEFAULT 'file', "parentId" uuid, CONSTRAINT "UQ_36e9953f7cc6cbad7ac2df18336" UNIQUE ("absolute_path"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_b104781b63037f6404e1b69280d" FOREIGN KEY ("parentId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `insert into files values ('b5018e03-707c-4575-b438-9abf3d462c2d', '/', '/', 'folder');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_b104781b63037f6404e1b69280d"`,
    );
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TYPE "files_type_enum"`);
  }
}
