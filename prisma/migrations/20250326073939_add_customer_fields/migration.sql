/*
  Warnings:

  - You are about to drop the column `address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Email` table. All the data in the column will be lost.
  - Added the required column `age` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discoveryMethod` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationLevel` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequencyOfUse` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incomeRange` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestsHobbies` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loyaltyProgramMember` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredCommunication` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredProducts` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredShoppingMethod` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryReason` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `zipCode` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `emailType` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "preferredProducts" TEXT NOT NULL,
    "primaryReason" TEXT NOT NULL,
    "frequencyOfUse" TEXT NOT NULL,
    "preferredShoppingMethod" TEXT NOT NULL,
    "discoveryMethod" TEXT NOT NULL,
    "incomeRange" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "preferredCommunication" TEXT NOT NULL,
    "interestsHobbies" TEXT NOT NULL,
    "loyaltyProgramMember" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Customer" ("createdAt", "email", "firstName", "id", "lastName", "updatedAt", "zipCode") SELECT "createdAt", "email", "firstName", "id", "lastName", "updatedAt", "zipCode" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
CREATE TABLE "new_Email" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "emailType" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Email_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Email" ("body", "createdAt", "customerId", "id", "status", "subject", "updatedAt") SELECT "body", "createdAt", "customerId", "id", "status", "subject", "updatedAt" FROM "Email";
DROP TABLE "Email";
ALTER TABLE "new_Email" RENAME TO "Email";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
