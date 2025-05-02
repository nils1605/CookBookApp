import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Favorite } from '../favorites/favorite.model';

@Table
export class Recipe extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.ARRAY(DataType.STRING))
  ingredients: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  steps: string[];

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Favorite)
  favorites: Favorite[];
}
