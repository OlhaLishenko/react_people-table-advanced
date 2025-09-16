import { Person } from '../types';

const getListBySex = (sex: string | string[], list: Person[]) => {
  switch (sex) {
    case 'm':
      return [...list].filter(person => person.sex === 'm');
    case 'f':
      return [...list].filter(person => person.sex === 'f');
    default:
      return [...list];
  }
};

const getList = (
  currentSort: string | string[],
  list: Person[],
  search: URLSearchParams,
  desc: boolean,
) => {
  if (!currentSort) {
    return [...list];
  }

  if (desc) {
    const prevSort = search.get('sort');

    if (prevSort === 'name' || prevSort === 'sex') {
      return [...list].sort((a, b) => b[prevSort].localeCompare(a[prevSort]));
    } else if (prevSort === 'born' || prevSort === 'died') {
      return [...list].sort((a, b) => b[prevSort] - a[prevSort]);
    } else {
      return [...list];
    }
  }

  if (currentSort === 'name' || currentSort === 'sex') {
    return [...list].sort((a, b) =>
      a[currentSort].localeCompare(b[currentSort]),
    );
  }

  if (currentSort === 'born' || currentSort === 'died') {
    return [...list].sort((a, b) => a[currentSort] - b[currentSort]);
  }

  return [...list];
};

const getListByQuery = (list: Person[], query: string | string[]) => {
  if (Array.isArray(query)) {
    return [...list];
  }

  if (!query || query.length === 0) {
    return [...list];
  }

  return [...list].filter(
    person =>
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      (person.motherName &&
        person.motherName.toLowerCase().includes(query.toLowerCase())) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().includes(query.toLowerCase())),
  );
};

const getListByCenturies = (list: Person[], centuries: string | string[]) => {
  if (!Array.isArray(centuries)) {
    return [...list];
  }

  const newList = [...list].filter(person =>
    centuries.some(c => +c === Number(person.born.toString().slice(0, 2)) + 1),
  );

  return newList;
};

export const makeSort = (list: Person[], search: URLSearchParams) => {
  let newList = [...list];

  for (const [key, value] of search.entries()) {
    if (key === 'sex') {
      newList = getListBySex(value, newList);
    }

    if (key === 'sort') {
      newList = getList(value, newList, search, search.has('order'));
    }

    if (key === 'query') {
      newList = getListByQuery(newList, value);
    }

    if (key === 'centuries') {
      const centuries = search.getAll('centuries');

      newList = getListByCenturies(newList, centuries);
    }
  }

  return newList;
};
