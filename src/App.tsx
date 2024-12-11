import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)
        })
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (todolistId: string, newFilter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: newFilter} : el))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)
        })
    }

    const removeToDoList = (todolistId: string) => {
        debugger;
        setTodolists((prevState) => prevState.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodoList = (title: string) => {
        const id = v1()
        const newTodoList: TodolistType = {id, title, filter: 'all'};
        setTodolists([...todolists, newTodoList])
        setTasks({...tasks, [id]: []})
    }

    const updateTaskTitle = (todolistId: string, taskId: string, updatedTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: updatedTitle} : el)})
    }

    const updateTodoListTitle = (todolistId: string,  updatedTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: updatedTitle} : el))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todolists.map(el => {

                return <Todolist
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    filter={el.filter}
                    tasks={tasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeToDoList={removeToDoList}
                    updateTaskTitle={updateTaskTitle}
                    updateTodoListTitle={updateTodoListTitle}
                />
            })}
        </div>
    );
}

export default App;