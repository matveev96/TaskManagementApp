import {combineReducers, compose, legacy_createStore as createStore} from 'redux'
import { tasksReducer } from '../model/tasks-reducer'
import { todolistsReducer } from '../model/todolists-reducer'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// непосредственно создаём store
export const store = createStore(rootReducer, {}, composeEnhancers())

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store