import React, { useEffect } from "react";
import { createContext, useContext } from "react";
import api from "../lib/api";

//create a todos list conext and provider with types 
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await api("/todos");
      console.log(res);
      
      setTodos(res.data);
    }
    fetchTodos();
  }, [])

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};