import {FilterValuesType, TasksType} from "./App";
import {ChangeEvent} from "react";
import {Button} from "./Button";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type PropsType = {
    title: string
    todolistId: string
    tasks: TasksType
    filter: FilterValuesType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, newFilter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    removeToDoList: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, updatedTitle: string) => void
    updateTodoListTitle: (todolistId: string,  updatedTitle: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        todolistId,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        removeToDoList,
        updateTaskTitle,
        updateTodoListTitle
    } = props

    const [listRef] = useAutoAnimate<HTMLUListElement>()


    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }

    const removeToDoListHandler = () => {
        removeToDoList(todolistId)
    }

    const filterOfTasks = () => {
        switch (filter) {
            case "active": return tasks[todolistId].filter(task => !task.isDone);
            case "completed": return tasks[todolistId].filter(task => task.isDone);
            default: return tasks[todolistId]
        }
    }
    const tasksForTodolist = filterOfTasks()

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }

    const updateTodoListTitleHandler = (updateTitle: string) => {
        updateTodoListTitle(todolistId, updateTitle)
    }

    const updateTaskTitleHandler = (updateTitle: string, taskId: string) => {
        updateTaskTitle(todolistId, taskId, updateTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} onClick={updateTodoListTitleHandler}/>
                <Button title={'x'} onClick={removeToDoListHandler}/>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <ul ref={listRef}>
                        {tasksForTodolist.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(todolistId, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(todolistId, task.id, newStatusValue)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan oldTitle={task.title} onClick={(updateTitle: string) => updateTaskTitleHandler(updateTitle, task.id)}/>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
