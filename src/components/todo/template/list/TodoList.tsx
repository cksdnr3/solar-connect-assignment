import { Itodo } from "components/todo/TodoService";
import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import TodoItem from "./item/TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const Draggable = styled.div``

type DragHandler = React.DragEvent<HTMLDivElement>

interface TodoListProps {
  todos: Itodo[];
  openEdit: (todo: Itodo) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  setTodoState: (prev: Itodo[]) => void;
}


const TodoList = ({ toggleTodo, removeTodo, openEdit, setTodoState, todos }: TodoListProps) => {
  const [dragged, setDragged] = useState<Itodo>(todos[0]);
  const handleDragStart = (idx: number) => {
    setDragged(todos[idx]);
  }

  const handleDragOver = (e: DragHandler, idx: number) => {
    const dragOver = todos[idx];
    if (dragged === dragOver) return;
    let items = todos.filter(item => item !== dragged);
    items.splice(idx, 0, dragged);
    setTodoState(items);
  }

  return (
    <TodoListBlock>
      {todos && todos.map((todo, idx) => (
        <Draggable
        key={todo.id}
        draggable
        onDragStart={() => handleDragStart(idx)}
        onDragOver={(e) => handleDragOver(e, idx)}
        >
          <TodoItem
          openEdit={openEdit}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          todo={{ ...todo, deadline: todo.deadline && moment(todo.deadline) }}
          />
        </Draggable>
      ))}
    </TodoListBlock>
  );
};

export default React.memo(TodoList);
