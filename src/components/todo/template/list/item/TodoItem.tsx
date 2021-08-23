import React, { useRef, useState } from "react";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import styled, { css } from "styled-components";

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
  margin-left: 15px;
  cursor: pointer;

  &:hover {
    display: initial;
  }
`;

const TodoItemBlock = styled.div<{ dragging: boolean }>`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;

  ${(props) => 
    props.dragging &&
      css`
        opacity: .5;
      `
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  min-width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;
  vertical-align: middle;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const FromNow = styled.div`
    font-size: 14px;
    color: #808080;
`

interface TodoItemProps {
  openEdit: (todo: Itodo) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, openEdit, todo }: TodoItemProps) => {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = () => {
    setDragging(true);
  }

  const handleDragEnd = () => {
    setDragging(false);
  }

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleRemove = () => {
    removeTodo(todo.id);
  };
  
  const handleOpenEdit = () => {
    openEdit(todo);
  }

  return (
    <TodoItemBlock
    draggable
    className={`draggable ${dragging && 'dragging'}`}
    dragging={dragging}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    >
      <CheckCircle done={todo.done} onClick={handleToggle}>
        {todo.done && <CheckOutlined />}
      </CheckCircle>
      <Text done={todo.done}>{todo.text}</Text>
      <FromNow>{todo.deadline?.fromNow()}</FromNow>
      <Icon onClick={handleOpenEdit}>
        <EditOutlined />
      </Icon>
      <Icon onClick={handleRemove}>
        <DeleteOutlined />
      </Icon>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
