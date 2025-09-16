// import { EFilterField } from '../Enum/EFilter';
import { Person } from '../types';
// import { SearchField } from '../store/SortConfig';

// type FilterContextType = {
//   filteredList: Person[];
//   setFilteredList: React.Dispatch<React.SetStateAction<Person[]>>;
//   makeSort: (
//     sortBy: SearchField,
//     list: Person[],
//     search: URLSearchParams,
//   ) => Person[];
// };

// export const FilterContext = createContext<FilterContextType>({
//   filteredList: [],
//   setFilteredList: () => {},
//   makeSort: () => [],
// });

// export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
//   const { peopleList } = useContext(PeopleListContext);
//   const [filteredList, setFilteredList] = useState<Person[] | []>(peopleList);

//   const getListBySex = (sex: string | string[], list: Person[]) => {
//     switch (sex) {
//       case 'm':
//         return [...list].filter(person => person.sex === 'm');
//       case 'f':
//         return [...list].filter(person => person.sex === 'f');
//       default:
//         return [...list];
//     }
//   };

//   const getList = (
//     currentSort: string | string[],
//     list: Person[],
//     search: URLSearchParams,
//     desc: boolean,
//   ) => {
//     if (!currentSort) {
//       return [...list];
//     }

//     if (desc) {
//       const prevSort = search.get('sort');

//       if (prevSort === 'name' || prevSort === 'sex') {
//         return [...list].sort((a, b) => b[prevSort].localeCompare(a[prevSort]));
//       } else if (prevSort === 'born' || prevSort === 'died') {
//         return [...list].sort((a, b) => b[prevSort] - a[prevSort]);
//       } else {
//         return [...list];
//       }
//     }

//     if (currentSort === 'name' || currentSort === 'sex') {
//       return [...list].sort((a, b) =>
//         a[currentSort].localeCompare(b[currentSort]),
//       );
//     }

//     if (currentSort === 'born' || currentSort === 'died') {
//       return [...list].sort((a, b) => a[currentSort] - b[currentSort]);
//     }

//     return [...list];
//   };

//   const getListByQuery = (list: Person[], query: string | string[]) => {
//     if (Array.isArray(query)) {
//       return [...list];
//     }

//     if (!query || query.length === 0) {
//       return [...list];
//     }

//     return [...list].filter(
//       person =>
//         person.name.toLowerCase().startsWith(query.toLowerCase()) ||
//         (person.motherName &&
//           person.motherName.toLowerCase().startsWith(query.toLowerCase())) ||
//         (person.fatherName &&
//           person.fatherName.toLowerCase().startsWith(query.toLowerCase())),
//     );
//   };

//   const getListByCenturies = (list: Person[], centuries: string | string[]) => {
//     if (!Array.isArray(centuries)) {
//       return [...list];
//     }

//     const newList = [...list].filter(person =>
//       centuries.some(
//         c => +c === Number(person.born.toString().slice(0, 2)) + 1,
//       ),
//     );

//     return newList;
//   };

//   const makeSort = (
//     sortBy: SearchField,
//     list: Person[],
//     search: URLSearchParams,
//   ) => {
//     switch (sortBy.sortField) {
//       case EFilterField.sex:
//         return getListBySex(sortBy.sortValue, list);
//       case EFilterField.sort:
//         return getList(sortBy.sortValue, list, search, sortBy.isDesc);
//       case EFilterField.query:
//         return getListByQuery(list, sortBy.sortValue);
//       case EFilterField.centuries:
//         return getListByCenturies(list, sortBy.sortValue);
//       default:
//         return [...list];
//     }
//   };

//   return (
//     <FilterContext.Provider value={{ filteredList, setFilteredList, makeSort }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

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
      person.name.toLowerCase().startsWith(query.toLowerCase()) ||
      (person.motherName &&
        person.motherName.toLowerCase().startsWith(query.toLowerCase())) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().startsWith(query.toLowerCase())),
  );
};

const getListByCenturies = (list: Person[], centuries: string | string[]) => {
  // debugger;
  // if (!Array.isArray(centuries)) {
  //   return [...list];
  // }

  const newList = [...list].filter(person =>
    centuries.some(c => +c === Number(person.born.toString().slice(0, 2)) + 1),
  );

  return newList;
};

export const makeSort = (
  // sortBy: SearchField,
  list: Person[],
  search: URLSearchParams,
) => {
  // debugger;
  let newList = [...list];

  for (const [key, value] of search.entries()) {
    console.log(key, value);
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
      newList = getListByCenturies(newList, value);
    }
  }

  return newList;
};
