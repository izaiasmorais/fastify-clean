-- AlterTable
CREATE SEQUENCE product_categories_code_seq;
ALTER TABLE "product_categories" ALTER COLUMN "code" SET DEFAULT nextval('product_categories_code_seq');
ALTER SEQUENCE product_categories_code_seq OWNED BY "product_categories"."code";
