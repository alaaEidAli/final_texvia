export interface Isolutions {
  id: number;
  title: string;
  description: string;
  solutionProviders: string[];
  imageUrl: string;
  category: string;
}
export interface SolutionsResponse {
  solutions: Isolutions[];
  total: number;
  page: number;
  limit: number;
}

