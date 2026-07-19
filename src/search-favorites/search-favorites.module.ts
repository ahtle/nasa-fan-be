import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SearchFavoritesController } from "./search-favorites.controller";
import { SearchFavoritesService } from "./search-favorites.service";

@Module({
  imports: [AuthModule],
  controllers: [SearchFavoritesController],
  providers: [SearchFavoritesService],
})
export class SearchFavoritesModule {}
