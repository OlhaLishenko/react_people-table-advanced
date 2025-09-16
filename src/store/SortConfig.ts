import { EFilterField } from '../Enum/EFilter';

export class SearchField {
  sortField: EFilterField | null;

  sortValue: string | string[];

  isDesc: boolean;

  constructor(searchParams: URLSearchParams) {
    this.sortField = this.getSortField(searchParams) as EFilterField | null;
    this.sortValue = this.getSortValue(searchParams) as string | string[];
    this.isDesc = this.checkOrder(searchParams);
  }

  checkOrder(searchParams: URLSearchParams) {
    if (searchParams.get('order')) {
      return true;
    }

    return false;
  }

  getSortField(searchParams: URLSearchParams): keyof typeof EFilterField | '' {
    const sort: string | null = searchParams.get('sort');
    const sex: string | null = searchParams.get('sex');
    const query: boolean = searchParams.has('query');
    const centuries: boolean = searchParams.has('centuries');

    if (sort) {
      return 'sort';
    } else if (sex) {
      return 'sex';
    } else if (query) {
      return 'query';
    } else if (centuries) {
      return 'centuries';
    } else {
      return '';
    }
  }

  getSortValue(searchParams: URLSearchParams): string | string[] {
    const sort = searchParams.get('sort');
    const sex = searchParams.get('sex');
    const query = searchParams.get('query');
    const centuries = searchParams.getAll('centuries');

    if (sort !== null) {
      return sort;
    } else if (sex !== null) {
      return sex;
    } else if (query !== null) {
      return query;
    } else if (centuries.length > 0) {
      return centuries;
    } else {
      return '';
    }
  }
}
