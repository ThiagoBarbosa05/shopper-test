-- CreateEnum
CREATE TYPE "Type" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "measures" (
    "id" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "type" "Type" NOT NULL,
    "value" INTEGER NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "measures_customer_code_key" ON "measures"("customer_code");
