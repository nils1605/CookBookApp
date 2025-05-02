import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Recipe } from '../recipes/recipe.model';
import { Favorite } from '../favorites/favorite.model';

@Table
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Recipe)
  recipes: Recipe[];

  @HasMany(() => Favorite)
  favorites: Favorite[];
}
