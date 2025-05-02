import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Recipe } from '../recipes/recipe.model';

@Table
export class Favorite extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Recipe)
  @Column
  recipeId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Recipe)
  recipe: Recipe;
}

