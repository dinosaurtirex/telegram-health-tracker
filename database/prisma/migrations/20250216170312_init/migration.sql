-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat_id" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat_id" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Report_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HeadacheReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "report_id" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HeadacheReport_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MentalStateReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "report_id" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MentalStateReport_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OtherStateReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "report_id" INTEGER NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OtherStateReport_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_chat_id_key" ON "Report"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "HeadacheReport_report_id_key" ON "HeadacheReport"("report_id");

-- CreateIndex
CREATE UNIQUE INDEX "MentalStateReport_report_id_key" ON "MentalStateReport"("report_id");

-- CreateIndex
CREATE UNIQUE INDEX "OtherStateReport_report_id_key" ON "OtherStateReport"("report_id");
