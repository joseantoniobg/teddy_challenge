import { MigrationInterface, QueryRunner } from "typeorm";

export class Clients1739390886816 implements MigrationInterface {
    name = 'Clients1739390886816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document" character varying(14) NOT NULL, "name" character varying(50) NOT NULL, "wage" numeric(10,2) NOT NULL, "company_evaluation" numeric(13,2) NOT NULL, "is_selected" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"));
                                 INSERT INTO clients (document, name, wage, company_evaluation, is_selected, created_at, updated_at) VALUES ('66627712016', 'José', 1000.00, 10000.00, false, now(), now());
                                 INSERT INTO clients (document, name, wage, company_evaluation, is_selected, created_at, updated_at) VALUES ('43645758000190', 'Supermercado VR Ltda', 0.00, 20000.00, false, now(), now());
                                 INSERT INTO clients (document, name, wage, company_evaluation, is_selected, created_at, updated_at) VALUES ('88029627076', 'Maurício', 3000.00, 30000.00, false, now(), now());
                                 INSERT INTO clients (document, name, wage, company_evaluation, is_selected, created_at, updated_at) VALUES ('97448989000132', 'Volta e Meia ME', 0.00, 40000.00, false, now(), now());
                                 INSERT INTO clients (document, name, wage, company_evaluation, is_selected, created_at, updated_at) VALUES ('79802729000', 'Miguel', 5000.00, 50000.00, true, now(), now());
                                 INSERT INTO clients (document, name, wage, company_evaluation, is_selected, created_at, updated_at) VALUES ('80673653005', 'Júlia', 6000.00, 60000.00, true, now(), now());`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
