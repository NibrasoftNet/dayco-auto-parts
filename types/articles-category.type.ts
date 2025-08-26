export type CategoryNodeType = {
  categoryId: number;
  categoryName: string;
  level: number;
  children: Record<string, CategoryNodeType> | CategoryNodeType[];
};

// Root type for the whole response
export type CategoriesResponseType = {
  categories: Record<string, CategoryNodeType>;
};
