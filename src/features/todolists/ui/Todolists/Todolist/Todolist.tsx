import { AddItemForm } from "common/index"
import { DomainTodolist } from "../../../model/todolists-reducer"
import { addTaskTC } from "../../../model/tasks-reducer"
import { TodolistTitle } from "./TodolistTitle"
import { FilterButtons } from "./FilterButtons"
import { Tasks } from "./Tasks"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type PropsType = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()

  const addTask = (title: string) => {
    dispatch(addTaskTC({ title, todolistId: todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
