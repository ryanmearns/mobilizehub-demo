import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_grid_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_logos_logos_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_settings_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_settings_nav_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_settings_nav_buttons_style" AS ENUM('default', 'secondary', 'outline', 'link', 'ghost');
  CREATE TYPE "public"."enum_settings_footer_items_link_type" AS ENUM('reference', 'custom');
  ALTER TYPE "public"."enum_pages_blocks_hero_buttons_style" ADD VALUE 'ghost';
  ALTER TYPE "public"."enum_pages_blocks_cta_buttons_style" ADD VALUE 'ghost';
  CREATE TABLE "pages_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"link_type" "enum_pages_blocks_grid_items_link_type" DEFAULT 'reference',
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logos_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer NOT NULL,
  	"link_type" "enum_pages_blocks_logos_logos_link_type" DEFAULT 'reference',
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "settings_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_settings_nav_items_link_type" DEFAULT 'reference',
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "settings_nav_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_settings_nav_buttons_link_type" DEFAULT 'reference',
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"style" "enum_settings_nav_buttons_style" DEFAULT 'default' NOT NULL
  );
  
  CREATE TABLE "settings_footer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_settings_footer_items_link_type" DEFAULT 'reference',
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"forms_id" integer
  );
  
  ALTER TABLE "pages_blocks_team" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_grid_items" ADD CONSTRAINT "pages_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_items" ADD CONSTRAINT "pages_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid" ADD CONSTRAINT "pages_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logos_logos" ADD CONSTRAINT "pages_blocks_logos_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logos_logos" ADD CONSTRAINT "pages_blocks_logos_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logos" ADD CONSTRAINT "pages_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_nav_items" ADD CONSTRAINT "settings_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_nav_buttons" ADD CONSTRAINT "settings_nav_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_footer_items" ADD CONSTRAINT "settings_footer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_rels" ADD CONSTRAINT "settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_rels" ADD CONSTRAINT "settings_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_rels" ADD CONSTRAINT "settings_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_grid_items_order_idx" ON "pages_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_grid_items_parent_id_idx" ON "pages_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grid_items_image_idx" ON "pages_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_grid_order_idx" ON "pages_blocks_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_grid_parent_id_idx" ON "pages_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grid_path_idx" ON "pages_blocks_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_order_idx" ON "pages_blocks_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_parent_id_idx" ON "pages_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_path_idx" ON "pages_blocks_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_image_idx" ON "pages_blocks_image" USING btree ("image_id");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_logos_logos_order_idx" ON "pages_blocks_logos_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logos_logos_parent_id_idx" ON "pages_blocks_logos_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logos_logos_image_idx" ON "pages_blocks_logos_logos" USING btree ("image_id");
  CREATE INDEX "pages_blocks_logos_order_idx" ON "pages_blocks_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logos_parent_id_idx" ON "pages_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logos_path_idx" ON "pages_blocks_logos" USING btree ("_path");
  CREATE INDEX "settings_nav_items_order_idx" ON "settings_nav_items" USING btree ("_order");
  CREATE INDEX "settings_nav_items_parent_id_idx" ON "settings_nav_items" USING btree ("_parent_id");
  CREATE INDEX "settings_nav_buttons_order_idx" ON "settings_nav_buttons" USING btree ("_order");
  CREATE INDEX "settings_nav_buttons_parent_id_idx" ON "settings_nav_buttons" USING btree ("_parent_id");
  CREATE INDEX "settings_footer_items_order_idx" ON "settings_footer_items" USING btree ("_order");
  CREATE INDEX "settings_footer_items_parent_id_idx" ON "settings_footer_items" USING btree ("_parent_id");
  CREATE INDEX "settings_rels_order_idx" ON "settings_rels" USING btree ("order");
  CREATE INDEX "settings_rels_parent_idx" ON "settings_rels" USING btree ("parent_id");
  CREATE INDEX "settings_rels_path_idx" ON "settings_rels" USING btree ("path");
  CREATE INDEX "settings_rels_pages_id_idx" ON "settings_rels" USING btree ("pages_id");
  CREATE INDEX "settings_rels_forms_id_idx" ON "settings_rels" USING btree ("forms_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_grid_items" CASCADE;
  DROP TABLE "pages_blocks_grid" CASCADE;
  DROP TABLE "pages_blocks_image" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_logos_logos" CASCADE;
  DROP TABLE "pages_blocks_logos" CASCADE;
  DROP TABLE "settings_nav_items" CASCADE;
  DROP TABLE "settings_nav_buttons" CASCADE;
  DROP TABLE "settings_footer_items" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "settings_rels" CASCADE;
  ALTER TABLE "pages_blocks_hero_buttons" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_buttons" ALTER COLUMN "style" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_style";
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_style" AS ENUM('default', 'secondary', 'outline', 'link');
  ALTER TABLE "pages_blocks_hero_buttons" ALTER COLUMN "style" SET DEFAULT 'default'::"public"."enum_pages_blocks_hero_buttons_style";
  ALTER TABLE "pages_blocks_hero_buttons" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_hero_buttons_style" USING "style"::"public"."enum_pages_blocks_hero_buttons_style";
  ALTER TABLE "pages_blocks_cta_buttons" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_buttons" ALTER COLUMN "style" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_buttons_style";
  CREATE TYPE "public"."enum_pages_blocks_cta_buttons_style" AS ENUM('default', 'secondary', 'outline', 'link');
  ALTER TABLE "pages_blocks_cta_buttons" ALTER COLUMN "style" SET DEFAULT 'default'::"public"."enum_pages_blocks_cta_buttons_style";
  ALTER TABLE "pages_blocks_cta_buttons" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_cta_buttons_style" USING "style"::"public"."enum_pages_blocks_cta_buttons_style";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "headline";
  DROP TYPE "public"."enum_pages_blocks_grid_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_logos_logos_link_type";
  DROP TYPE "public"."enum_settings_nav_items_link_type";
  DROP TYPE "public"."enum_settings_nav_buttons_link_type";
  DROP TYPE "public"."enum_settings_nav_buttons_style";
  DROP TYPE "public"."enum_settings_footer_items_link_type";`)
}
