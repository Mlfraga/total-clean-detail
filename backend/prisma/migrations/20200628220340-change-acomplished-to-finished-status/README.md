# Migration `20200628220340-change-acomplished-to-finished-status`

This migration has been generated by Matheus Fraga at 6/28/2020, 10:03:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'FINISHED');
ALTER TABLE "public"."Sale" ALTER COLUMN "status" DROP DEFAULT,
                        ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new"),
                        ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old"

ALTER TABLE "public"."Sale" ALTER COLUMN "status" SET DEFAULT E'PENDING';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT E'SELLER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200628132757-change-sale-status..20200628220340-change-acomplished-to-finished-status
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -19,9 +19,9 @@
 enum Status {
   PENDING
   CONFIRMED
   CANCELED
-  ACCOMPLISHED
+  FINISHED
 }
 model User {
   id         Int     @id @default(autoincrement())
```


