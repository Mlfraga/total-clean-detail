# Migration `20200616215136-add-enabled-to-user`

This migration has been generated by Matheus Fraga at 6/16/2020, 9:51:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "enabled" boolean  NOT NULL DEFAULT true,
ALTER COLUMN "role" SET DEFAULT E'SELLER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200616203640-add-uf-to-address..20200616215136-add-enabled-to-user
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
@@ -21,8 +21,9 @@
   username   String  @unique
   email      String  @unique
   password   String
   role       Role    @default(SELLER)
+  enabled    Boolean @default(true)
   firstLogin Boolean @default(true)
   profile    Profile
 }
```


