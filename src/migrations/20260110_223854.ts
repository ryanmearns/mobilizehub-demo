import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_style" AS ENUM('default', 'secondary', 'outline', 'link');
  CREATE TABLE "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_pages_blocks_hero_buttons_link_type" DEFAULT 'reference',
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"style" "enum_pages_blocks_hero_buttons_style" DEFAULT 'default' NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "subheadline" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_buttons" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_image_idx";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "subheadline";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "image_id";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "description";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_style";`)
}
