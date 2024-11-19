import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {useRef, KeyboardEvent, useState, ChangeEvent} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask
                         }: PropsType) => {

    const [newTitle, setNewTitle] = useState("");

    // const changeFilterAllHandler = () => changeFilter('all')
    // const changeFilterActiveHandler = () => changeFilter('active')
    // const changeFilterCompletedHandler = () => changeFilter('completed')

    const changeFilterHandler = (value: FilterValuesType) => {
        changeFilter(value)
    }


    const addTaskHandler = () => {
        addTask(newTitle);
        setNewTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    const mappedTasks = tasks.map(task => {
        const removeTaskHandler = () => {
            removeTask(task.id)
        }
        return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <Button title={"X"} onClick={removeTaskHandler}/>
                </li>
            )
        })


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {/*<Button title={'+'}/>*/}
            </div>

            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>{mappedTasks}</ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilterHandler('all')}/>
                <Button title={'Active'} onClick={() => changeFilterHandler('active')}/>
                <Button title={'Completed'} onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
}


//--------------------------------------------------------------------------------------
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
