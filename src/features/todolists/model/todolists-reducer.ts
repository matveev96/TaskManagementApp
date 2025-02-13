import type { Todolist } from "../api/todolistsApi.types"
import type { AppThunk } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }

    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "ADD-TODOLIST": {
      const todolist = action.payload.todolist
      return [{ ...todolist, filter: "all" }, ...state]
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }

    default:
      return state
  }
}

// Action creators
export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const
}

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

// Thunk
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    todolistsApi.createTodolist(title).then((res) => {
      const todolist = res.data.data.item
      dispatch(addTodolistAC(todolist))
    })
  }

export const removeTodolistTC =
  (id: string): AppThunk =>
  (dispatch) => {
    todolistsApi.deleteTodolist(id).then((res) => {
      dispatch(removeTodolistAC(id))
    })
  }

export const changeTodolistTitleTC =
  (args: { id: string; title: string }): AppThunk =>
  (dispatch) => {
    todolistsApi.updateTodolist(args).then((res) => {
      dispatch(changeTodolistTitleAC(args))
    })
  }

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & { filter: FilterValuesType }
