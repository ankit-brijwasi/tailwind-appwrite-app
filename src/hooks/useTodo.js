import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function useTodo() {
  return useContext(TodoContext);
}
