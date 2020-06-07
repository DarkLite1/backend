import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1591515767359 implements MigrationInterface {
    name = 'MigrationName1591515767359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" ADD "duration" int NOT NULL CONSTRAINT "DF_91b425d41dbcd3d36881e0519aa" DEFAULT 60`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "DF_91b425d41dbcd3d36881e0519aa"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "duration"`);
    }

}
