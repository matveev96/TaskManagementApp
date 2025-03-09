import { AddItemForm } from "common/index"
import { DomainTodolist } from "../../../model/todolistsSlice"
import { TodolistTitle } from "./TodolistTitle"
import { FilterButtons } from "./FilterButtons"
import { Tasks } from "./Tasks"
import { useAddTaskMutation } from "../../../api/tasksApi"

type PropsType = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: PropsType) => {
  const [addNewTask] = useAddTaskMutation()

  const addTask = (title: string) => {
    addNewTask({ title, todolistId: todolist.id })
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
