/*
  Warnings:

  - The primary key for the `_movie_actors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `actors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[poster_id]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `poster_id` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_movie_actors" DROP CONSTRAINT "_movie_actors_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_movie_actors" DROP CONSTRAINT "_movie_actors_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_movie_id_fkey";

-- AlterTable
ALTER TABLE "_movie_actors" DROP CONSTRAINT "_movie_actors_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_movie_actors_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "actors" DROP CONSTRAINT "actors_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "actors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "movies" DROP CONSTRAINT "movies_pkey",
ADD COLUMN     "poster_id" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "movies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "movie_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "movie_posters" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_posters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_poster_id_key" ON "movies"("poster_id");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_poster_id_fkey" FOREIGN KEY ("poster_id") REFERENCES "movie_posters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_movie_actors" ADD CONSTRAINT "_movie_actors_A_fkey" FOREIGN KEY ("A") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_movie_actors" ADD CONSTRAINT "_movie_actors_B_fkey" FOREIGN KEY ("B") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
