import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipe.model';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe) private recipeModel: typeof Recipe) {}

  create(dto: CreateRecipeDto, userId: number) {
    return this.recipeModel.create({ ...dto, userId });
  }

  findAll() {
    return this.recipeModel.findAll({ include: ['user'] });
  }
  

  async findOne(id: number) {
    const recipe = await this.recipeModel.findByPk(id, { include: ['user'] });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async delete(id: number) {
    const recipe = await this.findOne(id);
    await recipe.destroy();
  }
  

  
}
