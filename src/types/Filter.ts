export type MainFilters = {
  sort: ('name' | 'sex' | 'born' | 'died') | null;
  sex: 'm' | 'f';
  query: string;
  centuries: string[];
};
