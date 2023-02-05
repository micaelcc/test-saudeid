import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductAndRelationsTables1675444295788
  implements MigrationInterface
{
  name = 'CreateProductAndRelationsTables1675444295788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT null, "name" character varying NOT NULL, "unitPrice" double precision NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_products" ("ordersId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_02c19b9245f83bd8862e16e0247" PRIMARY KEY ("ordersId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3c896321873d00008a0590bf46" ON "orders_products" ("ordersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c5da576f0342e179fd678c9427" ON "orders_products" ("productsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "deletedAt" SET DEFAULT null`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD CONSTRAINT "FK_3c896321873d00008a0590bf46b" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD CONSTRAINT "FK_c5da576f0342e179fd678c94276" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP CONSTRAINT "FK_c5da576f0342e179fd678c94276"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP CONSTRAINT "FK_3c896321873d00008a0590bf46b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c5da576f0342e179fd678c9427"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3c896321873d00008a0590bf46"`,
    );
    await queryRunner.query(`DROP TABLE "orders_products"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
