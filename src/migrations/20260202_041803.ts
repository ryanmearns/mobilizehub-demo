import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "forms" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "forms" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "forms" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "petitions" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "petitions" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "petitions" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms" ADD CONSTRAINT "forms_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "petitions" ADD CONSTRAINT "petitions_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "forms_meta_meta_image_idx" ON "forms" USING btree ("meta_image_id");
  CREATE INDEX "petitions_meta_meta_image_idx" ON "petitions" USING btree ("meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "forms" DROP CONSTRAINT "forms_meta_image_id_media_id_fk";
  
  ALTER TABLE "petitions" DROP CONSTRAINT "petitions_meta_image_id_media_id_fk";
  
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "forms_meta_meta_image_idx";
  DROP INDEX "petitions_meta_meta_image_idx";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "forms" DROP COLUMN "meta_title";
  ALTER TABLE "forms" DROP COLUMN "meta_description";
  ALTER TABLE "forms" DROP COLUMN "meta_image_id";
  ALTER TABLE "petitions" DROP COLUMN "meta_title";
  ALTER TABLE "petitions" DROP COLUMN "meta_description";
  ALTER TABLE "petitions" DROP COLUMN "meta_image_id";`)
}
