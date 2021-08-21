import { useState, useEffect } from "react";
export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  deadline: moment.Moment | null;
  note?: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const findLastId = () => {
    const ids = todoState.map(el => el.id);
    if (!ids.length) return 0;
    return Math.max(...ids);
  } 

  const toggleTodo = (id: number) => {
    //@TODO
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) => {
        return todo.id === id ? { ...todo, done: !todo.done } : todo
      })
    );
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const createTodo = (todo: Itodo) => {
    const nextId = findLastId() + 1;
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId 
      })
    );
  };
  
  const editTodo = (todo: Itodo) => {
    setTodoState(prevState => 
      prevState.map(el => el.id === todo.id ? todo : el))
  }

  const loadData = () => {
    let data = localStorage.getItem("todos");
    if (data === null) data = "";
    initialTodos = JSON.parse(data!)

    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  return {
    todoState,
    editTodo,
    toggleTodo,
    removeTodo,
    createTodo
  };
};
