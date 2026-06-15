-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `summary` TEXT NULL,
    `sourceName` VARCHAR(255) NOT NULL,
    `sourceUrl` VARCHAR(500) NULL,
    `articleUrl` VARCHAR(500) NOT NULL,
    `imageUrl` VARCHAR(500) NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Article_articleUrl_key`(`articleUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
