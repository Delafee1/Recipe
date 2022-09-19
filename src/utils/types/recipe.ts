export type Recipe = {
  id: number;
  image: string;
  title: string;
  aggregateLikes: number;
  readyInMinutes: number;
  summary: string;
  diets: [];
  nutrition: {nutrients: [{amount: number}]};
};
