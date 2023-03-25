import { createContext, useEffect, useReducer } from "react";
import { account } from "../appwrite/appwriteConfig";
import Loading from "../components/utils/Loading";

export const AuthContext = createContext();

const initialState = {
  authenticated: false,
  user: undefined,
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "signin":
      return {
        authenticated: true,
        loading: false,
        user: action.user,
        error: action.error,
      };
    case "signout":
      return {
        authenticated: false,
        loading: false,
        user: null,
        error: action.error,
      };
    case "update":
      return {
        ...state,
        user: action.user,
      };
    case "error":
      return { error: action.error };
    default:
      return state;
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const res = await account.get();
        dispatch({ type: "signin", user: res, error: null });
      } catch (error) {
        if (error.code === 401) dispatch({ type: "signout", error: null });
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {state.loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
