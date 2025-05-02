import { Controller, Post, Delete, Param, Get, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':recipeId')
  add(@Param('recipeId') recipeId: string, @Request() req) {
    return this.favoritesService.addFavorite(req.user.userId, +recipeId);
  }

  @Delete(':recipeId')
  remove(@Param('recipeId') recipeId: string, @Request() req) {
    return this.favoritesService.removeFavorite(req.user.userId, +recipeId);
  }

  @Get()
  getAll(@Request() req) {
    return this.favoritesService.getUserFavorites(req.user.userId);
  }
}
