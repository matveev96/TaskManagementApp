import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {useRef, KeyboardEvent, useState, ChangeEvent} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeIsDone}: PropsType) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [filterButtonStyle, setFilterButtonStyle] = useState('');

    const addTaskHandler = () => {
        if(taskTitle.trim()) {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }

    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
        setFilterButtonStyle(filter)
    }

    const onChangeHandler = (taskId: string ,checked: boolean) => {
        changeIsDone(taskId, checked)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    className={error ? 'error' : ''}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>

            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul ref={listRef}>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }
                            // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            // 	changeIsDone(task.id, event.currentTarget.checked)
                            // }

                            return <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={(event)=>onChangeHandler(task.id, event.currentTarget.checked)}/>
                                <span>{task.title}</span>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button title={'All'} className={filterButtonStyle === 'all' ? 'activeFilter' : ''} onClick={()=> changeFilterTasksHandler('all')}/>
                <Button title={'Active'} className={filterButtonStyle === 'active' ? 'activeFilter' : ''} onClick={()=> changeFilterTasksHandler('active')}/>
                <Button title={'Completed'} className={filterButtonStyle === 'completed' ? 'activeFilter' : ''} onClick={()=> changeFilterTasksHandler('completed')}/>
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
