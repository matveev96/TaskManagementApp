import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore, type UnknownAction } from "redux"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"
import { thunk, type ThunkAction, type ThunkDispatch } from "redux-thunk"

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
  app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// непосредственно создаём store
export const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)))

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
