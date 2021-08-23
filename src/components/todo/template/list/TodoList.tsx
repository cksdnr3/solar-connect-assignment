import { Itodo } from "components/todo/TodoService";
import moment from "moment";
import React, { RefObject, useRef, useState } from "react";
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

type AfterElement = {
  offset: number;
  element: Element | null;
}

const TodoList = ({ toggleTodo, removeTodo, openEdit, todos }: TodoListProps) => {
  const container = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const afterElement = getDragAfterElemnt(container, e.clientY);
    const draggable = container.current?.querySelector('.dragging');

    container.current?.insertBefore(draggable!, afterElement!);
  }

  const getDragAfterElemnt = (container: RefObject<HTMLDivElement>, y: number) => {
    const draggableElements = Array.from(container.current?.querySelectorAll('.draggable:not(.dragging)') || []);

    return draggableElements.reduce((closest: AfterElement, child: Element) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element
  }

  return (
    <TodoListBlock
      ref={container}
      onDragOver={handleDragOver}
    >
      {todos && todos.map((todo) => (
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
