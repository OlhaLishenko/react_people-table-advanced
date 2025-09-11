import { EFilter } from '../Enum/EFilter';
import { Person } from '../types';

const getList = (
  currentSort: string,
  list: Person[],
  search: URLSearchParams,
) => {
  if (!currentSort) {
    return [...list];
  }

  if (currentSort === 'name' || currentSort === 'sex') {
    return [...list].sort((a, b) =>
      a[currentSort].localeCompare(b[currentSort]),
    );
  }

  if (currentSort === 'born' || currentSort === 'died') {
    return [...list].sort((a, b) => a[currentSort] - b[currentSort]);
  }

  if (currentSort === 'desc') {
    const prevSort = search.get('sort');

    if (prevSort === 'name' || prevSort === 'sex') {
      return [...list].sort((a, b) => b[prevSort].localeCompare(a[prevSort]));
    } else if (prevSort === 'born' || prevSort === 'died') {
      return [...list].sort((a, b) => b[prevSort] - a[prevSort]);
    } else {
      return [...list];
    }
  }

  return [...list];
};

const getListByQuery = (list: Person[], search: URLSearchParams) => {
  const query = search.get('query') || '';

  if (query.length == 0) {
    return [...list];
  }

  return [...list].filter(
    person =>
      person.name.toLowerCase().startsWith(query.toLowerCase()) ||
      (person.motherName &&
        person.motherName.toLowerCase().startsWith(query.toLowerCase())) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().startsWith(query.toLowerCase())),
  );
};

const getListByCentury = (list: Person[], search: URLSearchParams) => {
  const centuryList = search.getAll('century');

  const newList = [...list].filter(person =>
    centuryList.some(
      c => +c === Number(person.born.toString().slice(0, 2)) + 1,
    ),
  );

  return newList;
};

export const makeSort = (
  sortBy: string,
  list: Person[],
  search: URLSearchParams,
) => {
  switch (sortBy) {
    case EFilter.Male:
      return [...list].filter(person => person.sex === 'm');
    case EFilter.Female:
      return [...list].filter(person => person.sex === 'f');
    case EFilter.Name:
    case EFilter.Sex:
    case EFilter.Born:
    case EFilter.Died:
    case 'desc':
      return getList(sortBy, list, search);
    case EFilter.Query:
      return getListByQuery(list, search);
    case EFilter.Century:
      return getListByCentury(list, search);
    default:
      return [...list];
  }
};
