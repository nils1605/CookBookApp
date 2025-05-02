import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { Recipe } from './recipes/recipe.model';
import { Favorite } from './favorites/favorite.model';
import { RecipesModule } from './recipes/recipes.module';
import { UserFavorite } from './favorites/user-favorite.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Recipe, Favorite, UserFavorite],
      autoLoadModels: true,
      synchronize: true, // use only in dev
    }),
    SequelizeModule.forFeature([User, Recipe, Favorite, UserFavorite]),
    RecipesModule,
    UsersModule,
    AuthModule,
    FavoritesModule
  ],
})
export class AppModule {}
