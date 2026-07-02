-- CreateTable
CREATE TABLE "missions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "agency" TEXT NOT NULL DEFAULT 'NASA',
    "launch_date" TIMESTAMP(3),
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "missions_pkey" PRIMARY KEY ("id")
);
