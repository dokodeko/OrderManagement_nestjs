-- 1) Add price column with a DEFAULT so existing rows won’t violate NOT NULL
ALTER TABLE "Order" ADD COLUMN "price" double precision NOT NULL DEFAULT 0;

-- 2) Migrate existing data: copy total → price
UPDATE "Order"
SET "price" = "total";

-- 3) Drop the old total column
ALTER TABLE "Order" DROP COLUMN "total";

-- 4) (Optional) Remove the default if you don't want future INSERTs to auto-set price=0
ALTER TABLE "Order" ALTER COLUMN "price" DROP DEFAULT;
  