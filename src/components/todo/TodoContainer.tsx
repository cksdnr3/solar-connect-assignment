import React, { useCallback, useState } from 'react';
import { useTodo } from "./TodoService";
import TodoTemplate from "./template/TodoTemplate";
import TodoHead from "./template/head/TodoHead";
import TodoList from "./template/list/TodoList";
import TodoCreate from "./template/create/TodoCreate";
import TodoFooter from "./template/footer/TodoFooter";
import TodoEdit from './template/edit/TodoEdit';
import { Itodo } from "components/todo/TodoService";

const TodoContainer = () => {
  const {
    todoState,
    toggleTodo,
    removeTodo,
    createTodo,
    editTodo,
    setTodoState,
  } = useTodo();

  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelecte] = useState<Itodo>(todoState[0]);

  const openEdit = useCallback((todo: Itodo) => {
    setOpen((prev: boolean) => !prev);
    setSelecte(todo);
  }, [select])

  return (
    <>
      <TodoTemplate>
        <TodoHead />
        {open 
        ? <TodoEdit
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          todo={select}
          setOpen={setOpen} /> 
        : <> 
            <TodoCreate
            createTodo={createTodo}
            />
            <TodoList
            setTodoState={setTodoState}
            openEdit={openEdit}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            todos={todoState}
            />
            <TodoFooter todos={todoState} />
          </>
          }
      </TodoTemplate>
    </>
  );
};

export default TodoContainer;
