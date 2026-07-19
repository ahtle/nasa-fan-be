-- CreateTable
CREATE TABLE "search_favorites" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nasa_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_created" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "search_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "search_favorites_user_id_nasa_id_key" ON "search_favorites"("user_id", "nasa_id");

-- AddForeignKey
ALTER TABLE "search_favorites" ADD CONSTRAINT "search_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
