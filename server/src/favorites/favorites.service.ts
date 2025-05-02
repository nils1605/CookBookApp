import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './favorite.model';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite) private favoriteModel: typeof Favorite) {}

  async addFavorite(userId: number, recipeId: number) {
    return this.favoriteModel.create({ userId, recipeId });
  }

  async removeFavorite(userId: number, recipeId: number) {
    const favorite = await this.favoriteModel.findOne({ where: { userId, recipeId } });
    if (!favorite) throw new NotFoundException('Favorite not found');
    await favorite.destroy();
  }

  async getUserFavorites(userId: number) {
    return this.favoriteModel.findAll({
      where: { userId },
      include: [Recipe],
    });
  }
}
