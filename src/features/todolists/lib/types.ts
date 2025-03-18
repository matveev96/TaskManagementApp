import type { Todolist } from "../api/todolistsApi.types"
import type { RequestStatus } from "../../../app/appSlice"

export type FilterValues = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}
