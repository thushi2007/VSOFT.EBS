import {SubCategoryDto} from './subcategorydto';

export class CategoryDto {
  public Id: string;
  public Category: string;
  public SubCategories: SubCategoryDto[];
}
