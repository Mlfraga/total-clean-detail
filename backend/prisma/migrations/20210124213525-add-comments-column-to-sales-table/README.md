# Migration `20210124213525-add-comments-column-to-sales-table`

This migration has been generated by Matheus Fraga at 1/24/2021, 9:35:25 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Sale" ADD COLUMN "comments" text  NOT NULL ,
ALTER COLUMN "source" SET DEFAULT E'WORKSHOP',
ALTER COLUMN "status" SET DEFAULT E'PENDING';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT E'SELLER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201014165839-alter-company-service-collumn-name-from-company-model..20210124213525-add-comments-column-to-sales-table
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url      = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -118,8 +118,9 @@
   status           Status        @default(PENDING)
   companyPrice     Float
   costPrice        Float
   source           Source        @default(WORKSHOP)
+  comments         String
   sellerId         Int
   personId         Int
   carId            Int
   seller           Profile       @relation(fields: [sellerId], references: [id])
```


