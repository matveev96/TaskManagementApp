import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {TodolistType} from "../../../model/todolists-reducer";
import {AddTaskAC} from "../../../model/tasks-reducer";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {Tasks} from "./Tasks/Tasks";
import {useAppDispatch} from "../../../../../app/hooks";

type PropsType = {
    todolist: TodolistType
}

export const Todolist = (props: PropsType) => {
    const dispatch = useAppDispatch();
    const {todolist} = props

    const addTask = (title: string) => {
        dispatch(AddTaskAC({todolistId: todolist.id, title}))
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
