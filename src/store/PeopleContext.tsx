import React, { createContext, useState, useReducer } from 'react';
import { Person } from '../types';
import { Actions, InitStateType } from '../types/Alarms';
import { SearchField } from './SortConfig';

const initialState: InitStateType = {
  error: null,
  alarm: null,
};

const reducer = (currentState: InitStateType, action: Actions) => {
  switch (action.type) {
    case 'setErrorMessage':
      return {
        ...currentState,
        error: action.message,
      };
    case 'setAlarmMessage':
      return {
        ...currentState,
        alarm: action.message,
      };
    default:
      return currentState;
  }
};

type PeopleListType = {
  peopleList: Person[];
  setPeopleList: React.Dispatch<React.SetStateAction<Person[]>>;
  // filteredList: Person[];
  // setFilteredList: React.Dispatch<React.SetStateAction<Person[]>>;
  sortBy: SearchField;
  setSortBy: React.Dispatch<React.SetStateAction<SearchField>>;
  currentState: InitStateType;
  dispatch: React.Dispatch<Actions>;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PeopleListContext = createContext<PeopleListType>({
  peopleList: [],
  setPeopleList: () => {},
  // filteredList: [],
  // setFilteredList: () => {},
  sortBy: new SearchField(new URLSearchParams()),
  setSortBy: () => {},
  currentState: initialState,
  dispatch: () => {},
  loader: false,
  setLoader: () => {},
});

export const PeopleListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [peopleList, setPeopleList] = useState<Person[] | []>([]);
  // const [filteredList, setFilteredList] = useState<Person[] | []>(peopleList);
  const [loader, setLoader] = useState<boolean>(true);
  const [currentState, dispatch] = useReducer(reducer, initialState);
  const [sortBy, setSortBy] = useState<SearchField>(
    new SearchField(new URLSearchParams()),
  );

  return (
    <PeopleListContext.Provider
      value={{
        peopleList,
        setPeopleList,
        // filteredList,
        // setFilteredList,
        sortBy,
        setSortBy,
        currentState,
        dispatch,
        loader,
        setLoader,
      }}
    >
      {children}
    </PeopleListContext.Provider>
  );
};
