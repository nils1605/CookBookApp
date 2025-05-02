import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from './favorite.model';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [SequelizeModule.forFeature([Favorite])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}