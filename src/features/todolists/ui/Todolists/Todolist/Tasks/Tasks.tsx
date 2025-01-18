import {useAppSelector} from "../../../../../../app/hooks";
import {selectTasks} from "../../../../model/tasks-selectors";
import List from "@mui/material/List";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {TodolistType} from "../../../../model/todolists-reducer";
import {Task} from "./Task/Task";

type Props = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const tasks = useAppSelector(selectTasks)

    const filterOfTasks = () => {
        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(task => !task.isDone);
            case "completed":
                return tasks[todolist.id].filter(task => task.isDone);
            default:
                return tasks[todolist.id]
        }
    }
    const tasksForTodolist = filterOfTasks()

    return (
        <>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <List ref={listRef}>
                        {tasksForTodolist.map((task) => {
                            return (
                                <Task key={task.id} task={task} todolistId={todolist.id}/>
                            )
                        })}
                    </List>
            }
        </>
    );
};
