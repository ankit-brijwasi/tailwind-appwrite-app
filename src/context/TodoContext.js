import { createContext, useEffect, useReducer } from "react";
import { databases } from "../appwrite/appwriteConfig";
// import Loading from "../components/utils/Loading";

export const TodoContext = createContext();

const initialState = {
  loading: true,
  error: null,
  todos: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "createTodo":
      return {
        todos: {
          total: state.todos.total + 1,
          documents: [action.todo, ...state.todos.documents],
        },
        loading: false,
        error: null,
      };

    case "fetchedTodos":
      return {
        ...state,
        loading: false,
        todos: action.todos,
      };

    case "error":
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}

export default function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const todos = await databases.listDocuments(
          "63a97066dac415410906",
          "63a97113ed40f2dc93d8"
        );
        dispatch({ type: "fetchedTodos", todos: todos });
      } catch (error) {
        console.log(error);
        dispatch({ type: "error", error: "some error" });
      }
    })();
  }, []);

  return (
    <TodoContext.Provider value={[state, dispatch]}>
      {children}
    </TodoContext.Provider>
  );
}
