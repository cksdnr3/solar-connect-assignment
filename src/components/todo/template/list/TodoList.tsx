import { Itodo } from "components/todo/TodoService";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import TodoItem from "./item/TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

interface TodoListProps {
  todos: Itodo[];
  openEdit: (todo: Itodo) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList = ({ toggleTodo, removeTodo, openEdit, todos }: TodoListProps) => {
  return (
    <TodoListBlock>
      {todos &&
        todos.map((todo) => (
          <TodoItem
          openEdit={openEdit}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          key={todo.id}
          todo={{ ...todo, deadline: todo.deadline && moment(todo.deadline) }}
          />
          ))}
    </TodoListBlock>
  );
};

export default React.memo(TodoList);
