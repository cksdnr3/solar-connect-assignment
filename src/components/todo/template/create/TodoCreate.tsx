import React, { useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import type { Itodo } from "components/todo/TodoService";
import moment from "moment";
import { Modal } from "antd";
import getErrorMessage from "utils/getErrorMessage";

const modalConfig = (title: string) => {
  return { title };
}

const CircleButton = styled.button`
  background: #33bb77;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;  
	display: flex;
  left: 50%; 
  font-size: 50px;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: column;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 25px;
  padding-right: 60px;
  padding-bottom: 30px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #dddddd;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const TextInputBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface TodoCreateProps {
  createTodo: (todo: Itodo) => void;
}

const TodoCreate = ({ createTodo }: TodoCreateProps) => {
  const [value, setValue] = useState("");
  const [deadline, setDeadline] = useState<moment.Moment | null>(null);
  const [modal, contextHolder] = Modal.useModal();

  const checkValidation = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const errorMessage = getErrorMessage(value);
    if (errorMessage) {
      modal.error(modalConfig(errorMessage));
      e.preventDefault();
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  }
  const handleDeadlineChange = (value: moment.Moment | null): void => {
    setDeadline(value);
  }
  const handleDisabledDate = (currentDate: moment.Moment) => currentDate < moment();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // 새로고침 방지

    createTodo({
      id: 0,
      text: value,
      done: false,
      deadline
    });

    setDeadline(null) // datepicker 초기화
    setValue(""); // input 초기화
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <DatePicker
          value={deadline}
          bordered={false}
          size="small"
          placeholder='Set a deadline'
          onChange={handleDeadlineChange}
          disabledDate={handleDisabledDate}
          showToday={false}
          />
          <TextInputBlock>
            <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
            />

            <CircleButton onClick={checkValidation}>
              <PlusCircleOutlined />
            </CircleButton>
            {contextHolder}
          </TextInputBlock>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
