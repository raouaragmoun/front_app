import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      // Store new search data in local storage
      localStorage.setItem("searchData", JSON.stringify(action.payload));
      return action.payload;
    case "RESET_SEARCH":
      // Clear search data from local storage
      localStorage.removeItem("searchData");
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  // Load search data from local storage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("searchData");
    if (storedData) {
      dispatch({ type: "NEW_SEARCH", payload: JSON.parse(storedData) });
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
