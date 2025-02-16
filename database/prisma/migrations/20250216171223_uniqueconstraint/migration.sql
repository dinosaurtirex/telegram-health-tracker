/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `HeadacheReport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `MentalStateReport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `OtherStateReport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat_id_key" ON "Chat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HeadacheReport_id_key" ON "HeadacheReport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MentalStateReport_id_key" ON "MentalStateReport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OtherStateReport_id_key" ON "OtherStateReport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");
