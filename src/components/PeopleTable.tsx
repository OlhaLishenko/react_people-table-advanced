import { useContext } from 'react';
import { PeopleListContext } from '../store/PeopleContext';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SearchParamsContext } from '../store/searchHelper';
import { makeSort } from '../utils/filter';

export const PeopleTable = () => {
  const { peopleList } = useContext(PeopleListContext);
  const { slug } = useParams();
  const { searchParams, getSearchWith } = useContext(SearchParamsContext);
  const sortBy =
    searchParams.get('order') ||
    searchParams.get('sort') ||
    searchParams.get('sex') ||
    (searchParams.has('query') && 'query') ||
    (searchParams.get('century') && 'century') ||
    '';

  const filters = ['name', 'sex', 'born', 'died'];

  const visibleList: Person[] = makeSort(sortBy, peopleList, searchParams);

  const getMother = (personsMother: string | null): Person | null => {
    if (!personsMother) {
      return null;
    } else {
      return (
        peopleList.find(person => person.name === personsMother) ||
        ({
          name: personsMother,
        } as Person)
      );
    }
  };

  const getFather = (personsFather: string | null): Person | null => {
    if (!personsFather) {
      return null;
    } else {
      return (
        peopleList.find(person => person.name === personsFather) ||
        ({
          name: personsFather,
        } as Person)
      );
    }
  };

  const getSlug = (person: Person) =>
    `${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`;

  return (
    <>
      {visibleList.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {filters.map(filter => (
                <th key={filter}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {filter[0].toUpperCase() + filter.slice(1)}
                    <Link
                      to={{
                        search: getSearchWith(
                          searchParams.get('sort') !== filter
                            ? { sort: filter }
                            : { order: 'desc' },
                          searchParams,
                        ).paramString,
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </Link>
                  </span>
                </th>
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visibleList.map(person => (
              <tr
                data-cy="person"
                key={person.name}
                className={classNames({
                  'has-background-warning': slug === getSlug(person),
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  <PersonLink person={getMother(person.motherName)} />
                </td>
                <td>
                  <PersonLink person={getFather(person.fatherName)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
