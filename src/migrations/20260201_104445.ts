import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_petitions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_petitions_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_petitions_type" AS ENUM('reference', 'custom');
  CREATE TABLE "petition_signatures" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"petition_id" integer NOT NULL,
  	"contact_id" integer,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"data" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "petitions_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Email',
  	"required" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_email_opt_in" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Receive emails',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_first_name" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'First Name',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_last_name" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Last Name',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_mobile_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Mobile Number',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_mobile_opt_in" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Receive SMS',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_address" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Address',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_city" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'City',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'State',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_zip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Zip Code',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Country',
  	"required" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "petitions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_petitions_status" DEFAULT 'draft',
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"headline" varchar,
  	"content" jsonb,
  	"target" varchar,
  	"ask" varchar,
  	"goal" numeric,
  	"legend" varchar,
  	"submit_button_label" varchar DEFAULT 'Sign Petition',
  	"confirmation_type" "enum_petitions_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"type" "enum_petitions_type" DEFAULT 'reference',
  	"url" varchar,
  	"autoresponse_enabled" boolean DEFAULT false,
  	"autoresponse_from_name" varchar NOT NULL,
  	"autoresponse_from_address" varchar NOT NULL,
  	"autoresponse_reply_to" varchar,
  	"autoresponse_subject" varchar,
  	"autoresponse_preview_text" varchar,
  	"autoresponse_content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "petitions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"petitions_id" integer,
  	"tags_id" integer
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "petitions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "petition_signatures_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "petitions_id" integer;
  ALTER TABLE "settings_rels" ADD COLUMN "petitions_id" integer;
  ALTER TABLE "petition_signatures" ADD CONSTRAINT "petition_signatures_petition_id_petitions_id_fk" FOREIGN KEY ("petition_id") REFERENCES "public"."petitions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "petition_signatures" ADD CONSTRAINT "petition_signatures_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "petitions_blocks_email" ADD CONSTRAINT "petitions_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_email_opt_in" ADD CONSTRAINT "petitions_blocks_email_opt_in_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_first_name" ADD CONSTRAINT "petitions_blocks_first_name_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_last_name" ADD CONSTRAINT "petitions_blocks_last_name_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_mobile_number" ADD CONSTRAINT "petitions_blocks_mobile_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_mobile_opt_in" ADD CONSTRAINT "petitions_blocks_mobile_opt_in_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_address" ADD CONSTRAINT "petitions_blocks_address_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_city" ADD CONSTRAINT "petitions_blocks_city_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_state" ADD CONSTRAINT "petitions_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_zip" ADD CONSTRAINT "petitions_blocks_zip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_blocks_country" ADD CONSTRAINT "petitions_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_rels" ADD CONSTRAINT "petitions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_rels" ADD CONSTRAINT "petitions_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_rels" ADD CONSTRAINT "petitions_rels_petitions_fk" FOREIGN KEY ("petitions_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "petitions_rels" ADD CONSTRAINT "petitions_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "petition_signatures_petition_idx" ON "petition_signatures" USING btree ("petition_id");
  CREATE INDEX "petition_signatures_contact_idx" ON "petition_signatures" USING btree ("contact_id");
  CREATE INDEX "petition_signatures_updated_at_idx" ON "petition_signatures" USING btree ("updated_at");
  CREATE INDEX "petitions_blocks_email_order_idx" ON "petitions_blocks_email" USING btree ("_order");
  CREATE INDEX "petitions_blocks_email_parent_id_idx" ON "petitions_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_email_path_idx" ON "petitions_blocks_email" USING btree ("_path");
  CREATE INDEX "petitions_blocks_email_opt_in_order_idx" ON "petitions_blocks_email_opt_in" USING btree ("_order");
  CREATE INDEX "petitions_blocks_email_opt_in_parent_id_idx" ON "petitions_blocks_email_opt_in" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_email_opt_in_path_idx" ON "petitions_blocks_email_opt_in" USING btree ("_path");
  CREATE INDEX "petitions_blocks_first_name_order_idx" ON "petitions_blocks_first_name" USING btree ("_order");
  CREATE INDEX "petitions_blocks_first_name_parent_id_idx" ON "petitions_blocks_first_name" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_first_name_path_idx" ON "petitions_blocks_first_name" USING btree ("_path");
  CREATE INDEX "petitions_blocks_last_name_order_idx" ON "petitions_blocks_last_name" USING btree ("_order");
  CREATE INDEX "petitions_blocks_last_name_parent_id_idx" ON "petitions_blocks_last_name" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_last_name_path_idx" ON "petitions_blocks_last_name" USING btree ("_path");
  CREATE INDEX "petitions_blocks_mobile_number_order_idx" ON "petitions_blocks_mobile_number" USING btree ("_order");
  CREATE INDEX "petitions_blocks_mobile_number_parent_id_idx" ON "petitions_blocks_mobile_number" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_mobile_number_path_idx" ON "petitions_blocks_mobile_number" USING btree ("_path");
  CREATE INDEX "petitions_blocks_mobile_opt_in_order_idx" ON "petitions_blocks_mobile_opt_in" USING btree ("_order");
  CREATE INDEX "petitions_blocks_mobile_opt_in_parent_id_idx" ON "petitions_blocks_mobile_opt_in" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_mobile_opt_in_path_idx" ON "petitions_blocks_mobile_opt_in" USING btree ("_path");
  CREATE INDEX "petitions_blocks_address_order_idx" ON "petitions_blocks_address" USING btree ("_order");
  CREATE INDEX "petitions_blocks_address_parent_id_idx" ON "petitions_blocks_address" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_address_path_idx" ON "petitions_blocks_address" USING btree ("_path");
  CREATE INDEX "petitions_blocks_city_order_idx" ON "petitions_blocks_city" USING btree ("_order");
  CREATE INDEX "petitions_blocks_city_parent_id_idx" ON "petitions_blocks_city" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_city_path_idx" ON "petitions_blocks_city" USING btree ("_path");
  CREATE INDEX "petitions_blocks_state_order_idx" ON "petitions_blocks_state" USING btree ("_order");
  CREATE INDEX "petitions_blocks_state_parent_id_idx" ON "petitions_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_state_path_idx" ON "petitions_blocks_state" USING btree ("_path");
  CREATE INDEX "petitions_blocks_zip_order_idx" ON "petitions_blocks_zip" USING btree ("_order");
  CREATE INDEX "petitions_blocks_zip_parent_id_idx" ON "petitions_blocks_zip" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_zip_path_idx" ON "petitions_blocks_zip" USING btree ("_path");
  CREATE INDEX "petitions_blocks_country_order_idx" ON "petitions_blocks_country" USING btree ("_order");
  CREATE INDEX "petitions_blocks_country_parent_id_idx" ON "petitions_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "petitions_blocks_country_path_idx" ON "petitions_blocks_country" USING btree ("_path");
  CREATE UNIQUE INDEX "petitions_slug_idx" ON "petitions" USING btree ("slug");
  CREATE INDEX "petitions_updated_at_idx" ON "petitions" USING btree ("updated_at");
  CREATE INDEX "petitions_created_at_idx" ON "petitions" USING btree ("created_at");
  CREATE INDEX "petitions_rels_order_idx" ON "petitions_rels" USING btree ("order");
  CREATE INDEX "petitions_rels_parent_idx" ON "petitions_rels" USING btree ("parent_id");
  CREATE INDEX "petitions_rels_path_idx" ON "petitions_rels" USING btree ("path");
  CREATE INDEX "petitions_rels_pages_id_idx" ON "petitions_rels" USING btree ("pages_id");
  CREATE INDEX "petitions_rels_petitions_id_idx" ON "petitions_rels" USING btree ("petitions_id");
  CREATE INDEX "petitions_rels_tags_id_idx" ON "petitions_rels" USING btree ("tags_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_petitions_fk" FOREIGN KEY ("petitions_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_petition_signatures_fk" FOREIGN KEY ("petition_signatures_id") REFERENCES "public"."petition_signatures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_petitions_fk" FOREIGN KEY ("petitions_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_rels" ADD CONSTRAINT "settings_rels_petitions_fk" FOREIGN KEY ("petitions_id") REFERENCES "public"."petitions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_petitions_id_idx" ON "pages_rels" USING btree ("petitions_id");
  CREATE INDEX "payload_locked_documents_rels_petition_signatures_id_idx" ON "payload_locked_documents_rels" USING btree ("petition_signatures_id");
  CREATE INDEX "payload_locked_documents_rels_petitions_id_idx" ON "payload_locked_documents_rels" USING btree ("petitions_id");
  CREATE INDEX "settings_rels_petitions_id_idx" ON "settings_rels" USING btree ("petitions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "petition_signatures" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_email" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_email_opt_in" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_first_name" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_last_name" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_mobile_number" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_mobile_opt_in" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_address" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_city" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_state" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_zip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_blocks_country" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "petitions_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "petition_signatures" CASCADE;
  DROP TABLE "petitions_blocks_email" CASCADE;
  DROP TABLE "petitions_blocks_email_opt_in" CASCADE;
  DROP TABLE "petitions_blocks_first_name" CASCADE;
  DROP TABLE "petitions_blocks_last_name" CASCADE;
  DROP TABLE "petitions_blocks_mobile_number" CASCADE;
  DROP TABLE "petitions_blocks_mobile_opt_in" CASCADE;
  DROP TABLE "petitions_blocks_address" CASCADE;
  DROP TABLE "petitions_blocks_city" CASCADE;
  DROP TABLE "petitions_blocks_state" CASCADE;
  DROP TABLE "petitions_blocks_zip" CASCADE;
  DROP TABLE "petitions_blocks_country" CASCADE;
  DROP TABLE "petitions" CASCADE;
  DROP TABLE "petitions_rels" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_petitions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_petition_signatures_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_petitions_fk";
  
  ALTER TABLE "settings_rels" DROP CONSTRAINT "settings_rels_petitions_fk";
  
  DROP INDEX "pages_rels_petitions_id_idx";
  DROP INDEX "payload_locked_documents_rels_petition_signatures_id_idx";
  DROP INDEX "payload_locked_documents_rels_petitions_id_idx";
  DROP INDEX "settings_rels_petitions_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "petitions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "petition_signatures_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "petitions_id";
  ALTER TABLE "settings_rels" DROP COLUMN "petitions_id";
  DROP TYPE "public"."enum_petitions_status";
  DROP TYPE "public"."enum_petitions_confirmation_type";
  DROP TYPE "public"."enum_petitions_type";`)
}
