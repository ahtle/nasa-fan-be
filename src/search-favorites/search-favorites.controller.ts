import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateSearchFavoriteDto } from "./dto/create-search-favorite.dto";
import { SearchFavoritesService } from "./search-favorites.service";

@Controller("search-favorites")
@UseGuards(JwtAuthGuard)
export class SearchFavoritesController {
  constructor(
    private readonly searchFavoritesService: SearchFavoritesService,
  ) {}

  @Get()
  findAll(@Request() req: { user: User }) {
    return this.searchFavoritesService.findAll(req.user.id);
  }

  @Post()
  create(
    @Request() req: { user: User },
    @Body() dto: CreateSearchFavoriteDto,
  ) {
    return this.searchFavoritesService.create(req.user.id, dto);
  }

  @Delete(":nasaId")
  remove(@Request() req: { user: User }, @Param("nasaId") nasaId: string) {
    return this.searchFavoritesService.remove(req.user.id, nasaId);
  }
}
