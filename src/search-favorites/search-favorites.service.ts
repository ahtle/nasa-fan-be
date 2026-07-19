import { Injectable, NotFoundException } from "@nestjs/common";
import { SearchFavorite } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSearchFavoriteDto } from "./dto/create-search-favorite.dto";

export type SearchFavoriteResponse = {
  id: number;
  nasaId: string;
  title: string;
  description: string;
  dateCreated: string;
  thumbnailUrl: string;
  imageUrl: string;
  createdAt: Date;
};

@Injectable()
export class SearchFavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number) {
    const favorites = await this.prisma.searchFavorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return { favorites: favorites.map(toSearchFavoriteResponse) };
  }

  async create(userId: number, dto: CreateSearchFavoriteDto) {
    const favorite = await this.prisma.searchFavorite.upsert({
      where: {
        userId_nasaId: {
          userId,
          nasaId: dto.nasaId,
        },
      },
      create: {
        userId,
        nasaId: dto.nasaId,
        title: dto.title,
        description: dto.description,
        dateCreated: dto.dateCreated,
        thumbnailUrl: dto.thumbnailUrl,
        imageUrl: dto.imageUrl,
      },
      update: {},
    });

    return toSearchFavoriteResponse(favorite);
  }

  async remove(userId: number, nasaId: string) {
    const existing = await this.prisma.searchFavorite.findUnique({
      where: {
        userId_nasaId: {
          userId,
          nasaId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundException("Favorite not found");
    }

    await this.prisma.searchFavorite.delete({
      where: { id: existing.id },
    });

    return { message: "Favorite removed" };
  }
}

function toSearchFavoriteResponse(
  favorite: SearchFavorite,
): SearchFavoriteResponse {
  return {
    id: favorite.id,
    nasaId: favorite.nasaId,
    title: favorite.title,
    description: favorite.description,
    dateCreated: favorite.dateCreated,
    thumbnailUrl: favorite.thumbnailUrl,
    imageUrl: favorite.imageUrl,
    createdAt: favorite.createdAt,
  };
}
