import {FilterValuesType, TasksType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {useAutoAnimate} from "@formkit/auto-animate/react";


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
    } = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [listRef] = useAutoAnimate<HTMLUListElement>()


    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(todolistId, taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }

    const removeToDoListHandler = () => {
        removeToDoList(todolistId)
    }

    const changeFilterTodolistHandler = () => {
        let tasksForTodolist = tasks[todolistId]
        if (filter === 'active') {
            tasksForTodolist = tasks[todolistId].filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            tasksForTodolist = tasks[todolistId].filter(task => task.isDone)
        }
        return tasksForTodolist
    }
    const tasksForTodolist = changeFilterTodolistHandler()

    return (
        <div>
            <h3>
                {title}
                <Button title={'x'} onClick={removeToDoListHandler}/>
            </h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
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
                                <span>{task.title}</span>
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



//--------------------------------------------------------------------------------------Способ с использованием useRef
//
// import {FilterValuesType, TaskType} from "./App";
// import {Button} from "./Button";
// import {useRef} from "react";
//
// type PropsType = {
//     title: string
//     tasks: TaskType[]
//     removeTask: (taskId: string) => void
//     changeFilter: (filter: FilterValuesType) => void
//     addTask: (newTitle:string) => void
// }
//
// export const Todolist = ({
//                              title,
//                              tasks,
//                              removeTask,
//                              changeFilter,
//                              addTask
//                          }: PropsType) => {
//
//
//
//     const inputRef=useRef<HTMLInputElement>(null);
//     console.log(inputRef)
//
//
//     return (
//         <div>
//             <h3>{title}</h3>
//             <div>
//                 <input ref={inputRef}/>
//                 <button onClick={()=>{
//                     if(inputRef.current){
//                         addTask(inputRef.current.value)
//                         inputRef.current.value=''
//                     }}}>+</button>
//                 {/*<Button title={'+'}/>*/}
//             </div>
//             {
//                 tasks.length === 0
//                     ? <p>Тасок нет</p>
//                     : <ul>
//                         {tasks.map(task => {
//                             return (
//                                 <li key={task.id}>
//                                     <input type="checkbox" checked={task.isDone}/>
//                                     <span>{task.title}</span>
//                                     <Button title={'x'} onClick={() => removeTask(task.id)}/>
//                                 </li>
//                             )
//                         })}
//                     </ul>
//             }
//             <div>
//                 <Button title={'All'} onClick={() => changeFilter('all')}/>
//                 <Button title={'Active'} onClick={() => changeFilter('active')}/>
//                 <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
//             </div>
//         </div>
//     )
// }
