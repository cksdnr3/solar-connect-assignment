import { Itodo } from 'components/todo/TodoService';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined, CloseOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { DatePicker, Modal } from "antd";
import moment from 'moment';
import getErrorMessage from 'utils/getErrorMessage';

interface TodoEditProps {
    todo: Itodo;
    setOpen: Function;
    editTodo: (todo: Itodo) => void;
    toggleTodo: (id: number) => void;
}

const modalConfig = (title: string) => {
    return { title };
}

export default function TodoEdit({ todo, setOpen, editTodo, toggleTodo }: TodoEditProps): ReactElement {
    const [deadline, setDeadline] = useState<moment.Moment | null>(todo.deadline);
    const [value, setValue] = useState(todo.text);
    const [edit, setEdit] = useState(false);
    const [done, setDone] = useState(todo.done);
    const [modal, cotextHolder] = Modal.useModal();
    const [note, setNote] = useState(todo.note || '');

    const handleBack = () => setOpen((prev: boolean) => !prev);

    const handleDisabledDate = (currentDate: moment.Moment) => currentDate < moment();

    const handleDeadlineChange = (value: moment.Moment | null): void => setDeadline(value);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const handleOpenEdit = () => {
        setEdit(true); 
    }

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

    const checkValidation = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const errorMessage = getErrorMessage(value);
        if (errorMessage) {
          modal.error(modalConfig(errorMessage));
          e.preventDefault();
        }
      }

    const handleCloseEdit = () => {
        setEdit(false);
        setDeadline(todo.deadline);
        setValue(todo.text);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editTodo({
            ...todo,
            text: value,
            deadline,
            note,
        });

        setEdit(false);
    }

    const handleToggleDone = () => {
        setDone(prev => !prev);
        toggleTodo(todo.id)
    }

    return (
        <TodoEditBlock done={done}>
            <Header>
                <TodoEditForm onSubmit={handleSubmit}>
                    {edit 
                        ? (
                            <>
                            <Icon onClick={handleCloseEdit}><CloseOutlined /></Icon>
                            <Title 
                            value={value} 
                            readOnly={!edit} 
                            type="text"
                            onChange={handleValueChange} />
                            <Edit type="submit" onClick={checkValidation}><CheckOutlined /></Edit> 
                            </>
                        )
                        : (
                            <>
                            <Icon onClick={handleBack}><ArrowLeftOutlined /></Icon>
                            <Title 
                            value={value} 
                            readOnly={!edit}
                            onClick={handleToggleDone}
                            style={{cursor: 'pointer'}}
                            type="text" 
                            onChange={handleValueChange} />
                            <Icon onClick={handleOpenEdit}><EditOutlined /></Icon>
                            </>
                        )}
                        {cotextHolder}
                </TodoEditForm>
            </Header>
            <Content>
                <DatePicker
                disabled={!edit}
                value={deadline}
                bordered={false}
                size='large'
                placeholder='Edit Deadline'
                disabledDate={handleDisabledDate}
                onChange={handleDeadlineChange}
                showToday={false}
                style={{width: '24%'}}
                />
                <Subtitle>Note</Subtitle>
                <Note>
                    <TextArea
                    readOnly={!edit}
                    onChange={handleNoteChange}
                    value={note} />
                </Note>
            </Content>
        </TodoEditBlock>

    )
}

const TodoEditBlock = styled.div<{ done: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    & > div {
        padding: 20px 35px;
        padding-bottom: 35px;
    }

    * {
        color: ${props => props.done ? '#ced4da;' : '#119955'};
    }
`

const TodoEditForm = styled.form`
    color: #119955;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Header = styled.div`
    flex-grow: 1;
`

const Icon = styled.div`
    font-size: 28px;
    cursor: pointer;
`

const Edit = styled.button`
    font-size: 25px;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
`

const Title = styled.input`
    outline: none;
    border: none;
    width: 70%;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
`

const Content = styled.div`
    padding: 20px 32px;
    padding-bottom: 48px;
    color: #119955;
    font-size: 18px;
    overflow-y: auto;
`
const Subtitle = styled.div`
    margin-top: 10px;
    font-size: 45px;
    font-weight: bold;
` 

const Note = styled.div`
    margin-top: 15px;
    display: flex;
`

const TextArea = styled.textarea`
    resize: none;
    outline: none;
    border: none;
    width: 100%;
    height: 250px;
    font-size: 20px;

`