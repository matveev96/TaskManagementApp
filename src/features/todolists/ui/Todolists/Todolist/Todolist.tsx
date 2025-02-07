import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {DomainTodolist} from "../../../model/todolists-reducer";
import {addTaskTC} from "../../../model/tasks-reducer";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {Tasks} from "./Tasks/Tasks";

import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";

type PropsType = {
    todolist: DomainTodolist
}

export const Todolist = ({todolist}: PropsType) => {
    const dispatch = useAppDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskTC({ title, todolistId: todolist.id }))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}
