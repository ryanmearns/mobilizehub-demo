import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" RENAME COLUMN "meta_title" TO "title";
  ALTER TABLE "pages" RENAME COLUMN "meta_description" TO "description";
  ALTER TABLE "pages" RENAME COLUMN "meta_image_id" TO "image_id";
  ALTER TABLE "forms" RENAME COLUMN "meta_title" TO "title";
  ALTER TABLE "forms" RENAME COLUMN "meta_description" TO "description";
  ALTER TABLE "forms" RENAME COLUMN "meta_image_id" TO "image_id";
  ALTER TABLE "petitions" RENAME COLUMN "meta_title" TO "title";
  ALTER TABLE "petitions" RENAME COLUMN "meta_description" TO "description";
  ALTER TABLE "petitions" RENAME COLUMN "meta_image_id" TO "image_id";
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "forms" DROP CONSTRAINT "forms_meta_image_id_media_id_fk";
  
  ALTER TABLE "petitions" DROP CONSTRAINT "petitions_meta_image_id_media_id_fk";
  
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "forms_meta_meta_image_idx";
  DROP INDEX "petitions_meta_meta_image_idx";
  ALTER TABLE "pages" ADD CONSTRAINT "pages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms" ADD CONSTRAINT "forms_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "petitions" ADD CONSTRAINT "petitions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_image_idx" ON "pages" USING btree ("image_id");
  CREATE INDEX "forms_image_idx" ON "forms" USING btree ("image_id");
  CREATE INDEX "petitions_image_idx" ON "petitions" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" RENAME COLUMN "title" TO "meta_title";
  ALTER TABLE "pages" RENAME COLUMN "description" TO "meta_description";
  ALTER TABLE "pages" RENAME COLUMN "image_id" TO "meta_image_id";
  ALTER TABLE "forms" RENAME COLUMN "title" TO "meta_title";
  ALTER TABLE "forms" RENAME COLUMN "description" TO "meta_description";
  ALTER TABLE "forms" RENAME COLUMN "image_id" TO "meta_image_id";
  ALTER TABLE "petitions" RENAME COLUMN "title" TO "meta_title";
  ALTER TABLE "petitions" RENAME COLUMN "description" TO "meta_description";
  ALTER TABLE "petitions" RENAME COLUMN "image_id" TO "meta_image_id";
  ALTER TABLE "pages" DROP CONSTRAINT "pages_image_id_media_id_fk";
  
  ALTER TABLE "forms" DROP CONSTRAINT "forms_image_id_media_id_fk";
  
  ALTER TABLE "petitions" DROP CONSTRAINT "petitions_image_id_media_id_fk";
  
  DROP INDEX "pages_image_idx";
  DROP INDEX "forms_image_idx";
  DROP INDEX "petitions_image_idx";
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms" ADD CONSTRAINT "forms_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "petitions" ADD CONSTRAINT "petitions_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "forms_meta_meta_image_idx" ON "forms" USING btree ("meta_image_id");
  CREATE INDEX "petitions_meta_meta_image_idx" ON "petitions" USING btree ("meta_image_id");`)
}
