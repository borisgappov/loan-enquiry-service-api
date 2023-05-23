const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Initial1684829365090 {
    name = 'Initial1684829365090'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "loan_balance" ("id" BIGSERIAL NOT NULL, "default" boolean NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_3b84a1785723e9a48be059d487f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loan" ("id" bigint NOT NULL, "loanDate" TIMESTAMP(3) WITH TIME ZONE NOT NULL, "balanceId" bigint, "customerId" bigint, CONSTRAINT "REL_a541afef1a73064453d627fcea" UNIQUE ("balanceId"), CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" BIGSERIAL NOT NULL, "age" integer NOT NULL, "job" character varying NOT NULL, "marital" character varying NOT NULL, "education" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loan" ADD CONSTRAINT "FK_a541afef1a73064453d627fcea0" FOREIGN KEY ("balanceId") REFERENCES "loan_balance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan" ADD CONSTRAINT "FK_7a46a16cf738e03a3131035a9ad" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "loan" DROP CONSTRAINT "FK_7a46a16cf738e03a3131035a9ad"`);
        await queryRunner.query(`ALTER TABLE "loan" DROP CONSTRAINT "FK_a541afef1a73064453d627fcea0"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "loan"`);
        await queryRunner.query(`DROP TABLE "loan_balance"`);
    }
}
